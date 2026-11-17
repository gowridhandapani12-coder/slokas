/* Shared engine for every sloka page. A page defines SLOKA (data) and an <template id="overview">, then loads this file. */
document.body.insertAdjacentHTML("afterbegin", `<header class="top">
  <div class="gut brandrow">
    <button id="menuBtn" aria-label="Open menu">☰</button>
    <div class="brand">
      <div class="logo" aria-hidden="true">ஶ்ரீ</div>
      <div><b>Sloka Pathashala</b><span>Sridevi's sloka library</span></div>
    </div>
    <a class="xnav" href="index.html" title="Daily tracker: tick off today's slokas">✓ Tracker</a>
    <button id="setBtn" aria-label="Script, font and theme settings" aria-expanded="false">Aa</button>
    <div class="tools">
      <label><span class="lbl">Script</span>
        <select id="script">
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="dv">देवनागरी</option>
          <option value="iast">IAST (ā ī ś)</option>
          <option value="en">Simple English</option>
        </select>
      </label>
      <label><span class="lbl">Font</span>
        <select id="font">
          <option value="classic">Classic</option>
          <option value="playful">Playful</option>
          <option value="easy">Easy-read</option>
        </select>
      </label>
      <button id="smaller" aria-label="Smaller verse text">A−</button>
      <button id="bigger" aria-label="Bigger verse text">A+</button>
      <button id="themeBtn" aria-label="Switch light or dark">◐</button>
    </div>
  </div>
  <nav class="gut tabs" id="tabs">
    <a href="#overview">Overview</a>
    <a href="#chant">Chant</a>
    <a href="#meaning">Meaning</a>
    <a href="#memorise">Memorise</a>
    <a href="#rhythm">Rhythm &amp; sound</a>
    <a href="#cards">Flashcards</a>
    <a href="#quiz">Quiz</a>
  </nav>
</header>

<div class="gut shell">
  <aside class="side" id="side">
    <div class="sjapa" id="sjapa"></div>
    <details class="thisv" id="thisv" open>
      <summary><h4>This sloka</h4></summary>
      <div class="vlist" id="vlist"></div>
    </details>
    <div class="lib" id="lib">
      <h4>Library</h4>
    </div>
  </aside>
  <div class="scrim" id="scrim"></div>

  <main id="main">
    <div class="donebar" id="doneBar" role="group" aria-label="Mark this sloka done in today's tracker"></div>
    <!-- OVERVIEW -->
    <section class="view" id="v-overview"></section>

    <!-- CHANT -->
    <section class="view" id="v-chant" hidden>
      <div class="card">
        <div class="sec-head">
          <div><h2>Chant</h2><p class="muted" style="margin-top:4px">Tap any word for its meaning. Press play to follow the rhythm syllable by syllable.</p></div>
        </div>
        <div class="row" style="margin-top:12px">
          <button id="tSub" aria-pressed="true">Second script</button>
          <button id="tMean" aria-pressed="false">English meaning</button>
          <button id="tTaM" aria-pressed="false">தமிழ் பொருள்</button>
        </div>
        <div class="player" style="margin-top:12px">
          <button class="primary" id="chantPlay">▶ Guided chant</button>
          <label>Speed <input type="range" id="chantTempo" min="50" max="200" value="100"><output id="chantTempoV" class="mono">100</output></label>
          <label style="min-width:auto;flex:none"><input type="checkbox" id="chantClick" checked> beat sound</label>
          <label style="min-width:auto;flex:none">Say each verse
            <select id="chantRep"><option value="1">once</option><option value="2">2 times</option><option value="3">3 times</option></select>
          </label>
        </div>
        <p class="muted" style="font-size:.8rem;margin-top:8px">Each verse also has its own ▶ button. Keys: <span class="kbd">Space</span> play / stop · <span class="kbd">Esc</span> stop.</p>
      </div>
      <div id="chantList" class="view" style="gap:16px"></div>
    </section>

    <!-- MEANING -->
    <section class="view" id="v-meaning" hidden>
      <div class="card">
        <h2>Word by word</h2>
        <p class="muted" style="margin-top:4px">Each verse broken into its words, with how the long compounds are built. Your own notes are saved on this device.</p>
        <div class="row noprint" style="margin-top:12px;justify-content:space-between">
          <div class="vchips" id="meanChips"></div>
          <button id="printBtn">Print / save as PDF</button>
        </div>
      </div>
      <div id="meanBody" class="view" style="gap:16px"></div>
    </section>

    <!-- MEMORISE -->
    <section class="view" id="v-memorise" hidden>
      <div class="card">
        <h2>Memorise</h2>
        <p class="muted" style="margin-top:4px">Pick a verse, then raise the level. Hidden words show as dotted gaps: tap a gap to peek.</p>
        <div class="vchips" id="memChips" style="margin-top:12px"></div>
        <div class="levels" id="levels" style="margin-top:12px"></div>
      </div>
      <div class="card">
        <div class="vhead" id="memHead"></div>
        <div class="verse" id="memText"></div>
        <div class="row" style="margin-top:14px">
          <button id="lineMode" aria-pressed="false">One line at a time</button>
          <button id="nextLine" hidden>Show next line ↓</button>
          <button id="reshuffle">New gaps</button>
        </div>
      </div>
      <div class="card">
        <h3>Record yourself</h3>
        <p class="muted" style="margin:4px 0 10px;font-size:.92rem">Recite the verse, then listen back and compare with the rhythm. Recordings stay on this device until you close the page.</p>
        <div class="rec" id="rec"></div>
      </div>
      <div class="card">
        <h3>How well do you know this verse?</h3>
        <div class="status" id="status" style="margin-top:10px"></div>
        <div class="tip" id="memTip" style="margin-top:14px"></div>
      </div>
    </section>

    <!-- RHYTHM -->
    <section class="view" id="v-rhythm" hidden>
      <div class="card">
        <div id="rhyIntro"></div>
        <div class="legend" style="margin-top:12px"><span><i style="width:16px;background:var(--sage)"></i>short (laghu) · 1 beat</span><span><i style="width:34px;background:var(--apricot)"></i>long (guru) · 2 beats</span></div>
        <div class="vchips" id="rhyChips" style="margin-top:14px"></div>
        <div class="player" style="margin-top:12px">
          <button class="primary" id="rhyPlay">▶ Play the beat</button>
          <label>Speed <input type="range" id="rhyTempo" min="50" max="200" value="90"><output id="rhyTempoV" class="mono">90</output></label>
        </div>
      </div>
      <div class="card" id="rhyBody"></div>
      <div class="card">
        <h2>Reading the little numbers</h2>
        <p class="muted" style="margin:6px 0 12px">Tamil script has one letter where Sanskrit has four. The small number tells you which sound to say. Examples come from this sloka.</p>
        <div style="overflow-x:auto"><table class="ptab" id="ptab"></table></div>
        <div class="grid2" style="margin-top:16px">
          <div class="tip"><b>ஶ · ஷ · ஸ</b> are three different “s” sounds: ஶ (ś) is soft, like “sh” in <i>sure</i> — ஶ்ரீ, கணேஶ; ஷ (ṣ) is “sh” with the tongue curled back — விஷ்ணு; ஸ (s) is a plain “s” — ஸதா³.</div>
          <div class="tip"><b>Long and short vowels</b> change the meaning and the beat: <i>mudā</i> (with joy) has a long ā. In Tamil script the long vowels are ா ீ ூ ே ோ.</div>
        </div>
      </div>
    </section>

    <!-- FLASHCARDS -->
    <section class="view" id="v-cards" hidden>
      <div class="card">
        <div class="sec-head">
          <div><h2>Flashcards</h2><p class="muted" style="margin-top:4px">Tap the card to turn it. Cards you miss come back sooner. Keys: <span class="kbd">Space</span> turn · <span class="kbd">→</span> knew it · <span class="kbd">←</span> again.</p></div>
          <div class="row" id="deckBtns"></div>
        </div>
      </div>
      <div class="fc" id="fc"><div class="fc-in"><div class="fc-f" id="fcF"></div><div class="fc-b" id="fcB"></div></div></div>
      <div class="row" style="justify-content:center">
        <button id="fcAgain">↺ Again</button>
        <button class="primary" id="fcGood">✓ I knew it</button>
      </div>
      <p class="muted mono" id="fcCount" style="text-align:center;font-size:.8rem"></p>
    </section>

    <!-- QUIZ -->
    <section class="view" id="v-quiz" hidden>
      <div class="card">
        <div class="sec-head">
          <div><h2>Quiz</h2><p class="muted" style="margin-top:4px">10 questions, new each time: missing words, meanings, what comes next.</p></div>
          <button id="quizNew">New quiz</button>
        </div>
        <div class="qbar" style="margin-top:14px"><i id="qbar"></i></div>
      </div>
      <div class="card q" id="quizBox"></div>
    </section>
  </main>
</div>
<div id="pop" hidden></div>
<div id="nowbar" hidden role="status"><span id="nowTxt"></span><button id="nowStop">■ Stop</button></div>

`);
document.getElementById("v-overview").innerHTML = document.getElementById("overview").innerHTML;

