/* Google sign-in gate, visit log and Drive uploads for every page.
   Fill in the two values below (steps in google-setup/SETUP.md). With clientId empty, sign-in is off and the site works as before.
   Loaded in <head> so the page stays hidden until the visitor has signed in. */
(function(){
const CFG = {
  clientId: "",   // Google OAuth client ID, ends in .apps.googleusercontent.com
  scriptUrl: ""   // Apps Script web app URL, ends in /exec
};
const KEY = "sl-auth", REMEMBER_DAYS = 30;
const A = window.SLAUTH = { on: !!CFG.clientId, drive: !!(CFG.clientId && CFG.scriptUrl), user: null, upload: null };
if (!A.on) return;

const ls = {
  get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem(k); } catch(e){} }
};
const ss = {
  get(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } },
  set(k, v){ try { sessionStorage.setItem(k, v); } catch(e){} }
};
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function claims(token){
  try {
    let b = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(b), c => c.charCodeAt(0))));
  } catch(e){ return null; }
}
const page = () => location.pathname.split("/").pop() || "index.html";

/* Remembered sign-in: stays for REMEMBER_DAYS, though Google's token itself lasts an hour. */
let saved = ls.get(KEY), tok = saved && claims(saved.token);
if (!tok || tok.aud !== CFG.clientId || !saved.since || Date.now() - saved.since > REMEMBER_DAYS * 864e5){ saved = null; ls.del(KEY); }
const fresh = () => { const c = saved && claims(saved.token); return !!c && c.exp * 1000 > Date.now() + 120e3; };

const root = document.documentElement;
if (!saved) root.classList.add("authlock");
else A.user = { email: saved.email, name: saved.name, picture: saved.picture };

const style = document.createElement("style");
style.textContent = `
html.authlock body > :not(#authGate){display:none!important}
#authGate{display:none}
html.authlock #authGate{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:16px;background:var(--bg);overflow:auto}
#authGate .ag{width:100%;max-width:400px;background:var(--surface);border:1.5px solid var(--line);border-radius:22px;padding:30px 22px 22px;text-align:center;box-shadow:0 10px 30px rgba(59,43,33,.08)}
#authGate .logo{margin:0 auto 12px;width:56px;height:56px;font-size:1.7rem;border-radius:16px}
#authGate h1{font-family:var(--f-display,"Marcellus",serif);font-size:1.6rem;font-weight:400;margin:0 0 4px}
#authGate .ag-sub{color:var(--muted);margin:0 0 20px}
#authGate .ag-btn{display:flex;justify-content:center;min-height:44px}
#authGate .ag-note{color:var(--muted);font-size:.8rem;line-height:1.45;margin:18px 0 0}
#authGate .ag-err{color:var(--terra-ink);font-size:.85rem;margin:12px 0 0}
#authGate .ag-later{margin-top:14px}
#agOut{white-space:nowrap}
`;
document.head.appendChild(style);

/* ---------- Google Identity Services ---------- */
let gisReady = null, waiters = [];
function loadGis(){
  if (gisReady) return gisReady;
  gisReady = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client"; s.async = true;
    s.onload = () => {
      google.accounts.id.initialize({ client_id: CFG.clientId, callback: onCredential, auto_select: true, cancel_on_tap_outside: false, use_fedcm_for_prompt: true });
      res();
    };
    s.onerror = () => rej(new Error("Couldn't reach Google. Check the internet connection and reload."));
    document.head.appendChild(s);
  });
  return gisReady;
}

function onCredential(resp){
  const c = claims(resp.credential);
  if (!c || c.aud !== CFG.clientId){ showErr("That sign-in didn't work. Please try again."); return; }
  const first = !saved || saved.email !== c.email;
  saved = { token: resp.credential, email: c.email, name: c.name || c.email, picture: c.picture || "", since: first ? Date.now() : saved.since };
  ls.set(KEY, saved);
  A.user = { email: saved.email, name: saved.name, picture: saved.picture };
  ss.set("sl-auth-v", "1");
  post({ action: "log", event: "login", token: saved.token, page: page() }).catch(() => {});
  root.classList.remove("authlock");
  addSignOut();
  const w = waiters; waiters = []; w.forEach(x => x.res(saved.token));
}