/* ================= Transliteration =================
   Verses are stored once, in Devanagari. Everything else (Tamil with the ²³⁴ marks used in
   her notebooks, IAST, simple English) and the syllable/metre analysis is derived from it. */
const DV_C = {"क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ","ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","ळ":"ḷ","श":"ś","ष":"ṣ","स":"s","ह":"h"};
const DV_V = {"अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ए":"e","ऐ":"ai","ओ":"o","औ":"au"};
const DV_M = {"ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","े":"e","ै":"ai","ो":"o","ौ":"au"};
const LONG = new Set(["ā","ī","ū","e","ai","o","au"]);
const C_INFO = { // key: [devanagari, tamil base, tamil mark, simple]
  k:["क","க","","k"], kh:["ख","க","²","kh"], g:["ग","க","³","g"], gh:["घ","க","⁴","gh"], "ṅ":["ङ","ங","","n"],
  c:["च","ச","","ch"], ch:["छ","ச","²","chh"], j:["ज","ஜ","","j"], jh:["झ","ஜ","²","jh"], "ñ":["ञ","ஞ","","n"],
  "ṭ":["ट","ட","","t"], "ṭh":["ठ","ட","²","th"], "ḍ":["ड","ட","³","d"], "ḍh":["ढ","ட","⁴","dh"], "ṇ":["ण","ண","","n"],
  t:["त","த","","t"], th:["थ","த","²","th"], d:["द","த","³","d"], dh:["ध","த","⁴","dh"], n:["न","ந","","n"],
  p:["प","ப","","p"], ph:["फ","ப","²","ph"], b:["ब","ப","³","b"], bh:["भ","ப","⁴","bh"], m:["म","ம","","m"],
  y:["य","ய","","y"], r:["र","ர","","r"], l:["ल","ல","","l"], v:["व","வ","","v"], "ḷ":["ळ","ள","","l"],
  "ś":["श","ஶ","","sh"], "ṣ":["ष","ஷ","","sh"], s:["स","ஸ","","s"], h:["ह","ஹ","","h"]
};
const V_INFO = { // key: [dv independent, dv sign, ta independent, ta sign, simple]
  a:["अ","","அ","","a"], "ā":["आ","ा","ஆ","ா","aa"], i:["इ","ि","இ","ி","i"], "ī":["ई","ी","ஈ","ீ","ee"],
  u:["उ","ु","உ","ு","u"], "ū":["ऊ","ू","ஊ","ூ","oo"], "ṛ":["ऋ","ृ","ரு","்ரு","ru"], e:["ए","े","ஏ","ே","e"],
  ai:["ऐ","ै","ஐ","ை","ai"], o:["ओ","ो","ஓ","ோ","o"], au:["औ","ौ","ஔ","ௌ","au"]
};
const DIG = "०१२३४५६७८९";

// Devanagari string -> phoneme stream: {t:'C'|'V'|'M'|'P', k, w(word index)}
function tokenize(s){
  const out = []; let w = 0;
  for (let i = 0; i < s.length; i++){
    const ch = s[i];
    if (DV_C[ch]){
      out.push({t:"C", k:DV_C[ch], w});
      const nx = s[i+1];
      if (nx === "्"){ i++; }
      else if (DV_M[nx]){ out.push({t:"V", k:DV_M[nx], w}); i++; }
      else out.push({t:"V", k:"a", w});
    } else if (DV_V[ch]) out.push({t:"V", k:DV_V[ch], w});
    else if (ch === "॑" || ch === "॒" || ch === "᳚") out.push({t:"S", k:ch, w}); // Vedic svara marks
    else if (ch === "ं") out.push({t:"M", k:"ṃ", w});
    else if (ch === "ः") out.push({t:"M", k:"ḥ", w});
    else if (ch === " ") w++;
    else out.push({t:"P", k:ch, w});
  }
  return out;
}

// Render a phoneme list in a script. Tamil marks are wrapped so they can be coloured.
function render(ph, sc){
  let o = "";
  for (let i = 0; i < ph.length; i++){
    const p = ph[i], nx = ph[i+1];
    if (p.t === "C"){
      const c = C_INFO[p.k], hasV = nx && nx.t === "V";
      const v = hasV ? nx.k : null;
      if (sc === "dv") o += c[0] + (hasV ? V_INFO[v][1] : "्");
      else if (sc === "ta"){
        const mk = c[2] ? `<span class="g">${c[2]}</span>` : "";
        if (!hasV) o += c[1] + "்" + mk;
        else if (v === "ṛ") o += c[1] + "்" + mk + "ரு";
        else o += c[1] + V_INFO[v][3] + mk;
      }
      else if (sc === "iast") o += p.k + (hasV ? v : "");
      else o += c[3] + (hasV ? V_INFO[v][4] : "");
      if (hasV) i++;
    } else if (p.t === "V"){
      const v = V_INFO[p.k];
      o += sc === "dv" ? v[0] : sc === "ta" ? v[2] : sc === "iast" ? p.k : v[4];
    } else if (p.t === "M"){
      if (p.k === "ṃ") o += sc === "dv" ? "ं" : sc === "ta" ? "ம்" : sc === "iast" ? "ṃ" : "m";
      else o += sc === "dv" ? "ः" : sc === "ta" ? ":" : sc === "iast" ? "ḥ" : "h";
    } else if (p.t === "S"){
      // Svaras only make sense in Indic scripts. Tamil fonts lack the Vedic combining marks,
      // so in Tamil they are drawn as small spacing strokes: ˈ svarita (above), ˍ anudātta (below).
      if (sc === "dv") o += p.k;
      else if (sc === "ta") o += p.k === "॒" ? `<span class="svr lo">ˍ</span>` : `<span class="svr">${p.k === "᳚" ? "ˈˈ" : "ˈ"}</span>`;
    } else {
      const k = p.k;
      if (k === "ऽ") o += sc === "dv" ? "ऽ" : sc === "ta" ? "(அ)" : "'";
      else o += k;
    }
  }
  return o;
}
const R = (dv, sc) => render(tokenize(dv), sc || S.script);
const plain = html => html.replace(/<[^>]+>/g, "");

// Split a line's phoneme stream into syllables; weight G (guru) or L (laghu).
function syllabify(ph){
  const vIdx = []; ph.forEach((p, i) => { if (p.t === "V") vIdx.push(i); });
  const syl = vIdx.map(() => ({idx:[], w:"L"}));
  const owner = new Array(ph.length).fill(-1);
  vIdx.forEach((vi, s) => {
    owner[vi] = s;
    if (LONG.has(ph[vi].k)) syl[s].w = "G";
    let j = vi + 1;
    while (j < ph.length && (ph[j].t === "M" || ph[j].t === "S")){ owner[j] = s; if (ph[j].t === "M") syl[s].w = "G"; j++; }
    const cs = []; while (j < ph.length && ph[j].t !== "V"){ if (ph[j].t === "C") cs.push(j); j++; }
    const last = s === vIdx.length - 1;
    if (last){ cs.forEach(c => owner[c] = s); if (cs.length) syl[s].w = "G"; }
    else if (cs.length >= 2){ owner[cs[0]] = s; syl[s].w = "G"; cs.slice(1).forEach(c => owner[c] = s + 1); }
    else cs.forEach(c => owner[c] = s + 1);
  });
  ph.forEach((p, i) => { if (p.t === "C" && owner[i] < 0) owner[i] = 0; }); // leading consonants
  ph.forEach((p, i) => { if (p.t === "S" && owner[i] < 0 && i > 0) owner[i] = owner[i - 1]; }); // svara stays with its syllable
  ph.forEach((p, i) => { if (owner[i] >= 0) syl[owner[i]].idx.push(i); });
  return {syl, owner};
}