/* ---------- The sign-in screen ---------- */
function gate(mode){
  let g = document.getElementById("authGate");
  if (!g){ g = document.createElement("div"); g.id = "authGate"; document.body.prepend(g); }
  const again = mode === "again";
  g.innerHTML = `<div class="ag" role="dialog" aria-modal="true" aria-labelledby="agT">
    <div class="logo" aria-hidden="true">ஶ்ரீ</div>
    <h1 id="agT">Sloka Pathashala</h1>
    <p class="ag-sub">${again ? "Please sign in again to save your recording to Google Drive." : "Sign in with your Google account to continue."}</p>
    <div class="ag-btn" id="agBtn"><span class="muted">Loading Google sign-in…</span></div>
    <p class="ag-err" id="agErr" hidden></p>
    ${again ? `<button class="ag-later" id="agLater">Not now</button>` : ""}
    <p class="ag-note">Only your name and email are shared with this site. Each sign-in and visit is noted in the site owner's log, and recordings you make are saved to the site owner's Google Drive.</p>
  </div>`;
  root.classList.add("authlock");
  if (again) document.getElementById("agLater").onclick = () => {
    root.classList.remove("authlock");
    const w = waiters; waiters = []; w.forEach(x => x.rej(new Error("Not signed in, so the recording was kept on this device only.")));
  };
  loadGis().then(() => {
    const box = document.getElementById("agBtn"); box.innerHTML = "";
    google.accounts.id.renderButton(box, { theme: "outline", size: "large", shape: "pill", text: "signin_with", logo_alignment: "left", width: 260 });
    if (!again) google.accounts.id.prompt();
  }).catch(e => showErr(e.message));
}
function showErr(msg){ const e = document.getElementById("agErr"); if (e){ e.textContent = msg; e.hidden = false; } }

function addSignOut(){
  if (document.getElementById("agOut") || !A.user) return;
  const tools = document.querySelector("header .tools");
  if (!tools) return;
  const b = document.createElement("button");
  b.id = "agOut"; b.textContent = "Sign out"; b.title = "Signed in as " + A.user.email;
  b.onclick = () => {
    ls.del(KEY);
    try { google.accounts.id.disableAutoSelect(); } catch(e){}
    location.reload();
  };
  tools.appendChild(b);
}

/* ---------- Backend calls ---------- */
function post(body){
  if (!CFG.scriptUrl) return Promise.reject(new Error("Saving to Google Drive isn't set up yet."));
  return fetch(CFG.scriptUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) })
    .then(r => r.json())
    .then(j => { if (!j.ok) throw new Error(j.error || "The server said no."); return j; });
}

/* A token less than an hour old is needed to save a recording; ask Google quietly first, then show the sign-in card. */
function freshToken(){
  if (fresh()) return Promise.resolve(saved.token);
  return new Promise((res, rej) => {
    waiters.push({ res, rej });
    if (waiters.length > 1) return;
    loadGis().then(() => {
      let shown = false;
      google.accounts.id.prompt(n => {
        if (shown || !waiters.length) return;
        if ((n.isNotDisplayed && n.isNotDisplayed()) || (n.isSkippedMoment && n.isSkippedMoment()) || (n.isDismissedMoment && n.isDismissedMoment() && n.getDismissedReason() !== "credential_returned")){
          shown = true; gate("again");
        }
      });
      setTimeout(() => { if (!shown && waiters.length){ shown = true; gate("again"); } }, 6000);
    }).catch(rej);
  });
}

function toBase64(blob){
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] || "");
    r.onerror = () => rej(new Error("Couldn't read the recording."));
    r.readAsDataURL(blob);
  });
}

/* upload(blob, {title, verse}) → resolves with the saved file name. */
A.upload = A.drive ? async (blob, meta) => {
  const token = await freshToken();
  const data = await toBase64(blob);
  const j = await post({ action: "upload", token, mime: blob.type || "audio/webm", data, title: meta.title || document.title, verse: meta.verse || "" });
  return j.name;
} : null;

/* ---------- Start ---------- */
function start(){
  if (!saved){ gate("login"); return; }
  addSignOut();
  if (!ss.get("sl-auth-v")){
    ss.set("sl-auth-v", "1");
    post({ action: "log", event: "visit", token: saved.token, page: page() }).catch(() => {});
  }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