const LIB = [
 ["Ganesha",[["Ganesha Pancharatnam","Adi Shankara","ganesha-pancharatnam.html"],["Ganapati Atharvashirsha","Atharva Veda","ganapathy-atharvashirsham.html"],["Ganapathi Talam","Traditional"]]],
 ["Murugan",[["Subramanya Bhujangam","Adi Shankara","subramanya-bhujangam.html"],["Kanda Sashti Kavasam","Devaraya Swamigal"],["Thiruppugazh","Arunagirinathar"]]],
 ["Devi & Ambal",[["Meenakshi Pancharatnam","Adi Shankara"],["Lalitha Sahasranamam","Brahmanda Purana","lalitha-sahasranamam.html"],["Soundarya Lahari","Adi Shankara","soundarya-lahari.html"],["Devi Khadgamala","Vamakeshvara Tantra"],["Bhavani Ashtakam","Adi Shankara"],["Shyamala Stotram","Traditional"],["Sharada Bhujangam","Adi Shankara"]]],
 ["Lakshmi & Thayar",[["Sri Suktam","Rig Veda (khila)","sri-suktam.html"],["Kanakadhara Stotram","Adi Shankara","kanakadhara.html"],["Mahalakshmi Sahasranamam","Traditional","lakshmi-sahasranamam.html"],["Sri Stuti","Vedanta Desikan","sri-stuti.html"],["Ashtalakshmi Stotram","Mukkur Srinivasa Varadachariar","ashtalakshmi.html"],["Mahalakshmi Ashtakam","Indra (Padma Purana)","mahalakshmi-ashtakam.html"],["Lakshmi Sahasranamam","Traditional"],["Dhanalakshmi Stotram","Shiva–Parvati dialogue","dhanalakshmi.html"],["Chatushloki","Alavandar","chatushloki.html"],["Gunaratna Kosham","Parashara Bhattar","gunaratna-kosham.html"],["Bhu Stuti","Vedanta Desikan","bhu-stuti.html"],["Varalakshmi Vratham","Vrata katha"]]],
 ["Andal (Goda)",[["Goda Stuti","Vedanta Desikan"],["Goda Chatushloki","Tirumalai Anantarya"],["Varanamayiram","Andal"]]],
 ["Vishnu, Rama & Krishna",[["Vishnu Sahasranamam","Mahabharata","vishnu-sahasranamam.html"],["Pancha Suktam","Vedas"],["Venkatesa Suprabhatam · Stotram · Mangalam","Prativadi Bhayankaram Annan","venkatesa-suprabhatam.html"],["Ranganatha Ashtakam","Adi Shankara"],["Jagannatha Ashtakam","Adi Shankara","jagannatha-ashtakam.html"],["Guruvayupuresha Pancharatnam","Anantarama Dikshitar","guruvayupuresha-pancharatnam.html"],["Ashtabhuja Ashtakam","Vedanta Desikan","ashtabhuja-ashtakam.html"],["Damodara Ashtakam","Padma Purana","damodarashtakam.html"],["Gopala Vimshati","Vedanta Desikan","gopala-vimshati.html"],["Dehalisha Stuti","Vedanta Desikan"],["Shodashayudha Stotram","Vedanta Desikan","shodashayudha-stotram.html"],["Sudarshana Kavacham","Bhrigu Samhita","sudarshana-kavacham.html"],["Abhiti Stavam","Vedanta Desikan"],["Laghu Rama Raksha","Padma Purana","laghu-rama-raksha.html"],["Bhaja Govindam","Adi Shankara"]]],
 ["Narasimha",[["Lakshmi Narasimha Karavalambam","Adi Shankara"],["Karavalamba Stotram","44th Azhagiya Singar"],["Lakshmi Nrusimha Prapatti","44th Azhagiya Singar"],["Narasimha Stuti","Shani (Bhavishya Purana)","narasimha-stuti.html"],["Kamasikashtakam","Vedanta Desikan","kamasikashtakam.html"],["Narasimha Ashtakam","Azhagiya Manavala Jeeyar","narasimha-ashtakam.html"]]],
 ["Shiva",[["Kala Bhairava Ashtakam","Adi Shankara","kala-bhairava-ashtakam.html"]]],
 ["Hanuman, Surya & Ayyappa",[["Hanuman Chalisa","Tulsidas","hanuman-chalisa.html"],["Aditya Hrudayam","Agastya (Ramayana)","aditya-hrudayam.html"],["Harivarasanam","Kumbakudi Kulathur Iyer"]]],
 ["Prabandham & Acharyas",[["Thiruppallandu","Periyalvar"],["Kanninun Siruthambu","Madhurakavi Alvar"],["Ramanuja Nootrandadi","Thiruvarangathu Amudhanar"],["Podu Thaniyan","Acharyas"]]]
];

/* ================= Derived data ================= */
// For each verse line: phonemes, syllables, and per-word HTML with syllable spans.
const VERSES = SLOKA.verses;
VERSES.forEach(v => {
  v.L = v.lines.map(words => {
    const ph = tokenize(words.map(w => w[0]).join(" "));
    const {syl, owner} = syllabify(ph);
    return {words, ph, syl, owner, pattern: syl.map(s => s.w).join("")};
  });
});
// Metres. "chain" = Pañcacāmara-style short–long × 8 per line (strict).
// "anushtubh" = lines of two 8-syllable quarters; syllables 5,6 are short,long and 7 is long/short in quarter 1/2
// (purāṇa stotras bend this now and then, so a miss is only a console note).
const meterOf = v => v.meter || SLOKA.meter.kind;
const ANU_KEY = {4:"L", 5:"G", 6:"G", 12:"L", 13:"G", 14:"L"};
// Other fixed metres give v.pat: the whole line's L/G pattern, "x" where either is allowed.
VERSES.forEach(v => v.L.forEach((l, i) => {
  if (meterOf(v) === "chain" && l.pattern !== "LG".repeat(8)) console.warn("Metre check failed", v.id, i + 1, l.pattern);
  // Āryā-type metres count beats (short 1, long 2) per line instead of syllables: v.moras = [per line].
  if (v.moras){ const m = [...l.pattern].reduce((a, c) => a + (c === "G" ? 2 : 1), 0); if (m !== v.moras[i]) console.warn("Mātrā check failed", v.id, i + 1, m, "expected", v.moras[i]); }
  if (v.pat && (l.pattern.length !== v.pat.length || [...v.pat].some((c, k) => c !== "x" && c !== l.pattern[k])))
    console.warn("Metre check failed", v.id, i + 1, l.pattern, "expected", v.pat);
  if (meterOf(v) === "anushtubh"){
    const off = Object.entries(ANU_KEY).filter(([k, w]) => l.pattern[k] !== w).map(([k]) => +k + 1);
    if (l.syl.length !== 16 && !v.irreg) console.warn("Anuṣṭubh line is not 16 syllables", v.id, i + 1, l.syl.length);
    else if (off.length) console.info("Anuṣṭubh variation", v.id, "line", i + 1, "syllables", off.join(","));
  }
}));
const ALLW = []; VERSES.forEach(v => v.L.forEach((l, li) => l.words.forEach((w, wi) => ALLW.push({v, li, wi, dv:w[0], g:w[1], b:w[2]}))));
const uniq = (arr, f) => { const seen = new Set(); return arr.filter(x => { const k = f(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
const UW = uniq(ALLW, w => w.dv); // distinct words (refrains appear once)

/* ================= State ================= */
// store = this sloka's progress (prefix SLOKA.key); gstore = settings and practice days shared by all pages.
const mkStore = pre => ({
  get(k, d){ try { const x = localStorage.getItem(pre + k); return x === null ? d : JSON.parse(x); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(pre + k, JSON.stringify(v)); } catch(e){} }
});
const store = mkStore(SLOKA.key + "-"), gstore = mkStore("sl-");
const S = {
  script: gstore.get("script", "ta"), font: gstore.get("font", "classic"), vs: gstore.get("vs", 1),
  theme: gstore.get("theme", null), status: store.get("status", {}), notes: store.get("notes", {}),
  days: gstore.get("days", []), rec: {}, recBlob: {}, recSave: {},
  sub: gstore.get("sub", true), mean: gstore.get("mean", false), taM: gstore.get("taM", false),
  memV: null, memLevel: 0, lineMode: false, shown: 1, rhyV: null, meanV: "all", cur: null
};
S.memV = S.rhyV = S.cur = (VERSES.find(v => !v.kind) || VERSES[0]).id;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const vById = id => VERSES.find(v => v.id === id);
const subScript = () => S.script === "ta" ? "iast" : S.script === "dv" ? "iast" : "ta";
const dandas = (v, li) => {
  const last = li === v.L.length - 1, mid = v.L.length === 2 ? li === 0 : li === 1;
  const num = v.kind === "dhyana" ? "" : " " + v.n + " ";
  const lat = S.script === "iast" || S.script === "en";
  if (last) return `<span class="dnd">${num ? (lat ? "||" + num + "||" : "॥" + num + "॥") : (lat ? "||" : "॥")}</span>`;
  if (mid) return `<span class="dnd">${lat ? "|" : "।"}</span>`;
  return "";
};

// One line as word buttons containing syllable spans (data-s = verse.line.syllable).
function lineHTML(v, li, opts = {}){
  const L = v.L[li], sc = opts.sc || S.script;
  return L.words.map((w, wi) => {
    const idx = []; L.ph.forEach((p, i) => { if (p.w === wi) idx.push(i); });
    let html = "", run = [], cur = null;
    // <wbr> lets long compounds wrap between syllables on narrow phones.
    const flush = () => { if (run.length){ html += (html ? "<wbr>" : "") + `<span class="syl" data-s="${v.id}.${li}.${cur}">${render(run.map(i => L.ph[i]), sc)}</span>`; run = []; } };
    idx.forEach(i => { const o = L.owner[i] >= 0 ? L.owner[i] : "p"; if (o !== cur){ flush(); cur = o; } run.push(i); });
    flush();
    if (opts.mask && opts.mask(wi)) return opts.mask(wi) === "hint"
      ? `<button class="w hintw" data-v="${v.id}" data-l="${li}" data-w="${wi}">${firstSyl(L, wi, sc)}…</button>`
      : `<button class="w blank" data-v="${v.id}" data-l="${li}" data-w="${wi}">${html}</button>`;
    return `<button class="w" data-v="${v.id}" data-l="${li}" data-w="${wi}">${html}</button>`;
  }).join(" ") + dandas(v, li);
}
function firstSyl(L, wi, sc){
  const idx = []; L.ph.forEach((p, i) => { if (p.w === wi) idx.push(i); });
  const first = L.owner[idx[0]]; return render(idx.filter(i => L.owner[i] === first).map(i => L.ph[i]), sc);
}
const verseHTML = (v, opts) => v.L.map((l, li) => `<span class="ln">${lineHTML(v, li, opts)}</span>`).join("");
const verseText = (v, sc) => v.L.map((l, li) => `<span class="ln">${l.words.map(w => R(w[0], sc)).join(" ")}</span>`).join("");

/* ================= Shell: settings, routing, sidebar ================= */
function applySettings(){
  const r = document.documentElement;
  r.dataset.script = S.script; r.dataset.font = S.font; r.style.setProperty("--vs", S.vs);
  if (S.theme) r.dataset.theme = S.theme; else delete r.dataset.theme;
  $("#script").value = S.script; $("#font").value = S.font;
}
$("#script").onchange = e => { S.script = e.target.value; gstore.set("script", S.script); applySettings(); renderAll(); };
$("#font").onchange = e => { S.font = e.target.value; gstore.set("font", S.font); applySettings(); };
$("#bigger").onclick = () => { S.vs = Math.min(1.8, +(S.vs + .1).toFixed(2)); gstore.set("vs", S.vs); applySettings(); };
$("#smaller").onclick = () => { S.vs = Math.max(.8, +(S.vs - .1).toFixed(2)); gstore.set("vs", S.vs); applySettings(); };
$("#themeBtn").onclick = () => {
  const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  S.theme = dark ? "light" : "dark"; gstore.set("theme", S.theme); applySettings();
};
$("#menuBtn").onclick = () => document.body.classList.add("drawer");
$("#setBtn").onclick = () => { const on = document.body.classList.toggle("settings"); $("#setBtn").setAttribute("aria-expanded", on); };
// Keys: Space plays/stops on Chant and Rhythm; Esc stops and closes things; arrows drive flashcards.
document.addEventListener("keydown", e => {
  const t = e.target instanceof Element ? e.target : document.body;
  if (t.closest("input, textarea, select")) return;
  if ((e.key === " " || e.key === "Enter") && t.closest("button")) return; // let the focused button handle it
  const view = (location.hash || "#overview").slice(1);
  if (e.key === "Escape"){ stopPlay(); hidePop(); document.body.classList.remove("drawer", "settings"); }
  else if (e.key === " " && PLAY_BTNS[view]){ e.preventDefault(); playKey ? stopPlay() : $(PLAY_BTNS[view]).click(); }
  else if (view === "cards" && (e.key === " " || e.key === "Enter")){ e.preventDefault(); $("#fc").click(); }
  else if (view === "cards" && e.key === "ArrowRight") $("#fcGood").click();
  else if (view === "cards" && e.key === "ArrowLeft") $("#fcAgain").click();
});
$("#scrim").onclick = () => document.body.classList.remove("drawer");

const VIEWS = ["overview","chant","meaning","memorise","rhythm","cards","quiz"];
function route(){
  const h = (location.hash || "#overview").slice(1);
  const view = VIEWS.includes(h) ? h : "overview";
  VIEWS.forEach(x => $("#v-" + x).hidden = x !== view);
  document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + view));
  stopPlay(); hidePop();
  if (view === "cards" && !FC.deck.length) buildDeck();
  if (view === "quiz" && !QZ.qs.length) newQuiz();
  window.scrollTo({top:0});
}
window.addEventListener("hashchange", route);

function renderSide(){
  $("#vlist").innerHTML = VERSES.map((v, i) => (v.part && v.part !== (VERSES[i - 1] || {}).part ? `<p class="vpart">${esc(v.part)}</p>` : "") + `<button data-go="${v.id}" class="${v.id === S.cur ? "on" : ""}"><span class="num">${v.n === "ॐ" ? "ॐ" : v.n}</span>${esc(v.label)}<i class="st ${S.status[v.id] || ""}" title="${S.status[v.id] || "not started"}"></i></button>`).join("");
  $("#vlist").querySelectorAll("button").forEach(b => b.onclick = () => goVerse(b.dataset.go));
  if (!$("#lib details")){
    const here = location.pathname.split("/").pop() || "ganesha-pancharatnam.html";
    $("#lib").insertAdjacentHTML("beforeend", LIB.map(([g, items]) => `<details ${items.some(x => x[2] === here) ? "open" : ""}><summary>${esc(g)}<small>${items.filter(x => x[2]).length}/${items.length}</small></summary><ol>${items.map(([n, by, file]) =>
      file === here ? `<li class="here">${esc(n)}<small>you are here</small></li>`
      : file ? `<li class="ready"><a href="${file}">${esc(n)}</a><small>${esc(by)}</small></li>`
      : `<li>${esc(n)}<small>${esc(by)} · coming soon</small></li>`).join("")}</ol></details>`).join(""));
  }
}
// Remember this page so the Daily tracker can offer "← back to it".
gstore.set("last", {f:location.pathname.split("/").pop() || "index.html", t:document.title});
// "This sloka" list folds open/closed; the choice is shared by every page.
(() => { const d = $("#thisv"); d.open = gstore.get("vopen", true); d.addEventListener("toggle", () => gstore.set("vopen", d.open)); })();

/* Nāma japa in the sidebar: counts go into today's record in the Daily tracker (localStorage "sl-tracker"),
   so a japa done any day — planned or not — shows up there. */
const SJAPA = [["ram","Rāma","राम"],["shreem","Śrīṃ","श्रीं"]];
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const trkLoad = () => { try { return JSON.parse(localStorage.getItem("sl-tracker")) || {}; } catch(e){ return {}; } };
function renderJapa(){
  const D = trkLoad(), r = ((D.days || {})[todayKey()] || {}).japa || {};
  $("#sjapa").innerHTML = `<h4>Nāma japa · today</h4>` + SJAPA.map(([id, name, dv]) => { const n = r[id] || 0;
    return `<div class="jrow"><span class="jn"><b>${esc(name)}</b>${S.script === "ta" || S.script === "dv" ? ` <i>${R(dv)}</i>` : ""}</span><span class="jc mono" aria-live="polite">${n}<small>${Math.floor(n / 108)} mala</small></span>
    <span class="jb"><button data-j="${id}" data-n="-1" aria-label="Remove one ${esc(name)}">−</button><button data-j="${id}" data-n="1" aria-label="Add one ${esc(name)}">+1</button><button class="primary" data-j="${id}" data-n="108" aria-label="Add a mala of 108 ${esc(name)}">+108</button></span></div>`; }).join("");
  $("#sjapa").querySelectorAll("button").forEach(b => b.onclick = () => addJapaSide(b.dataset.j, +b.dataset.n));
}
function addJapaSide(id, n){
  const D = trkLoad(), k = todayKey();
  D.days = D.days || {}; const rec = D.days[k] || (D.days[k] = {done:{}, japa:{}}); rec.japa = rec.japa || {};
  rec.japa[id] = Math.max(0, (rec.japa[id] || 0) + n);
  try { localStorage.setItem("sl-tracker", JSON.stringify(D)); } catch(e){}
  if (n > 0 && !S.days.includes(k)){ S.days.push(k); gstore.set("days", S.days.slice(-400)); }
  if (n > 0 && navigator.vibrate) try { navigator.vibrate(n === 1 ? 8 : 30); } catch(_){}
  renderJapa();
}
window.addEventListener("storage", e => { if (e.key === "sl-tracker"){ renderJapa(); renderDone(); } });

/* "Done today" bar: ticks this sloka in the Daily tracker. Page file → tracker ids (keep in step with PAGES in index.html).
   A page can hold more than one tracker item (Suprabhatam · Stotram · Mangalasasanam). */
const TRK = {
  "aditya-hrudayam.html":[["aditya-hrudayam"]], "mahalakshmi-ashtakam.html":[["mahalakshmi-ashtakam"]], "ashtalakshmi.html":[["ashtalakshmi"]],
  "dhanalakshmi.html":[["dhanalakshmi"]], "bhu-stuti.html":[["bhu-stuti"]], "sri-stuti.html":[["sri-stuti"]], "lakshmi-sahasranamam.html":[["mahalakshmi-sahasranamam"]],
  "gunaratna-kosham.html":[["gunaratna-kosham"]], "lalitha-sahasranamam.html":[["lalitha-sahasranamam"]], "soundarya-lahari.html":[["soundarya-lahari"]],
  "shodashayudha-stotram.html":[["shodashayudha"]], "sudarshana-kavacham.html":[["sudarshana"]], "kala-bhairava-ashtakam.html":[["kala-bhairava"]],
  "subramanya-bhujangam.html":[["subramanya-bhujangam"]], "gopala-vimshati.html":[["gopala-vimshati"]], "ganesha-pancharatnam.html":[["ganapathy-pancharatnam"]],
  "laghu-rama-raksha.html":[["rama-raksha"]], "narasimha-stuti.html":[["nrisimha-stuti"]], "kamasikashtakam.html":[["kamasikashtakam"]],
  "narasimha-ashtakam.html":[["narasimha-ashtakam"]], "jagannatha-ashtakam.html":[["jagannatha-ashtakam"]], "sri-suktam.html":[["sri-suktam"]],
  "kanakadhara.html":[["kanakadhara"]], "damodarashtakam.html":[["damodarashtakam"]], "guruvayupuresha-pancharatnam.html":[["guruvayupuresha"]],
  "chatushloki.html":[["chatushloki"]], "vishnu-sahasranamam.html":[["vishnu-sahasranamam"]], "hanuman-chalisa.html":[["hanuman-chalisa"]],
  "ganapathy-atharvashirsham.html":[["ganapathy-atharvashirsham"]],
  "venkatesa-suprabhatam.html":[["suprabhatam","Suprabhatam"],["venkatesa-stotram","Stotram"],["mangala-sasanam","Mangalasasanam"]]
};
const myTrk = TRK[location.pathname.split("/").pop()] || [];
function renderDone(){
  const bar = $("#doneBar"); if (!myTrk.length){ bar.hidden = true; return; }
  const done = (((trkLoad().days || {})[todayKey()] || {}).done) || {};
  const all = myTrk.every(([id]) => done[id]);
  bar.innerHTML = `<span class="dq">${all ? "Recited today 🙏" : "Recited it today?"}</span>` + myTrk.map(([id, part]) => { const t = done[id];
    return `<button class="${t ? "on" : ""}" data-done="${id}" aria-pressed="${!!t}" title="${t ? "Tap to undo" : "Tick it in today's Daily tracker"}">${t ? "✓ " : ""}${esc(part ? part : t ? "Done today" : "Mark done today")}${t ? ` <small>${new Date(t).toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})}</small>` : ""}</button>`; }).join("");
  bar.querySelectorAll("button").forEach(b => b.onclick = () => toggleDone(b.dataset.done));
}
function toggleDone(id){
  const D = trkLoad(), k = todayKey();
  D.days = D.days || {}; const rec = D.days[k] || (D.days[k] = {done:{}, japa:{}}); rec.done = rec.done || {};
  if (rec.done[id]) delete rec.done[id];
  else { rec.done[id] = Date.now(); if (!S.days.includes(k)){ S.days.push(k); gstore.set("days", S.days.slice(-400)); } }
  try { localStorage.setItem("sl-tracker", JSON.stringify(D)); } catch(e){}
  renderDone();
}

function goVerse(id){
  S.cur = id; document.body.classList.remove("drawer");
  const view = (location.hash || "#overview").slice(1);
  if (view === "memorise"){ S.memV = id; S.shown = 1; renderMem(); }
  else if (view === "rhythm"){ S.rhyV = id; renderRhythm(); }
  else if (view === "meaning"){ S.meanV = "all"; renderMeaning(); scrollToId("m-" + id); }
  else { if (view !== "chant") location.hash = "#chant"; setTimeout(() => scrollToId("c-" + id), 30); }
  renderSide();
}
function scrollToId(id){ const el = document.getElementById(id); if (el) window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 130, behavior:"smooth"}); }

/* ================= Gloss popover ================= */
const pop = $("#pop");
function hidePop(){ pop.hidden = true; document.querySelectorAll(".w.sel").forEach(x => x.classList.remove("sel")); }
document.addEventListener("click", e => {
  const b = e.target.closest(".w");
  if (b && b.classList.contains("blank")){ b.classList.toggle("peek"); return; }
  if (b && b.classList.contains("hintw")){ const v = vById(b.dataset.v); b.outerHTML = `<span class="hintw">${R(v.lines[b.dataset.l][b.dataset.w][0])}</span>`; return; }
  if (b && (b.closest(".fc") || b.closest(".q"))) return;
  if (b){
    const w = vById(b.dataset.v).lines[b.dataset.l][b.dataset.w];
    hidePop(); b.classList.add("sel");
    const other = S.script === "iast" ? "ta" : "iast";
    pop.innerHTML = `<span class="pw">${R(w[0])}</span><span class="pi">${R(w[0], other)}</span><b>${esc(w[1])}</b><span class="pb">${esc(w[2])}</span>`;
    pop.hidden = false;
    const r = b.getBoundingClientRect(), pw = pop.offsetWidth;
    pop.style.left = Math.max(16, Math.min(scrollX + r.left, scrollX + innerWidth - pw - 16)) + "px";
    pop.style.top = (scrollY + r.bottom + 8) + "px";
    e.stopPropagation(); return;
  }
  if (!e.target.closest("#pop")) hidePop();
});

/* ================= Overview ================= */
function renderOverview(){
  // Generic parts fill whichever of these ids the page's overview template contains.
  const has = id => document.getElementById(id);
  if (has("heroTitle")) $("#heroTitle").innerHTML = R(SLOKA.titleDv);
  if (has("gems")){
    $("#gems").innerHTML = VERSES.map(v => `<button class="gem ${v.kind ? "" : "five"}" data-go="${v.id}"><i>${v.kind === "dhyana" ? "opening" : v.kind === "phala" ? "fruit · " + v.n : (SLOKA.unit || "verse") + " " + v.n}</i><b>${v.kind ? esc(v.short) : R(v.lines[0][0][0])}</b><small>${esc(v.hook.split(" — ")[0])}</small></button>`).join("");
    $("#gems").querySelectorAll(".gem").forEach(b => b.onclick = () => goVerse(b.dataset.go));
  }
  // First sound of each verse, a mnemonic chain.
  if (has("openings")) $("#openings").innerHTML = VERSES.filter(v => !v.kind).map(v => { const L = v.L[0]; return `<div><b>${render(L.syl[0].idx.map(i => L.ph[i]), S.script)}</b><span>verse ${v.n}</span></div>`; }).join("");
  if (SLOKA.overview) SLOKA.overview({R, esc, VERSES, goVerse});
  const ICONS = SLOKA.icons || [], BENEFITS = SLOKA.benefits || [];
  if (has("icons")) $("#icons").innerHTML = ICONS.map((x, i) => `<button class="ico" data-i="${i}"><svg viewBox="0 0 34 34" aria-hidden="true">${x.svg}</svg><b>${esc(x.t)}</b><span>${R(x.w)} · verse ${x.v.slice(1)}</span><span>${esc(x.d)}</span></button>`).join("");
  document.querySelectorAll("#icons .ico").forEach(b => b.onclick = () => {
    const x = ICONS[b.dataset.i]; location.hash = "#chant";
    setTimeout(() => {
      const hit = [...document.querySelectorAll(`#c-${x.v} .w`)].find(el => vById(x.v).lines[el.dataset.l][el.dataset.w][0] === x.w);
      if (hit){ scrollToId("c-" + x.v); setTimeout(() => hit.click(), 350); }
    }, 40);
  });
  if (has("benefits")) $("#benefits").innerHTML = BENEFITS.map(([w, en]) => `<span class="chip">${esc(en)} <span class="muted" style="font-family:var(--f-verse);font-weight:400">${R(w)}</span></span>`).join("");
  renderRing();
}
// Practice days: any chant, memorise status, flashcard or finished quiz counts for today.
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function markPractice(){
  const t = dayKey(new Date());
  if (!S.days.includes(t)){ S.days.push(t); S.days = S.days.slice(-400); gstore.set("days", S.days); renderRing(); }
}
function streak(){
  let n = 0; const d = new Date();
  if (!S.days.includes(dayKey(d))) d.setDate(d.getDate() - 1); // today not done yet: count up to yesterday
  while (S.days.includes(dayKey(d))){ n++; d.setDate(d.getDate() - 1); }
  return n;
}
function renderRing(){
  const pts = {learning:1, confident:2, mastered:3};
  const total = VERSES.length * 3, got = VERSES.reduce((a, v) => a + (pts[S.status[v.id]] || 0), 0);
  const f = got / total, C = 2 * Math.PI * 38, done = VERSES.filter(v => S.status[v.id] === "mastered").length;
  const next = VERSES.find(v => S.status[v.id] !== "mastered");
  const week = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return `<i class="${S.days.includes(dayKey(d)) ? "on" : ""}" title="${d.toDateString()}">${"SMTWTFS"[d.getDay()]}</i>`; }).join("");
  const s = streak();
  $("#ringCard").innerHTML = `<svg viewBox="0 0 92 92"><circle cx="46" cy="46" r="38" fill="none" stroke="var(--surface-2)" stroke-width="10"/><circle cx="46" cy="46" r="38" fill="none" stroke="var(--terra)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C * f} ${C}" transform="rotate(-90 46 46)"/><text x="46" y="52" text-anchor="middle" font-family="var(--f-display)" font-size="20" fill="var(--ink)">${Math.round(f * 100)}%</text></svg><div><h3>Your progress</h3><p class="muted" style="font-size:.9rem;margin-top:4px">${done} of ${VERSES.length} parts mastered.${next ? ` Next up: <a href="#memorise" data-next="${next.id}">${esc(next.label)}</a>.` : " All mastered!"}</p><div class="streak">${week}</div><p class="muted" style="font-size:.8rem;margin-top:6px">${s ? `${s}-day practice streak` : "Practise today to start a streak"}</p></div>`;
  const a = $("#ringCard [data-next]"); if (a) a.onclick = () => { S.memV = a.dataset.next; S.cur = a.dataset.next; S.shown = 1; renderMem(); renderSide(); };
}

/* ================= Chant ================= */
function renderChant(){
  const sub = subScript();
  $("#tSub").textContent = "Show " + ({ta:"Tamil", iast:"IAST"}[sub]);
  $("#chantList").innerHTML = VERSES.map((v, i) => (v.part && v.part !== (VERSES[i - 1] || {}).part ? `<h2 class="cpart">${esc(v.part)}</h2>` : "") + `<article class="card" id="c-${v.id}">
    <div class="vhead"><span class="vnum">${v.n}</span><h3>${esc(v.label)}</h3>${v.verb ? `<span class="chip v">ends: ${esc(v.verb[1])}</span>` : ""}<button class="vplay" data-play="${v.id}">${playKey === "c-" + v.id ? "■ Stop" : "▶ Play"}</button><span class="hook">${esc(v.hook)}</span></div>
    <div class="verse">${verseHTML(v)}</div>
    ${S.sub ? `<div class="sub ${sub === "ta" ? "ta" : ""}" style="margin-top:8px">${verseText(v, sub)}</div>` : ""}
    ${S.mean ? `<p class="meaning">${esc(v.en)}</p>` : ""}
    ${S.taM ? `<p class="meaning sub ta" style="color:var(--ink)">${esc(v.ta)}</p>` : ""}
  </article>`).join("");
  $("#tSub").setAttribute("aria-pressed", S.sub); $("#tMean").setAttribute("aria-pressed", S.mean); $("#tTaM").setAttribute("aria-pressed", S.taM);
  $("#chantList").querySelectorAll("[data-play]").forEach(b => b.onclick = () => chantFrom([vById(b.dataset.play)], "c-" + b.dataset.play));
}
const chantFrom = (vs, key) => play(key, seqFor(vs, "#chantList .syl", +$("#chantRep").value), $("#chantTempo"), () => $("#chantClick").checked);
$("#tSub").onclick = () => { S.sub = !S.sub; gstore.set("sub", S.sub); renderChant(); };
$("#tMean").onclick = () => { S.mean = !S.mean; gstore.set("mean", S.mean); renderChant(); };
$("#tTaM").onclick = () => { S.taM = !S.taM; gstore.set("taM", S.taM); renderChant(); };

/* ================= Beat player (shared by Chant and Rhythm) ================= */
let AC = null, timer = null, playKey = null, wake = null, userScrollAt = 0;
// Auto-follow backs off for a few seconds whenever she scrolls herself.
["wheel","touchmove"].forEach(ev => addEventListener(ev, () => userScrollAt = Date.now(), {passive:true}));
const PLAY_BTNS = {chant:"#chantPlay", rhythm:"#rhyPlay"};
function syncPlayButtons(){
  Object.entries(PLAY_BTNS).forEach(([k, sel]) => { const b = $(sel); b.textContent = playKey === k ? "■ Stop" : b.dataset.label; });
  document.querySelectorAll("[data-play]").forEach(b => b.textContent = playKey === "c-" + b.dataset.play ? "■ Stop" : "▶ Play");
  $("#nowbar").hidden = !playKey;
}
function tick(long){
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.frequency.value = long ? 520 : 780; o.type = "sine";
    g.gain.setValueAtTime(.0001, AC.currentTime); g.gain.exponentialRampToValueAtTime(.18, AC.currentTime + .01);
    g.gain.exponentialRampToValueAtTime(.0001, AC.currentTime + (long ? .22 : .1));
    o.connect(g).connect(AC.destination); o.start(); o.stop(AC.currentTime + .25);
  } catch(e){}
}
function stopPlay(){
  clearTimeout(timer); timer = null; playKey = null;
  document.querySelectorAll(".syl.now, .sb.now").forEach(x => x.classList.remove("now"));
  document.querySelectorAll(".syl.done").forEach(x => x.classList.remove("done"));
  try { if (wake) wake.release(); } catch(e){} wake = null;
  syncPlayButtons();
}
// key names what is playing (so a re-rendered button still toggles it).
// seq: [{sel, w, gap, label}] — highlights every element matching sel for 1 or 2 beats.
function play(key, seq, tempoEl, sound){
  if (playKey === key){ stopPlay(); return; }
  stopPlay(); playKey = key; syncPlayButtons(); markPractice();
  try { navigator.wakeLock && navigator.wakeLock.request("screen").then(w => { if (playKey) wake = w; else w.release(); }).catch(() => {}); } catch(e){}
  let i = 0;
  const step = () => {
    if (playKey !== key) return;
    document.querySelectorAll(".syl.now, .sb.now").forEach(x => { x.classList.remove("now"); if (x.classList.contains("syl")) x.classList.add("done"); });
    if (i >= seq.length){ stopPlay(); return; }
    const s = seq[i++], beat = 60000 / (+tempoEl.value * 2);
    if (s.reset) document.querySelectorAll(".syl.done").forEach(x => x.classList.remove("done"));
    const els = document.querySelectorAll(s.sel);
    els.forEach(x => x.classList.add("now"));
    $("#nowTxt").textContent = s.label;
    // Follow the text only when it leaves the comfortable middle of the screen.
    if (els[0] && Date.now() - userScrollAt > 3000){
      const r = els[0].getBoundingClientRect();
      if (r.top < 150 || r.bottom > innerHeight - 110) window.scrollTo({top: scrollY + r.top - innerHeight * .35, behavior:"smooth"});
    }
    if (sound()) tick(s.w === "G");
    timer = setTimeout(step, beat * (s.w === "G" ? 2 : 1) + (s.gap ? beat * 2 : 0));
  };
  step();
}
function seqFor(vs, prefix, rep = 1){
  const seq = [];
  vs.forEach(v => { for (let r = 0; r < rep; r++) v.L.forEach((l, li) => l.syl.forEach((s, si) => seq.push({
    sel:`${prefix}[data-s="${v.id}.${li}.${si}"]`, w:s.w, gap: si === l.syl.length - 1, reset: r > 0 && li === 0 && si === 0,
    label:`${v.label} · line ${li + 1}${rep > 1 ? ` · ${r + 1} of ${rep}` : ""}`}))); });
  return seq;
}
$("#chantTempo").oninput = e => $("#chantTempoV").textContent = e.target.value;
$("#rhyTempo").oninput = e => $("#rhyTempoV").textContent = e.target.value;
Object.values(PLAY_BTNS).forEach(sel => $(sel).dataset.label = $(sel).textContent);
$("#chantPlay").onclick = () => chantFrom(VERSES, "chant");
$("#rhyPlay").onclick = () => play("rhythm", seqFor([vById(S.rhyV)], "#rhyBody .sb"), $("#rhyTempo"), () => true);
$("#nowStop").onclick = stopPlay;

/* ================= Meaning ================= */
function renderMeaning(){
  $("#meanChips").innerHTML = `<button data-m="all" class="${S.meanV === "all" ? "on" : ""}">All</button>` + VERSES.map(v => `<button data-m="${v.id}" class="${S.meanV === v.id ? "on" : ""}">${esc(v.label)}</button>`).join("");
  $("#meanChips").querySelectorAll("button").forEach(b => b.onclick = () => { S.meanV = b.dataset.m; renderMeaning(); });
  const list = S.meanV === "all" ? VERSES : [vById(S.meanV)];
  const tr = S.script === "iast" ? "ta" : "iast";
  $("#meanBody").innerHTML = list.map(v => `<article class="card" id="m-${v.id}">
    <div class="vhead"><span class="vnum">${v.n}</span><h3>${esc(v.label)}</h3><span class="hook">${esc(v.hook)}</span></div>
    <div class="grid2" style="align-items:start">
      <div style="overflow-x:auto"><table class="wtab">${v.L.map((l, li) => `<tr><td class="lnlabel" colspan="2">line ${li + 1}</td></tr>` + l.words.map(w => `<tr><td>${R(w[0])}<span class="tr">${R(w[0], tr)}</span></td><td>${esc(w[1])}<span class="bd">${esc(w[2])}</span></td></tr>`).join("")).join("")}</table></div>
      <div style="display:grid;gap:12px">
        <div><p class="eyebrow">Meaning</p><p style="margin-top:4px">${esc(v.en)}</p></div>
        <div><p class="eyebrow">தமிழ் பொருள்</p><p class="sub ta" style="margin-top:4px;color:var(--ink)">${esc(v.ta)}</p></div>
        ${v.note ? `<div class="tip">${esc(v.note)}</div>` : ""}
        <div><p class="eyebrow">My notes</p><textarea data-note="${v.id}" placeholder="Notes from the class, a story, how you remember it…">${esc(S.notes[v.id] || "")}</textarea><span class="printnote">${esc(S.notes[v.id] || "—")}</span></div>
      </div>
    </div>
  </article>`).join("");
  $("#meanBody").querySelectorAll("textarea").forEach(t => t.oninput = () => { S.notes[t.dataset.note] = t.value; store.set("notes", S.notes); t.nextElementSibling.textContent = t.value || "—"; });
}
$("#printBtn").onclick = () => { S.meanV = "all"; renderMeaning(); setTimeout(() => window.print(), 50); };

/* ================= Memorise ================= */
const LEVELS = [["Read it",0],["A few gaps",1],["Half hidden",2],["First sound only",3],["From memory",4]];
let gapSeed = 1;
function rnd(i){ const x = Math.sin(i * 9301 + gapSeed * 49297) * 233280; return x - Math.floor(x); }
function maskFor(level, li){
  if (!level) return null;
  return wi => {
    const r = rnd(li * 31 + wi);
    if (level === 1) return r < .3 ? "blank" : false;
    if (level === 2) return r < .6 ? "blank" : false;
    if (level === 3) return "hint";
    return "blank";
  };
}
function renderMem(){
  const v = vById(S.memV);
  $("#memChips").innerHTML = VERSES.map(x => `<button data-m="${x.id}" class="${x.id === S.memV ? "on" : ""}">${esc(x.label)}</button>`).join("");
  $("#memChips").querySelectorAll("button").forEach(b => b.onclick = () => { S.memV = b.dataset.m; S.cur = b.dataset.m; S.shown = 1; renderMem(); renderSide(); });
  $("#levels").innerHTML = LEVELS.map(([t, l]) => `<button aria-pressed="${S.memLevel === l}" data-l="${l}">${t}</button>`).join("");
  $("#levels").querySelectorAll("button").forEach(b => b.onclick = () => { S.memLevel = +b.dataset.l; renderMem(); });
  $("#memHead").innerHTML = `<span class="vnum">${v.n}</span><h3>${esc(v.label)}</h3><span class="hook">${esc(v.hook)}</span>`;
  const n = S.lineMode ? Math.min(S.shown, v.L.length) : v.L.length;
  $("#memText").innerHTML = v.L.slice(0, n).map((l, li) => `<span class="ln">${lineHTML(v, li, {mask: maskFor(S.memLevel, li)})}</span>`).join("");
  $("#lineMode").setAttribute("aria-pressed", S.lineMode);
  $("#nextLine").hidden = !S.lineMode || n >= v.L.length;
  $("#status").innerHTML = [["learning","Learning"],["confident","Confident"],["mastered","Mastered"]].map(([k, t]) => `<button class="${k}" aria-pressed="${S.status[v.id] === k}" data-k="${k}">${t}</button>`).join("");
  $("#status").querySelectorAll("button").forEach(b => b.onclick = () => {
    S.status[v.id] = S.status[v.id] === b.dataset.k ? undefined : b.dataset.k; store.set("status", S.status);
    markPractice(); renderMem(); renderSide(); renderRing();
  });
  renderRec(v);
  $("#memTip").hidden = !v.tip;
  $("#memTip").innerHTML = "<b>Memory hook.</b> " + (v.tip || "");
}
// Record yourself: MediaRecorder, kept in memory per verse for this session.
let recorder = null;
function renderRec(v){
  const box = $("#rec"), url = S.rec[v.id];
  if (!navigator.mediaDevices || !window.MediaRecorder){ box.innerHTML = `<p class="muted">Recording isn't supported in this browser.</p>`; return; }
  if (recorder && recorder.state === "recording"){ box.innerHTML = `<span><i class="dot"></i>Recording ${esc(v.label)}…</span><button class="primary" id="recStop">■ Stop recording</button>`; $("#recStop").onclick = () => recorder.stop(); return; }
  const sv = S.recSave[v.id];
  box.innerHTML = `<button class="primary" id="recGo">● Record ${esc(v.label)}</button>${url ? `<audio controls src="${url}"></audio><button id="recDel">Delete</button>` : ""}${sv ? `<span class="recsave ${sv.cls}" role="status">${esc(sv.msg)}${sv.cls === "bad" ? ` <button id="recRetry">Try again</button>` : ""}</span>` : ""}`;
  if (sv && sv.cls === "bad") $("#recRetry").onclick = () => saveRec(v);
  $("#recGo").onclick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const chunks = []; recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (S.rec[v.id]) URL.revokeObjectURL(S.rec[v.id]);
        const blob = new Blob(chunks, {type: recorder.mimeType});
        S.rec[v.id] = URL.createObjectURL(blob); S.recBlob[v.id] = blob;
        recorder = null; markPractice(); saveRec(v);
      };
      recorder.start(); renderRec(v);
    } catch(e){ box.insertAdjacentHTML("beforeend", `<p class="muted" style="width:100%">Microphone permission was not given.</p>`); }
  };
  if (url) $("#recDel").onclick = () => { URL.revokeObjectURL(url); delete S.rec[v.id]; delete S.recBlob[v.id]; delete S.recSave[v.id]; renderRec(v); };
}
// With Google sign-in on (auth.js), each new recording is also saved to the site owner's Google Drive.
function saveRec(v){
  const blob = S.recBlob[v.id], A = window.SLAUTH;
  if (!blob || !A || !A.upload){ renderRec(vById(S.memV)); return; }
  S.recSave[v.id] = {cls: "busy", msg: "Saving to Google Drive…"}; renderRec(vById(S.memV));
  A.upload(blob, {title: document.title, verse: v.label}).then(
    () => { if (S.recBlob[v.id] === blob) S.recSave[v.id] = {cls: "ok", msg: "✓ Saved to Google Drive"}; },
    e => { if (S.recBlob[v.id] === blob) S.recSave[v.id] = {cls: "bad", msg: "Not saved: " + (e && e.message || "something went wrong")}; }
  ).then(() => renderRec(vById(S.memV)));
}
$("#lineMode").onclick = () => { S.lineMode = !S.lineMode; S.shown = 1; renderMem(); };
$("#nextLine").onclick = () => { S.shown++; renderMem(); };
$("#reshuffle").onclick = () => { gapSeed++; renderMem(); };

/* ================= Rhythm & sound ================= */
function renderRhythm(){
  const v = vById(S.rhyV);
  $("#rhyIntro").innerHTML = `<h2>The rhythm: ${esc(SLOKA.meter.name)}</h2><p class="lead" style="margin-top:6px">${SLOKA.meter.intro} Hold a long syllable about twice as long as a short one. A syllable is long if its vowel is long (ā ī ū e ai o au), or it ends in ṃ / ḥ, or two consonants follow it.</p>`;
  $("#rhyChips").innerHTML = VERSES.map(x => `<button data-m="${x.id}" class="${x.id === S.rhyV ? "on" : ""}">${esc(x.label)}</button>`).join("");
  $("#rhyChips").querySelectorAll("button").forEach(b => b.onclick = () => { stopPlay(); S.rhyV = b.dataset.m; S.cur = b.dataset.m; renderRhythm(); renderSide(); });
  const m = meterOf(v), anu = m === "anushtubh";
  const hook = v.meterNote ? v.meterNote
    : m === SLOKA.meter.kind && SLOKA.meter.hook ? SLOKA.meter.hook
    : anu ? "Anuṣṭubh: two quarters of 8 per line. The outlined syllables 5–6–7 keep the swing: short–long–long, then short–long–short."
    : `Every line: ${"◦–".repeat(8)}`;
  const brk = anu ? 8 : v.padaLen || 0; // gap between the two quarters of a line
  $("#rhyBody").innerHTML = `<div class="vhead"><span class="vnum">${v.n}</span><h3>${esc(v.label)}</h3><span class="hook">${esc(hook)}</span></div>` +
    v.L.map((l, li) => `<p class="eyebrow" style="margin-top:8px">line ${li + 1} · ${l.syl.length} syllables</p><div class="meter">${l.syl.map((s, si) => `${brk && si === brk ? `<span class="qbrk"></span>` : ""}<span class="sb ${s.w}${anu && ANU_KEY[si] ? " key" : ""}${anu && ANU_KEY[si] && ANU_KEY[si] !== s.w ? " off" : ""}" data-s="${v.id}.${li}.${si}"><span class="bx"></span><span class="tx">${render(s.idx.map(i => l.ph[i]), S.script)}</span></span>`).join("")}</div>`).join("");
  // Pronunciation table: find an example word in this sloka for each letter.
  const rows = [["க","k"],["ச","c"],["ட","ṭ"],["த","t"],["ப","p"]];
  const sets = {k:["k","kh","g","gh"], c:["c","ch","j","jh"], "ṭ":["ṭ","ṭh","ḍ","ḍh"], t:["t","th","d","dh"], p:["p","ph","b","bh"]};
  const ex = k => { const hit = ALLW.find(w => tokenize(w.dv).some(p => p.t === "C" && p.k === k)); return hit ? R(hit.dv) : "—"; };
  const cell = k => { const c = C_INFO[k]; const ta = c[1] + (c[2] ? `<span class="g">${c[2]}</span>` : ""); return `<td><span class="big">${ta}</span> <span class="mono">${k}</span><br><span class="ex">${ex(k)}</span></td>`; };
  $("#ptab").innerHTML = `<tr><th>Letter</th><th>plain</th><th>² with breath</th><th>³ soft</th><th>⁴ soft + breath</th></tr>` + rows.map(([ta, k]) => `<tr><td class="big">${ta}</td>${sets[k].map(cell).join("")}</tr>`).join("");
}

/* ================= Flashcards ================= */
const FC = {deck:[], i:0, kind: store.get("deck", "lines")};
function buildDeck(){
  const cards = [];
  if (FC.kind === "lines"){
    VERSES.forEach(v => v.L.forEach((l, li) => {
      const nv = li < v.L.length - 1 ? [v, li + 1] : null;
      if (nv) cards.push({f:`<div><p class="eyebrow">${esc(v.label)} · what comes next?</p><div class="verse" style="margin-top:8px">${l.words.map(w => R(w[0])).join(" ")}</div></div>`, b:`<div class="verse">${v.L[li + 1].words.map(w => R(w[0])).join(" ")}</div>`});
    }));
    VERSES.filter(v => v.kind !== "dhyana").forEach(v => cards.push({f:`<div><p class="eyebrow">How does this verse begin?</p><h2 style="margin-top:8px">${esc(v.label)}: “${esc(v.hook)}”</h2></div>`, b:`<div class="verse">${v.L[0].words.map(w => R(w[0])).join(" ")}</div>`}));
  } else {
    UW.filter(w => w.dv.length > 2).forEach(w => cards.push({f:`<div><p class="eyebrow">What does this mean?</p><div class="verse" style="margin-top:8px;font-size:1.6rem">${R(w.dv)}</div></div>`, b:`<div><h2>${esc(w.g)}</h2><p class="mono" style="margin-top:8px;font-size:.82rem">${esc(w.b)}</p><p style="margin-top:8px;font-size:.85rem">${esc(w.v.label)}, line ${w.li + 1}</p></div>`}));
  }
  FC.deck = cards.sort(() => Math.random() - .5); FC.i = 0; showCard();
  $("#deckBtns").innerHTML = [["lines","Next line"],["words","Word meanings"]].map(([k, t]) => `<button aria-pressed="${FC.kind === k}" data-k="${k}">${t}</button>`).join("");
  $("#deckBtns").querySelectorAll("button").forEach(b => b.onclick = () => { FC.kind = b.dataset.k; store.set("deck", FC.kind); buildDeck(); });
}
function showCard(){
  const c = FC.deck[FC.i]; $("#fc").classList.remove("flip");
  if (!c){ $("#fcF").innerHTML = `<div><h2>Deck done</h2><p class="muted" style="margin-top:8px">Every card answered. Shuffle and go again?</p><button class="primary" style="margin-top:12px" onclick="buildDeck()">Shuffle again</button></div>`; $("#fcB").innerHTML = ""; $("#fcCount").textContent = ""; return; }
  $("#fcF").innerHTML = c.f; setTimeout(() => $("#fcB").innerHTML = c.b, 260);
  $("#fcCount").textContent = `${FC.i + 1} / ${FC.deck.length}`;
}
$("#fc").onclick = () => { if (FC.deck[FC.i]){ $("#fcB").innerHTML = FC.deck[FC.i].b; $("#fc").classList.toggle("flip"); } };
$("#fcGood").onclick = () => { if (!FC.deck[FC.i]) return; markPractice(); FC.i++; showCard(); };
$("#fcAgain").onclick = () => { const c = FC.deck[FC.i]; if (!c) return; FC.deck.splice(Math.min(FC.deck.length, FC.i + 4), 0, c); FC.i++; showCard(); };

/* ================= Quiz ================= */
const QZ = {qs:[], i:0, score:0};
const pick = (arr, n, not) => arr.filter(x => !not.includes(x)).sort(() => Math.random() - .5).slice(0, n);
function newQuiz(){
  const qs = [], gems = VERSES.filter(v => v.verb), shuffledW = UW.filter(w => w.dv.length > 3).sort(() => Math.random() - .5);
  // 1. missing word (×3)
  shuffledW.slice(0, 3).forEach(w => {
    const line = w.v.L[w.li].words.map((x, i) => i === w.wi ? "_____" : R(x[0])).join(" ");
    const wrong = pick(UW.filter(x => x.dv.length > 3 && x.dv !== w.dv), 3, []).map(x => x.dv);
    qs.push({q:`<p class="eyebrow">${esc(w.v.label)} · fill the gap</p><div class="verse">${line}</div>`, opts:[w.dv, ...wrong], verse:true, a:0, why:`${R(w.dv)} — ${esc(w.g)}`});
  });
  // 2. meaning (×3)
  shuffledW.slice(3, 6).forEach(w => {
    const wrong = pick(uniq(UW, x => x.g).filter(x => x.g !== w.g), 3, []).map(x => x.g);
    qs.push({q:`<p class="eyebrow">What does this word mean?</p><div class="verse">${R(w.dv)}</div>`, opts:[w.g, ...wrong], a:0, why:esc(w.b)});
  });
  // 3. what comes next (×2)
  pick(VERSES.flatMap(v => v.L.slice(0, -1).map((l, li) => [v, li])), 2, []).forEach(([v, li]) => {
    const right = v.L[li + 1].words.map(w => w[0]).join(" ");
    const wrong = pick(uniq(VERSES.flatMap(x => x.L.map(l => l.words.map(w => w[0]).join(" "))), s => s), 3, [right]);
    qs.push({q:`<p class="eyebrow">${esc(v.label)} · which line comes next?</p><div class="verse">${v.L[li].words.map(w => R(w[0])).join(" ")}</div>`, opts:[right, ...wrong], verse:true, a:0, why:"The next line, in order."});
  });
  // 4. verse endings & facts (×2)
  if (gems.length >= 4){
    const g = gems[Math.floor(Math.random() * gems.length)];
    qs.push({q:`<p class="eyebrow">The ladder of devotion</p><h3>Verse ${g.n} ends with which verb?</h3>`, opts:[g.verb[0], ...gems.filter(x => x !== g).sort(() => Math.random() - .5).slice(0, 3).map(x => x.verb[0])], verse:true, a:0, why:`${R(g.verb[0])} — ${esc(g.verb[1])}`});
  } else {
    // Which verse is this first line from? (first lines are the distinctive ones)
    const pool = VERSES.filter(v => !v.kind), v = pool[Math.floor(Math.random() * pool.length)];
    qs.push({q:`<p class="eyebrow">Which verse is this?</p><div class="verse">${v.L[0].words.map(w => R(w[0])).join(" ")}</div>`, opts:[v.label, ...pick(pool.filter(x => x !== v), 3, []).map(x => x.label)], a:0, why:`${esc(v.label)}: ${esc(v.hook)}`});
  }
  const mq = SLOKA.meter.quiz; qs.push({q:`<h3>${esc(mq.q)}</h3>`, opts: mq.opts, a:0, why: esc(mq.why)});
  QZ.qs = qs.map(q => { const order = q.opts.map((o, i) => i).sort(() => Math.random() - .5); return {...q, opts: order.map(i => q.opts[i]), a: order.indexOf(q.a)}; }).sort(() => Math.random() - .5);
  QZ.i = 0; QZ.score = 0; showQ();
}
function showQ(){
  $("#qbar").style.width = (QZ.i / QZ.qs.length * 100) + "%";
  if (QZ.i >= QZ.qs.length){
    $("#quizBox").innerHTML = `<h2>${QZ.score} / ${QZ.qs.length}</h2><p class="muted">${QZ.score >= 8 ? "Wonderful — the gems are shining." : QZ.score >= 5 ? "Good going. Another round will lock it in." : "Keep at it. Try the Memorise tab, then come back."}</p><div><button class="primary" id="qAgain">New quiz</button></div>`;
    $("#qAgain").onclick = newQuiz; markPractice(); return;
  }
  const q = QZ.qs[QZ.i];
  $("#quizBox").innerHTML = `<p class="mono muted" style="font-size:.78rem">Question ${QZ.i + 1} of ${QZ.qs.length}</p>${q.q}<div class="opts">${q.opts.map((o, i) => `<button data-i="${i}"><i class="k">${"ABCD"[i]}</i>${q.verse ? `<span class="verse">${R(o)}</span>` : esc(o)}</button>`).join("")}</div><div id="qWhy"></div>`;
  $("#quizBox").querySelectorAll(".opts button").forEach(b => b.onclick = () => {
    if ($("#quizBox").dataset.done === "1") return; $("#quizBox").dataset.done = "1";
    const i = +b.dataset.i; if (i === q.a) QZ.score++;
    $("#quizBox").querySelectorAll(".opts button").forEach(x => { if (+x.dataset.i === q.a) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
    $("#qWhy").innerHTML = `<div class="tip"><b>${i === q.a ? "Right!" : "Not quite."}</b> ${q.why}</div><div style="margin-top:12px"><button class="primary" id="qNext">Next →</button></div>`;
    $("#qNext").onclick = () => { $("#quizBox").dataset.done = "0"; QZ.i++; showQ(); };
  });
}
$("#quizNew").onclick = newQuiz;

/* ================= Boot ================= */
function renderAll(){
  renderSide(); renderJapa(); renderDone(); renderOverview(); renderChant(); renderMeaning(); renderMem(); renderRhythm();
  if (FC.deck.length) buildDeck();
  if (QZ.qs.length) showQ();
}
applySettings(); renderAll(); route();
