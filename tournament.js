// Tournament organisation: Swiss pairing, table assignment, standings and QR/link sharing.
// Loaded after the main script (uses its globals: S, T, esc, toast, render, readJSON, TP, TOURN_TP, TOURN_KEY).
const VIEW_KEY = 'epic-guide-follow-v1';
const BYE_TP = 16;

const TI = {
  en: {
    intro: 'Organise a tournament or follow one.',
    orgCard: 'Organise a tournament', orgDesc: 'Swiss pairings, tables and standings. You enter the results.',
    followCard: 'Follow a tournament', followDesc: 'Open the link or scan the QR code shared by your tournament organiser (TO). Your standing, next opponent and table will appear here.',
    create: 'Create tournament', tname: 'Tournament name', rounds: 'Rounds', tables: 'Tables', auto: 'auto', scen: 'Scenario',
    tabs: {players: ['👥', 'Players'], round: ['🎲', 'Round'], standings: ['🏆', 'Standings'], share: ['📲', 'Share'], settings: ['⚙', 'Settings'], paint: ['🎨', 'Paint'], me: ['🙋', 'Me'], home: ['🏠', 'Tournament']},
    addPlayer: '＋ Add player', pname: 'Name', army: 'Army (text)', list: 'Army list link (e.g. Army Forge)', drop: 'Drop', activate: 'Re-activate', dropped: 'dropped',
    playersHint: 'Dropped players are no longer paired. Players can be added at any time; they join with the next round.',
    activeCount: n => `${n} active players`, tablesNeed: n => `${n} needed for the current players; "auto" = as many as needed`, tablesShort: (h, n) => `⚠ Only ${h} tables set but ${n} are needed. Add tables in Players.`,
    pair1: 'Pair round 1', pairN: n => `Pair round ${n}`, redo: 'Redo pairing', confirmRedo: 'Discard this round’s pairings and pair again?',
    needPlayers: 'At least 2 active players are needed.', needResults: 'Confirm all results of this round first.',
    table: 'Table', bye: 'Bye', byeTxt: `Bye: ${BYE_TP} TP, goal difference 0`, confirm: '✔ Confirm result', edit: '✎ Edit',
    rematch: '⚠ rematch', tableRep: '⚠ table repeated', pairNote: 'Pairing: Swiss by ranking (TP, goal difference, head-to-head). No rematches and no repeated tables where avoidable.',
    allDone: '🏁 All rounds finished – see standings.', t3: 'Victory turn 3', t4: 'Turn 4+', vps: 'Draw: army value > 250 VP',
    none: '–', noRounds: 'No round paired yet.', goals: 'Goals',
    cols: ['#', 'Player', 'TP', 'GD'], tieNote: 'Ranking: tournament points, then goal difference, then head-to-head.',
    shareTitle: 'Share with players', incLists: 'Include army list links', copy: '📋 Copy link', copied: 'Link copied', shareBtn: '↗ Share…',
    shareNote: 'Players scan the QR code or open the link and see standings, their opponent and table. The data lives only on your device, so share again after each update.',
    tooBig: 'Too large for a QR code. Copy the link and send it via chat instead, or switch off the army list links.',
    linkSize: n => `${n} characters`,
    settingsTitle: 'Tournament settings', finish: 'Finish & archive tournament', confirmFinish: 'Archive this tournament? You can restore it later from the Tournament start page or Settings.',
    whoAmI: 'Who are you?', choose: '– choose your name –', rank: 'Rank', next: 'Next game', vs: 'vs', notPaired: 'Not paired yet. Wait for the next round.',
    hasBye: 'You have a bye this round.', opponent: 'Opponent', armyL: 'Army', listL: 'Army list', openList: 'Open army list ↗', result: 'Result',
    allPair: 'All pairings', updated: 'Updated', followHint: 'For updates open the TO’s link or scan the QR code again.', unfollow: 'Stop following', confirmUnf: 'Stop following this tournament?',
    loadErr: 'The tournament link could not be read.', loaded: 'Tournament data loaded', role: {org: 'Organise', view: 'Follow'}, playBtn: '▶ Start this game', playHint: 'Tap a pairing to open it in the Game tab.', confirmPlay: 'A game is in progress. Replace it with this pairing?', roundL: 'Round', games: 'Games',
    paintTitle: 'Painting competition', paintOff: 'Optional: let players vote for their favourite army.', paintEnable: 'Enable painting competition', paintDisable: 'Disable', paintMode: {ballot: 'Ballot', manual: 'Enter winner'},
    paintWinner: 'Winner', paintNone: '– none –', voted: (a, b) => `${a} / ${b} ballots submitted`, openVote: '▶ Open voting', closeVote: '■ Close voting & show result', reopenVote: 'Reopen voting',
    voter: 'Voter', pick: ['🥇 1st (3 pts)', '🥈 2nd (2 pts)', '🥉 3rd (1 pt)'], submitBallot: '✔ Submit ballot', ballotSaved: 'Ballot saved (hidden)', ballotBad: 'Choose a voter and three different armies (not your own).',
    ballotHint: 'Hand the device to each player. Results stay hidden until you close voting. Submitting again replaces a ballot.', paintResult: 'Painting result', pts: 'pts', firsts: '🥇',
    archiveTitle: 'Archived tournaments', archiveNone: 'No archived tournaments.', restore: 'Restore', del: 'Delete', confirmRestore: 'Restore this tournament? The currently active one will be archived.', confirmDel: 'Delete this archived tournament permanently?', playersN: n => `${n} players`,
  },
  de: {
    intro: 'Organisiere ein Turnier oder verfolge eines.',
    orgCard: 'Turnier organisieren', orgDesc: 'Schweizer System, Tische und Rangliste. Du trägst die Ergebnisse ein.',
    followCard: 'Turnier verfolgen', followDesc: 'Öffne den Link oder scanne den QR-Code deines Turnierorganisators (TO). Deine Platzierung, nächster Gegner und Tisch erscheinen hier.',
    create: 'Turnier erstellen', tname: 'Turniername', rounds: 'Runden', tables: 'Tische', auto: 'auto', scen: 'Szenario',
    tabs: {players: ['👥', 'Spieler'], round: ['🎲', 'Runde'], standings: ['🏆', 'Rangliste'], share: ['📲', 'Teilen'], settings: ['⚙', 'Optionen'], paint: ['🎨', 'Bemalung'], me: ['🙋', 'Ich'], home: ['🏠', 'Turnier']},
    addPlayer: '＋ Spieler hinzufügen', pname: 'Name', army: 'Armee (Text)', list: 'Armeelisten-Link (z. B. Army Forge)', drop: 'Ausscheiden', activate: 'Reaktivieren', dropped: 'ausgeschieden',
    playersHint: 'Ausgeschiedene Spieler werden nicht mehr gepaart. Spieler können jederzeit hinzukommen und starten mit der nächsten Runde.',
    activeCount: n => `${n} aktive Spieler`, tablesNeed: n => `${n} nötig für die aktuellen Spieler; „auto“ = so viele wie nötig`, tablesShort: (h, n) => `⚠ Nur ${h} Tische eingestellt, aber ${n} nötig. Tische unter „Spieler“ erhöhen.`,
    pair1: 'Runde 1 auslosen', pairN: n => `Runde ${n} auslosen`, redo: 'Neu auslosen', confirmRedo: 'Paarungen dieser Runde verwerfen und neu auslosen?',
    needPlayers: 'Mindestens 2 aktive Spieler nötig.', needResults: 'Zuerst alle Ergebnisse dieser Runde bestätigen.',
    table: 'Tisch', bye: 'Freilos', byeTxt: `Freilos: ${BYE_TP} TP, Zieldifferenz 0`, confirm: '✔ Ergebnis bestätigen', edit: '✎ Ändern',
    rematch: '⚠ Wiederholung', tableRep: '⚠ Tisch wiederholt', pairNote: 'Auslosung: Schweizer System nach Rangliste (TP, Zieldifferenz, direkter Vergleich). Keine Wiederholungen von Gegnern und Tischen, wenn vermeidbar.',
    allDone: '🏁 Alle Runden beendet – siehe Rangliste.', t3: 'Sieg in Zug 3', t4: 'Zug 4+', vps: 'Unentschieden: Armeewert > 250 VP',
    none: '–', noRounds: 'Noch keine Runde ausgelost.', goals: 'Ziele',
    cols: ['#', 'Spieler', 'TP', 'ZD'], tieNote: 'Rangfolge: Turnierpunkte, dann Zieldifferenz, dann direkter Vergleich.',
    shareTitle: 'Mit Spielern teilen', incLists: 'Armeelisten-Links einschließen', copy: '📋 Link kopieren', copied: 'Link kopiert', shareBtn: '↗ Teilen…',
    shareNote: 'Spieler scannen den QR-Code oder öffnen den Link und sehen Rangliste, Gegner und Tisch. Die Daten liegen nur auf deinem Gerät – teile nach jeder Aktualisierung erneut.',
    tooBig: 'Zu groß für einen QR-Code. Kopiere den Link und sende ihn per Chat, oder schalte die Armeelisten-Links aus.',
    linkSize: n => `${n} Zeichen`,
    settingsTitle: 'Turniereinstellungen', finish: 'Turnier beenden & archivieren', confirmFinish: 'Dieses Turnier archivieren? Du kannst es später auf der Turnier-Startseite oder in den Optionen wiederherstellen.',
    whoAmI: 'Wer bist du?', choose: '– Namen wählen –', rank: 'Platz', next: 'Nächstes Spiel', vs: 'gegen', notPaired: 'Noch nicht gepaart. Warte auf die nächste Runde.',
    hasBye: 'Du hast in dieser Runde ein Freilos.', opponent: 'Gegner', armyL: 'Armee', listL: 'Armeeliste', openList: 'Armeeliste öffnen ↗', result: 'Ergebnis',
    allPair: 'Alle Paarungen', updated: 'Stand', followHint: 'Für Updates den Link des TO öffnen oder den QR-Code erneut scannen.', unfollow: 'Nicht mehr verfolgen', confirmUnf: 'Dieses Turnier nicht mehr verfolgen?',
    loadErr: 'Der Turnierlink konnte nicht gelesen werden.', loaded: 'Turnierdaten geladen', role: {org: 'Organisieren', view: 'Verfolgen'}, playBtn: '▶ Dieses Spiel starten', playHint: 'Paarung antippen, um sie im Spiel-Tab zu öffnen.', confirmPlay: 'Ein Spiel läuft. Durch diese Paarung ersetzen?', roundL: 'Runde', games: 'Spiele',
    paintTitle: 'Bemalwettbewerb', paintOff: 'Optional: Spieler stimmen für ihre Lieblingsarmee ab.', paintEnable: 'Bemalwettbewerb aktivieren', paintDisable: 'Deaktivieren', paintMode: {ballot: 'Stimmzettel', manual: 'Sieger eintragen'},
    paintWinner: 'Sieger', paintNone: '– keiner –', voted: (a, b) => `${a} / ${b} Stimmzettel abgegeben`, openVote: '▶ Abstimmung öffnen', closeVote: '■ Abstimmung beenden & Ergebnis zeigen', reopenVote: 'Abstimmung wieder öffnen',
    voter: 'Wähler', pick: ['🥇 1. (3 Pkt.)', '🥈 2. (2 Pkt.)', '🥉 3. (1 Pkt.)'], submitBallot: '✔ Stimmzettel abgeben', ballotSaved: 'Stimmzettel gespeichert (verdeckt)', ballotBad: 'Wähler und drei verschiedene Armeen wählen (nicht die eigene).',
    ballotHint: 'Gerät reihum geben. Ergebnisse bleiben verborgen, bis du die Abstimmung beendest. Erneutes Abgeben ersetzt einen Stimmzettel.', paintResult: 'Ergebnis Bemalung', pts: 'Pkt.', firsts: '🥇',
    archiveTitle: 'Archivierte Turniere', archiveNone: 'Keine archivierten Turniere.', restore: 'Wiederherstellen', del: 'Löschen', confirmRestore: 'Dieses Turnier wiederherstellen? Das aktuell aktive wird archiviert.', confirmDel: 'Dieses archivierte Turnier endgültig löschen?', playersN: n => `${n} Spieler`,
  },
};
const tt = () => TI[S.lang];

// ---------- state ----------
let TD = (() => { const d = readJSON(TOURN_KEY) || {}; return {cur: d.cur || null, archive: d.archive || []}; })();
let FV = readJSON(VIEW_KEY) || null; // {snap, me}
let tRole = TD.cur ? 'org' : FV ? 'view' : 'none';
const tSub = {org: 'round', view: 'me'};
let tRound = null, tNewMission = 'fire', tNewTables = 0, tNewName = '', shareLists = false, shareUrlNow = '', shareSeq = 0;

function saveTourn() { try { localStorage.setItem(TOURN_KEY, JSON.stringify(TD)); } catch (e) {} }
function saveView() { try { FV ? localStorage.setItem(VIEW_KEY, JSON.stringify(FV)) : localStorage.removeItem(VIEW_KEY); } catch (e) {} }
function touch() { if (TD.cur) TD.cur.upd = Date.now(); saveTourn(); }

// ---------- scoring & standings ----------
function matchTp(mission, m) {
  const a = m.gA || 0, b = m.gB || 0, diff = Math.abs(a - b);
  if (mission === 'fire') { const tp = TP[Math.min(diff, 8)]; return a >= b ? [tp[0], tp[1]] : [tp[1], tp[0]]; }
  if (diff > 0) {
    const tp = TOURN_TP[Math.min(diff, 4)], w = m.t3 ? tp[0] : tp[1];
    return a > b ? [w, 32 - w] : [32 - w, w];
  }
  return m.vps === 'A' ? [18, 14] : m.vps === 'B' ? [14, 18] : [16, 16];
}

function standings(t) {
  const rec = {};
  t.players.forEach(p => rec[p.id] = {p, tp: 0, gf: 0, ga: 0, n: 0, h: {}});
  t.rds.forEach(r => {
    if (r.bye && rec[r.bye]) { rec[r.bye].tp += BYE_TP; rec[r.bye].n++; }
    r.matches.forEach(m => {
      const A = rec[m.a], B = rec[m.b];
      if (!m.done || !A || !B) return;
      const [ta, tb] = matchTp(t.mission, m);
      A.tp += ta; B.tp += tb; A.gf += m.gA; A.ga += m.gB; B.gf += m.gB; B.ga += m.gA; A.n++; B.n++;
      A.h[m.b] = (A.h[m.b] || 0) + ta; B.h[m.a] = (B.h[m.a] || 0) + tb;
    });
  });
  const list = Object.values(rec);
  list.forEach(x => x.gd = x.gf - x.ga);
  list.sort((x, y) => y.tp - x.tp || y.gd - x.gd || x.p.id - y.p.id);
  const out = [];
  for (let i = 0; i < list.length;) {
    let j = i;
    while (j < list.length && list[j].tp === list[i].tp && list[j].gd === list[i].gd) j++;
    const g = list.slice(i, j);
    if (g.length > 1) {
      const ids = new Set(g.map(x => x.p.id));
      g.forEach(x => x.h2h = Object.entries(x.h).reduce((s, [id, v]) => s + (ids.has(+id) ? v : 0), 0));
      g.sort((x, y) => y.h2h - x.h2h || x.p.id - y.p.id);
    }
    out.push(...g); i = j;
  }
  out.forEach((x, i) => x.rank = i + 1);
  return out;
}

// ---------- pairing ----------
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Minimises (rematches first, then rank distance). Pairs top-ranked players first; node-capped for large fields.
function solvePairs(ord, met) {
  const n = ord.length;
  let best = {cost: Infinity, pairs: []}, nodes = 0;
  const used = new Array(n).fill(false), cur = [];
  const pc = (i, j) => (met.has(ord[i] + '-' + ord[j]) ? 1e6 : 0) + (j - i - 1) ** 2;
  (function rec(cost) {
    if (nodes++ > 200000 || best.cost === 0) return;
    const i = used.indexOf(false);
    if (i < 0) { if (cost < best.cost) best = {cost, pairs: cur.slice()}; return; }
    used[i] = true;
    for (let j = i + 1; j < n; j++) {
      if (used[j]) continue;
      const c = cost + pc(i, j);
      if (c >= best.cost) continue;
      used[j] = true; cur.push([ord[i], ord[j]]); rec(c); cur.pop(); used[j] = false;
    }
    used[i] = false;
  })(0);
  return best;
}

function pairRound(t) {
  const order = standings(t).filter(x => x.p.active).map(x => x.p.id);
  if (!t.rds.length) shuffle(order);
  const met = new Set();
  t.rds.forEach(r => r.matches.forEach(m => { met.add(m.a + '-' + m.b); met.add(m.b + '-' + m.a); }));
  let bye = null, best;
  if (order.length % 2) {
    const byes = id => t.rds.filter(r => r.bye === id).length;
    const mn = Math.min(...order.map(byes));
    const cands = order.filter(id => byes(id) === mn).slice(-3).reverse(); // lowest ranked first
    for (const b of cands) {
      const res = solvePairs(order.filter(id => id !== b), met);
      if (!best || res.cost < best.cost) { best = res; bye = b; }
    }
  } else best = solvePairs(order, met);
  return {pairs: best.pairs, bye};
}

// Hungarian algorithm (rows <= cols): minimum-cost assignment of matches to tables
function hungarian(a) {
  const n = a.length, m = a[0].length, INF = 1e18;
  const u = Array(n + 1).fill(0), v = Array(m + 1).fill(0), p = Array(m + 1).fill(0), way = Array(m + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i; let j0 = 0;
    const minv = Array(m + 1).fill(INF), seen = Array(m + 1).fill(false);
    do {
      seen[j0] = true;
      const i0 = p[j0]; let delta = INF, j1 = 0;
      for (let j = 1; j <= m; j++) if (!seen[j]) {
        const c = a[i0 - 1][j - 1] - u[i0] - v[j];
        if (c < minv[j]) { minv[j] = c; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= m; j++) { if (seen[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta; }
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
  }
  const res = Array(n);
  for (let j = 1; j <= m; j++) if (p[j]) res[p[j] - 1] = j - 1;
  return res;
}

function assignTables(t, pairs, nT) {
  const used = {};
  const mark = (id, tb) => (used[id] = used[id] || new Set()).add(tb);
  t.rds.forEach(r => r.matches.forEach(m => { mark(m.a, m.table); mark(m.b, m.table); }));
  const has = (id, k) => used[id] && used[id].has(k) ? 1 : 0, M = pairs.length;
  // small tie-break puts the top-ranked matches on the lowest table numbers
  const cost = pairs.map(([a, b], mi) => Array.from({length: nT}, (_, k) => 1000 * (has(a, k + 1) + has(b, k + 1)) + (M - mi) * k * 0.001));
  return hungarian(cost).map(k => k + 1);
}

function makeRound(t) {
  const {pairs, bye} = pairRound(t);
  const tb = assignTables(t, pairs, Math.max(t.tables || 0, pairs.length));
  t.rds.push({bye, matches: pairs.map(([a, b], i) => ({a, b, table: tb[i], gA: 0, gB: 0, t3: true, vps: '', done: false}))});
}

function matchFlags(t, ri, m) {
  let rematch = false, tableRep = false;
  for (let r = 0; r < ri; r++) t.rds[r].matches.forEach(o => {
    if ((o.a === m.a && o.b === m.b) || (o.a === m.b && o.b === m.a)) rematch = true;
    if (o.table === m.table && [o.a, o.b].some(id => id === m.a || id === m.b)) tableRep = true;
  });
  return {rematch, tableRep};
}

// ---------- share (compressed link + QR) ----------
function b64u(bytes) {
  let s = ''; for (let i = 0; i < bytes.length; i += 8192) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function ub64(s) {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/')), out = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
  return out;
}
async function pack(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  if (!window.CompressionStream) return '0' + b64u(bytes);
  const z = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer();
  return '1' + b64u(new Uint8Array(z));
}
async function unpack(s) {
  let bytes = ub64(s.slice(1));
  if (s[0] === '1') bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
  return JSON.parse(new TextDecoder().decode(bytes));
}
function toSnap(t, lists) {
  return {v: 1, i: t.id, n: t.name, m: t.mission, R: t.rounds, u: t.upd || Date.now(), pt: paintSnap(t),
    p: t.players.map(p => [p.id, p.name, p.army || '', lists ? p.list || '' : '', p.active ? 1 : 0]),
    r: t.rds.map(r => [r.bye || 0, r.matches.map(m => [m.a, m.b, m.table, m.gA, m.gB, m.t3 ? 1 : 0, m.vps || '', m.done ? 1 : 0])])};
}
function fromSnap(s) {
  if (!s || s.v !== 1 || !Array.isArray(s.p) || !Array.isArray(s.r)) throw new Error('bad snapshot');
  return {id: s.i, name: s.n, mission: s.m === 'tourn' ? 'tourn' : 'fire', rounds: s.R, tables: 0, upd: s.u, pr: s.pt || null,
    players: s.p.map(([id, name, army, list, act]) => ({id, name, army, list, active: !!act})),
    rds: s.r.map(([bye, ms]) => ({bye: bye || null, matches: ms.map(([a, b, table, gA, gB, t3, vps, done]) => ({a, b, table, gA, gB, t3: !!t3, vps, done: !!done}))}))};
}
function qrSvg(text) {
  const q = qrcode(0, 'L'); q.addData(text); q.make();
  const n = q.getModuleCount(); let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`;
  return `<svg viewBox="0 0 ${n + 8} ${n + 8}" shape-rendering="crispEdges" style="width:100%;max-width:340px;display:block;margin:0 auto"><rect width="100%" height="100%" fill="#fff"/><path d="${d}"/></svg>`;
}
async function fillShare() {
  const box = document.getElementById('shareBox'); if (!box || !TD.cur) return;
  const seq = ++shareSeq, t = tt();
  const code = await pack(toSnap(TD.cur, shareLists));
  if (seq !== shareSeq) return;
  const base = location.protocol.startsWith('http') ? location.origin + location.pathname : location.href.split('#')[0];
  shareUrlNow = base + '#t=' + code;
  let qr;
  try { qr = qrSvg(shareUrlNow); } catch (e) { qr = `<div class="mut" style="text-align:center">${t.tooBig}</div>`; }
  box.innerHTML = `${qr}<div class="mut" style="text-align:center;margin:8px 0">${t.linkSize(shareUrlNow.length)}</div>
    <div class="row"><button data-ta="copy">${t.copy}</button>${navigator.share ? `<button data-ta="nshare">${t.shareBtn}</button>` : ''}</div>`;
}

async function importHash() {
  const m = /^#t=(.+)$/.exec(location.hash);
  if (!m) return;
  history.replaceState(null, '', location.pathname + location.search);
  try {
    const t = fromSnap(await unpack(m[1]));
    FV = {snap: t, me: FV && FV.snap.id === t.id ? FV.me : null};
    saveView(); tRole = 'view'; tab = 'tourn'; render(); toast(tt().loaded);
  } catch (e) { toast(tt().loadErr); }
}

// ---------- painting competition ----------
const paintOf = t => t.paint || (t.paint = {on: false, mode: 'ballot', status: 'setup', ballots: {}, winner: 0});
let paintVoter = 0, paintPick = [0, 0, 0];

// Result is only available once voting is closed (ballot) or a winner is set (manual); null while hidden.
function paintResult(t) {
  const P = paintOf(t);
  if (!P.on) return null;
  if (P.mode === 'manual') return P.winner ? {mode: 'manual', winner: P.winner, rows: []} : null;
  if (P.status !== 'closed') return null;
  const ids = new Set(t.players.map(p => p.id)), row = {};
  t.players.forEach(p => row[p.id] = {id: p.id, pts: 0, firsts: 0});
  Object.entries(P.ballots).forEach(([voter, picks]) => {
    if (!ids.has(+voter)) return;
    picks.forEach((id, i) => { if (row[id]) { row[id].pts += 3 - i; if (i === 0) row[id].firsts++; } });
  });
  const rows = Object.values(row).sort((a, b) => b.pts - a.pts || b.firsts - a.firsts || a.id - b.id);
  return {mode: 'ballot', winner: rows[0] && rows[0].pts ? rows[0].id : 0, rows: rows.filter(r => r.pts > 0)};
}
function paintSnap(t) {
  const r = paintResult(t);
  return r ? {m: r.mode === 'manual' ? 'm' : 'b', w: r.winner, r: r.rows.map(x => [x.id, x.pts, x.firsts])} : 0;
}
function paintCard(t, res) {
  const L = tt();
  if (!res || !(res.winner || res.rows.length)) return '';
  const tied = res.mode === 'ballot' ? res.rows.filter(r => r.pts === res.rows[0].pts && r.firsts === res.rows[0].firsts).map(r => r.id) : [res.winner];
  return `<div class="card"><h2>🎨 ${L.paintResult}</h2><div class="bigtable" style="font-size:24px">🏆 ${tied.map(id => esc(pn(t, id))).join(' & ')}</div>
    ${res.rows.length ? `<table class="stand" style="margin-top:8px">${res.rows.map(r => `<tr><td style="text-align:left">${esc(pn(t, r.id))}</td><td>${r.pts} ${L.pts}</td><td>${L.firsts} ${r.firsts}</td></tr>`).join('')}</table>` : ''}</div>`;
}
function paintRes(t) {
  if (t.pr) return t.pr.w || t.pr.r.length ? {mode: t.pr.m === 'm' ? 'manual' : 'ballot', winner: t.pr.w, rows: t.pr.r.map(([id, pts, firsts]) => ({id, pts, firsts}))} : null;
  return null;
}

function orgPaint(t, L) {
  const P = paintOf(t);
  if (!P.on) return `<div class="card"><h2>🎨 ${L.paintTitle}</h2><div class="mut" style="margin-bottom:10px">${L.paintOff}</div>
    <button class="on" data-ta="ppon" style="width:100%">${L.paintEnable}</button></div>`;
  const opt = (id, sel) => `<option value="${id}" ${id === sel ? 'selected' : ''}>${esc(pn(t, id))}</option>`;
  let body = '';
  if (P.mode === 'manual') {
    body = `<select data-tf="pwinner"><option value="0">${L.paintNone}</option>${t.players.map(p => opt(p.id, P.winner)).join('')}</select>`;
  } else {
    const n = Object.keys(P.ballots).filter(id => t.players.some(p => p.id === +id)).length;
    body = `<div class="mut" style="margin-bottom:8px">${L.ballotHint}</div><div style="margin-bottom:10px"><b>${L.voted(n, t.players.length)}</b></div>`;
    if (P.status === 'open') {
      const others = t.players.filter(p => p.id !== paintVoter);
      body += `<select data-tf="pvoter" style="margin-bottom:8px"><option value="0">${L.voter}…</option>${t.players.map(p => `<option value="${p.id}" ${p.id === paintVoter ? 'selected' : ''}>${P.ballots[p.id] ? '✓ ' : ''}${esc(p.name || '#' + p.id)}</option>`).join('')}</select>
        ${paintVoter ? L.pick.map((lbl, i) => `<div class="mut" style="margin:6px 0 2px">${lbl}</div><select data-tf="ppick" data-slot="${i}"><option value="0">–</option>${others.map(p => opt(p.id, paintPick[i])).join('')}</select>`).join('') : ''}
        <button class="on" data-ta="psubmit" style="width:100%;margin-top:10px" ${paintVoter ? '' : 'disabled'}>${L.submitBallot}</button>
        <button data-ta="pstatus" data-tv="closed" style="width:100%;margin-top:8px">${L.closeVote}</button>`;
    } else if (P.status === 'closed') {
      body += `<button data-ta="pstatus" data-tv="open" style="width:100%">${L.reopenVote}</button>`;
    } else body += `<button class="on" data-ta="pstatus" data-tv="open" style="width:100%">${L.openVote}</button>`;
  }
  return `<div class="card"><h2>🎨 ${L.paintTitle}</h2>
    <div class="row" style="margin-bottom:12px">${['ballot', 'manual'].map(m => `<button data-ta="pmode" data-tv="${m}" class="${P.mode === m ? 'on' : ''}">${L.paintMode[m]}</button>`).join('')}</div>${body}</div>
    ${paintCard(t, paintResult(t))}<button data-ta="ppoff" style="width:100%">${L.paintDisable}</button>`;
}

function archiveCard() {
  const L = tt();
  return `<div class="card"><h2>🗄 ${L.archiveTitle}</h2>${TD.archive.length ? TD.archive.map((a, i) => `<div class="prow"><div><b>${esc(a.name || L.tabs.home[1])}</b>
    <div class="mut">${a.archivedAt ? new Date(a.archivedAt).toLocaleDateString(S.lang) + ' · ' : ''}${L.playersN(a.players.length)} · ${a.rds.length} / ${a.rounds} ${L.rounds}</div></div>
    <div class="row"><button data-ta="restore" data-tv="${i}">${L.restore}</button><button data-ta="adel" data-tv="${i}">${L.del}</button></div></div>`).join('') : `<div class="mut">${L.archiveNone}</div>`}</div>`;
}

// ---------- views ----------
const pn = (t, id) => { const p = t.players.find(x => x.id === id); return p ? p.name || ('#' + id) : '?'; };
const pl = (t, id) => t.players.find(x => x.id === id) || {name: '?', army: '', list: ''};
const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : '';
const curRound = t => tRound !== null && tRound < t.rds.length ? tRound : t.rds.length - 1;

function tournNav() {
  const t = tt();
  let subs = [];
  if (tRole === 'org' && TD.cur) subs = ['players', 'round', 'standings', 'paint', 'share', 'settings'];
  else if (tRole === 'view' && FV) subs = ['me', 'standings'];
  else subs = ['home'];
  const cur = tSub[tRole] || subs[0];
  return subs.map(k => `<button data-ta="sub" data-tv="${k}" class="${k === cur || subs.length === 1 ? 'on' : ''}"><span>${t.tabs[k][0]}</span>${t.tabs[k][1]}</button>`).join('');
}

function roleSwitch() {
  if (!(TD.cur && FV)) return '';
  const t = tt();
  return `<div class="chips" style="margin-bottom:12px">${['org', 'view'].map(r => `<button data-ta="role" data-tv="${r}" class="${tRole === r ? 'on' : ''}">${t.role[r]}</button>`).join('')}</div>`;
}

function tournView() {
  const t = tt();
  if (tRole === 'org' && !TD.cur) tRole = FV ? 'view' : 'none';
  if (tRole === 'view' && !FV) tRole = TD.cur ? 'org' : 'none';
  if (tRole === 'none') return viewTournHome();
  return roleSwitch() + (tRole === 'org' ? viewOrg() : viewFollow());
}

function viewTournHome() {
  const t = tt(), T0 = T();
  return `<div class="card"><h2>🏆 ${t.tabs.home[1]}</h2><div class="mut">${t.intro}</div></div>
    <div class="card"><h2>🗂 ${t.orgCard}</h2><div class="mut" style="margin-bottom:10px">${t.orgDesc}</div>
      <input data-tf="newname" value="${esc(tNewName)}" placeholder="${t.tname}" style="margin-bottom:10px">
      <div class="row" style="margin-bottom:10px">${['fire', 'tourn'].map(k => `<button data-ta="newmission" data-tv="${k}" class="${tNewMission === k ? 'on' : ''}">${k === 'fire' ? T0.scenFire : T0.scenTourn}</button>`).join('')}</div>
      <div class="setrow"><span>${t.tables}</span>${stepper('newtables', 'n', 0, tNewTables || t.auto)}</div>
      <button class="on" data-ta="create" style="width:100%">${t.create}</button></div>
    <div class="card"><h2>📡 ${t.followCard}</h2><div class="mut">${t.followDesc}</div></div>${archiveCard()}`;
}

function viewOrg() {
  const t = TD.cur, L = tt();
  const head = `<div class="card"><h2>🏆 ${esc(t.name || L.tabs.home[1])}</h2><div class="mut">${t.rds.length} / ${t.rounds} ${L.rounds} · ${L.activeCount(t.players.filter(p => p.active).length)}</div></div>`;
  const sub = tSub.org;
  return head + ({players: orgPlayers, round: orgRound, standings: () => standingsCard(t) + paintCard(t, paintResult(t)), paint: orgPaint, share: orgShare, settings: orgSettings}[sub] || orgRound)(t, L);
}

function orgPlayers(t, L) {
  const played = id => t.rds.some(r => r.bye === id || r.matches.some(m => m.a === id || m.b === id));
  return `<div class="card"><div class="setrow" style="margin:0"><span><b>${L.tables}</b><br><small class="mut">${L.tablesNeed(Math.ceil(t.players.filter(p => p.active).length / 2))}</small></span>${stepper('step', 'tables', t.tables, t.tables || L.auto)}</div></div>
    <div class="card"><div class="mut" style="margin-bottom:10px">${L.playersHint}</div>
    ${t.players.map(p => `<div class="prow ${p.active ? '' : 'off'}">
      <input data-tf="pname" data-pid="${p.id}" value="${esc(p.name)}" placeholder="${L.pname}">
      <input data-tf="parmy" data-pid="${p.id}" value="${esc(p.army || '')}" placeholder="${L.army}">
      <input data-tf="plist" data-pid="${p.id}" value="${esc(p.list || '')}" placeholder="${L.list}" inputmode="url">
      <div class="row"><button data-ta="togp" data-tv="${p.id}">${p.active ? L.drop : L.activate}</button>${played(p.id) ? '' : `<button data-ta="delp" data-tv="${p.id}">✕</button>`}</div></div>`).join('')}
    <button data-ta="addp" style="width:100%;margin-top:8px">${L.addPlayer}</button></div>`;
}

function stepper(act, key, val, label) {
  return `<div class="stp"><button data-ta="${act}" data-tv="${key}:-1">−</button><b>${label}</b><button data-ta="${act}" data-tv="${key}:1">+</button></div>`;
}

function orgRound(t, L) {
  const active = t.players.filter(p => p.active).length;
  const short = t.tables && Math.floor(active / 2) > t.tables ? `<div class="banner" style="border-color:var(--gold)">${L.tablesShort(t.tables, Math.floor(active / 2))}</div>` : '';
  const ri = curRound(t), last = t.rds.length - 1;
  const chips = t.rds.length ? `<div class="chips" style="margin-bottom:12px">${t.rds.map((_, i) => `<button data-ta="rnd" data-tv="${i}" class="${i === ri ? 'on' : ''}">${L.roundL} ${i + 1}</button>`).join('')}</div>` : '';
  let body = '';
  if (ri >= 0) {
    const r = t.rds[ri], T0 = T();
    body = r.matches.map((m, mi) => {
      const [ta, tb] = matchTp(t.mission, m), f = matchFlags(t, ri, m), A = pl(t, m.a), B = pl(t, m.b), dis = m.done ? 'disabled' : '';
      const draw = m.gA === m.gB;
      return `<div class="card"><div class="mhead"><b>${L.table} ${m.table}</b><span class="warn">${f.rematch ? L.rematch + ' ' : ''}${f.tableRep ? L.tableRep : ''}</span></div>
        <div class="mpl"><div class="A">${esc(A.name)}<small>${esc(A.army || '')}</small></div><span class="mut">${L.vs}</span><div class="B">${esc(B.name)}<small>${esc(B.army || '')}</small></div></div>
        <div class="srow"><div class="stp"><button ${dis} data-ta="goal" data-tv="${mi}:A:-1">−</button><b class="A">${m.gA}</b><button ${dis} data-ta="goal" data-tv="${mi}:A:1">+</button></div>
          <span class="mut">${L.goals}</span>
          <div class="stp"><button ${dis} data-ta="goal" data-tv="${mi}:B:-1">−</button><b class="B">${m.gB}</b><button ${dis} data-ta="goal" data-tv="${mi}:B:1">+</button></div></div>
        ${t.mission === 'tourn' ? `<div class="row" style="margin:8px 0"><button ${dis} data-ta="m3" data-tv="${mi}:1" class="${m.t3 ? 'on' : ''}">${L.t3}</button><button ${dis} data-ta="m3" data-tv="${mi}:0" class="${!m.t3 ? 'on' : ''}">${L.t4}</button></div>
          ${draw ? `<div class="mut" style="margin:4px 0">${L.vps}</div><div class="row" style="margin-bottom:8px"><button ${dis} data-ta="mvps" data-tv="${mi}:" class="${!m.vps ? 'on' : ''}">${L.none}</button><button ${dis} data-ta="mvps" data-tv="${mi}:A" class="A ${m.vps === 'A' ? 'own' : ''}">${esc(A.name)}</button><button ${dis} data-ta="mvps" data-tv="${mi}:B" class="B ${m.vps === 'B' ? 'own' : ''}">${esc(B.name)}</button></div>` : ''}` : ''}
        <div class="tp">${T0.tpLabel} ${ta} – ${tb}</div>
        <button data-ta="mdone" data-tv="${mi}" class="${m.done ? '' : 'on'}" style="width:100%;margin-top:8px">${m.done ? L.edit : L.confirm}</button></div>`;
    }).join('');
    if (r.bye) body += `<div class="card"><b>${L.bye}:</b> ${esc(pn(t, r.bye))}<div class="mut">${L.byeTxt}</div></div>`;
  }
  const allDone = ri >= 0 && t.rds[ri].matches.every(m => m.done);
  const anyDone = ri >= 0 && t.rds[ri].matches.some(m => m.done);
  let action = '';
  if (ri === last || ri < 0) {
    if (t.rds.length >= t.rounds && allDone) action = `<div class="banner">${L.allDone}</div>`;
    else if (t.rds.length < t.rounds) action = `<button class="on" data-ta="pair" style="width:100%" ${active < 2 || (t.rds.length && !allDone) ? 'disabled' : ''}>${t.rds.length ? L.pairN(t.rds.length + 1) : L.pair1}</button>
      <div class="mut" style="margin-top:6px">${active < 2 ? L.needPlayers : t.rds.length && !allDone ? L.needResults : ''}</div>`;
    if (ri >= 0 && !anyDone) action += `<button data-ta="redo" style="width:100%;margin-top:8px">${L.redo}</button>`;
  }
  return short + chips + (ri < 0 ? `<div class="card mut">${L.noRounds}</div>` : '') + body + action + `<div class="mut" style="margin-top:12px">${L.pairNote}</div>`;
}

function standingsCard(t, hl) {
  const L = tt(), st = standings(t);
  return `<div class="card"><h2>🏆 ${L.tabs.standings[1]}</h2><table class="stand"><tr>${L.cols.map((c, i) => `<th ${i ? '' : 'style="text-align:left"'}>${c}</th>`).join('')}</tr>
    ${st.map(x => `<tr class="${x.p.id === hl ? 'me' : ''} ${x.p.active ? '' : 'off'}"><td>${x.rank}</td><td style="text-align:left">${esc(x.p.name || '#' + x.p.id)}<small>${esc(x.p.army || '')}</small></td><td>${x.tp}</td><td>${x.gd > 0 ? '+' : ''}${x.gd}</td></tr>`).join('')}</table>
    <div class="mut" style="margin-top:8px">${L.tieNote}</div></div>`;
}

function orgShare(t, L) {
  return `<div class="card"><h2>📲 ${L.shareTitle}</h2><div class="mut" style="margin-bottom:10px">${L.shareNote}</div>
    <div class="row" style="margin-bottom:12px"><button data-ta="slists" class="${shareLists ? 'on' : ''}">${L.incLists}</button></div>
    <div id="shareBox" class="mut" style="text-align:center">…</div></div>`;
}

function orgSettings(t, L) {
  const T0 = T();
  return `<div class="card"><h2>⚙ ${L.settingsTitle}</h2>
    <input data-tf="tname" value="${esc(t.name)}" placeholder="${L.tname}" style="margin-bottom:10px">
    <div class="row" style="margin-bottom:10px">${['fire', 'tourn'].map(k => `<button data-ta="mission" data-tv="${k}" class="${t.mission === k ? 'on' : ''}">${k === 'fire' ? T0.scenFire : T0.scenTourn}</button>`).join('')}</div>
    <div class="setrow"><span>${L.rounds}</span>${stepper('step', 'rounds', t.rounds, t.rounds)}</div></div>
    <button data-ta="finish" style="width:100%">${L.finish}</button>${archiveCard()}`;
}

function viewFollow() {
  const t = FV.snap, L = tt(), sub = tSub.view;
  const when = t.upd ? new Date(t.upd).toLocaleString(S.lang) : '';
  const foot = `<div class="mut" style="margin-top:6px">${L.updated}: ${when}<br>${L.followHint}</div>
    <button data-ta="unfollow" style="width:100%;margin-top:10px">${L.unfollow}</button>`;
  const head = `<div class="card"><h2>🏆 ${esc(t.name || L.tabs.home[1])}</h2><div class="mut">${t.rds.length} / ${t.rounds} ${L.rounds}</div></div>`;
  if (sub === 'standings') return head + standingsCard(t, FV.me) + paintCard(t, paintRes(t)) + foot;
  const select = `<div class="card"><h2>🙋 ${L.whoAmI}</h2><select data-tf="me">
    <option value="">${L.choose}</option>${t.players.map(p => `<option value="${p.id}" ${p.id === FV.me ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>`;
  if (!FV.me) return head + select + foot;
  const me = standings(t).find(x => x.p.id === FV.me);
  if (!me) return head + select + foot;
  const ri = t.rds.length - 1, r = t.rds[ri];
  let next = `<div class="card mut">${L.notPaired}</div>`;
  if (r) {
    const m = r.matches.find(x => x.a === FV.me || x.b === FV.me);
    if (m) {
      const oppId = m.a === FV.me ? m.b : m.a, o = pl(t, oppId), url = safeUrl(o.list);
      const [ta, tb] = matchTp(t.mission, m), mine = m.a === FV.me ? ta : tb, theirs = m.a === FV.me ? tb : ta;
      const g1 = m.a === FV.me ? m.gA : m.gB, g2 = m.a === FV.me ? m.gB : m.gA;
      next = `<div class="card"><h2>⚔ ${L.next} · ${L.roundL} ${ri + 1}</h2>
        <div class="bigtable">${L.table} ${m.table}</div>
        <div style="text-align:center;font-size:20px;font-weight:700;margin:6px 0">${L.vs} ${esc(o.name)}</div>
        ${o.army ? `<div class="mut" style="text-align:center">${L.armyL}: ${esc(o.army)}</div>` : ''}
        ${url ? `<a class="btnlink" href="${esc(url)}" target="_blank" rel="noopener">${L.openList}</a>` : ''}
        ${m.done ? `<div class="tp" style="margin-top:10px">${L.result}: ${g1} : ${g2} · ${T().tpLabel} ${mine} – ${theirs}</div>` : `<button class="on" data-ta="play" data-tv="${m.a}:${m.b}" style="width:100%;margin-top:10px">${L.playBtn}</button>`}</div>`;
    } else if (r.bye === FV.me) next = `<div class="card"><h2>⚔ ${L.next} · ${L.roundL} ${ri + 1}</h2><div>${L.hasBye}</div></div>`;
  }
  const pairs = r ? `<div class="card"><h2>🎲 ${L.allPair} · ${L.roundL} ${ri + 1}</h2><div class="mut" style="margin-bottom:6px">${L.playHint}</div>${r.matches.slice().sort((a, b) => a.table - b.table).map(m =>
    `<button data-ta="play" data-tv="${m.a}:${m.b}" class="pairbtn ${m.a === FV.me || m.b === FV.me ? 'on' : ''}"><span>${L.table} ${m.table}</span><b class="${m.a === FV.me || m.b === FV.me ? '' : 'A'}">${esc(pn(t, m.a))}</b><span>${m.done ? m.gA + ':' + m.gB : L.vs}</span><b class="${m.a === FV.me || m.b === FV.me ? '' : 'B'}">${esc(pn(t, m.b))}</b></button>`).join('')}
    ${r.bye ? `<div class="mut" style="margin-top:6px">${L.bye}: ${esc(pn(t, r.bye))}</div>` : ''}</div>` : '';
  const status = `<div class="card"><div class="score" style="font-size:34px"><span>#${me.rank}</span></div>
    <div class="tp">${me.tp} TP · ${L.cols[3]} ${me.gd > 0 ? '+' : ''}${me.gd}</div></div>`;
  return head + select + status + next + pairs + foot;
}

// called from render() after #app is filled
function tournAfter() {
  if (tRole === 'org' && TD.cur && tSub.org === 'share') fillShare();
  if (window.__tFocus) { const el = document.querySelector(window.__tFocus); window.__tFocus = null; if (el) el.focus(); }
}

// ---------- events ----------
function tournClick(b) {
  const a = b.dataset.ta; if (!a) return false;
  const v = b.dataset.tv, t = TD.cur, L = tt();
  const done = (touchIt = true) => { if (touchIt) touch(); render(); return true; };
  switch (a) {
    case 'sub': tSub[tRole] = v; if (v === 'round') tRound = null; render(); scrollTo(0, 0); return true;
    case 'role': tRole = v; render(); return true;
    case 'newmission': tNewMission = v; render(); return true;
    case 'newtables': tNewTables = Math.max(0, Math.min(99, tNewTables + +v.split(':')[1])); render(); return true;
    case 'restore': {
      const a = TD.archive[+v]; if (!a) return true;
      if (TD.cur && !confirm(L.confirmRestore)) return true;
      TD.archive.splice(+v, 1);
      if (TD.cur) TD.archive.push(Object.assign(TD.cur, {archivedAt: Date.now()}));
      TD.cur = a; delete a.archivedAt; tRole = 'org'; tSub.org = 'round'; tRound = null; touch(); render(); scrollTo(0, 0); return true;
    }
    case 'adel': if (!confirm(L.confirmDel)) return true; TD.archive.splice(+v, 1); saveTourn(); render(); return true;
    case 'create': {
      TD.cur = {id: Date.now().toString(36), name: tNewName.trim(), mission: tNewMission, rounds: 3, tables: tNewTables, players: [], rds: [], nid: 1, upd: Date.now()};
      tNewName = '';
      tRole = 'org'; tSub.org = 'players'; saveTourn(); render(); return true;
    }
    case 'play': {
      if (!FV) return true;
      const [a, b] = v.split(':').map(Number), snap = FV.snap;
      const busy = S.warmDone.length || S.setupDone.length || S.turnDone.length || Object.keys(S.pts).length || S.round > 1;
      if (busy && !confirm(L.confirmPlay)) return true;
      const prevLang = S.lang;
      S = fresh(); S.lang = prevLang; S.tournGame = true; S.scenario = snap.mission;
      S.names = {A: pn(snap, a), B: pn(snap, b)};
      tab = 'setup'; persist(); render(); scrollTo(0, 0); return true;
    }
    case 'unfollow': if (!confirm(L.confirmUnf)) return true; FV = null; saveView(); tRole = TD.cur ? 'org' : 'none'; render(); return true;
    case 'copy': navigator.clipboard && navigator.clipboard.writeText(shareUrlNow).then(() => toast(L.copied)); return true;
    case 'nshare': navigator.share({title: t.name || 'Epic Guide', url: shareUrlNow}).catch(() => {}); return true;
  }
  if (!t) return true;
  switch (a) {
    case 'addp': t.players.push({id: t.nid++, name: '', army: '', list: '', active: true}); window.__tFocus = `[data-pid="${t.nid - 1}"][data-tf="pname"]`; return done();
    case 'togp': { const p = pl(t, +v); p.active = !p.active; return done(); }
    case 'delp': t.players = t.players.filter(p => p.id !== +v); return done();
    case 'pair': {
      const rd = t.rds[t.rds.length - 1];
      if (t.players.filter(p => p.active).length < 2 || t.rds.length >= t.rounds || (rd && !rd.matches.every(m => m.done))) return true;
      makeRound(t); tRound = null; return done();
    }
    case 'redo': if (!confirm(L.confirmRedo)) return true; t.rds.pop(); makeRound(t); tRound = null; return done();
    case 'rnd': tRound = +v; render(); return true;
    case 'goal': { const [mi, s, d] = v.split(':'), m = t.rds[curRound(t)].matches[+mi], k = s === 'A' ? 'gA' : 'gB'; m[k] = Math.max(0, Math.min(99, m[k] + +d)); return done(); }
    case 'm3': { const [mi, x] = v.split(':'); t.rds[curRound(t)].matches[+mi].t3 = x === '1'; return done(); }
    case 'mvps': { const [mi, x] = v.split(':'); t.rds[curRound(t)].matches[+mi].vps = x; return done(); }
    case 'mdone': { const m = t.rds[curRound(t)].matches[+v]; m.done = !m.done; return done(); }
    case 'mission': t.mission = v; return done();
    case 'step': {
      const [k, d] = v.split(':');
      if (k === 'rounds') t.rounds = Math.max(Math.max(1, t.rds.length), Math.min(20, t.rounds + +d));
      else t.tables = Math.max(0, Math.min(99, (t.tables || 0) + +d));
      return done();
    }
    case 'slists': shareLists = !shareLists; render(); return true;
    case 'ppon': paintOf(t).on = true; return done();
    case 'ppoff': paintOf(t).on = false; return done();
    case 'pmode': paintOf(t).mode = v; return done();
    case 'pstatus': paintOf(t).status = v; paintVoter = 0; paintPick = [0, 0, 0]; return done();
    case 'psubmit': {
      const P = paintOf(t), ok = paintVoter && paintPick.every(x => x && x !== paintVoter) && new Set(paintPick).size === 3;
      if (!ok) { toast(L.ballotBad); return true; }
      P.ballots[paintVoter] = paintPick.slice(); paintVoter = 0; paintPick = [0, 0, 0]; toast(L.ballotSaved); return done();
    }
    case 'finish': if (!confirm(L.confirmFinish)) return true; t.archivedAt = Date.now(); TD.archive.push(t); TD.cur = null; tRole = FV ? 'view' : 'none'; saveTourn(); render(); return true;
  }
  return true;
}

// text inputs and selects: save without re-rendering so focus and clicks are not lost
function tournInput(e) {
  const el = e.target, f = el.dataset && el.dataset.tf; if (!f) return false;
  const t = TD.cur;
  if (f === 'me') { FV.me = el.value ? +el.value : null; saveView(); render(); return true; }
  if (f === 'newname') { tNewName = el.value; return true; }
  if (!t) return true;
  if (f === 'pvoter') { paintVoter = +el.value; paintPick = (paintOf(t).ballots[paintVoter] || [0, 0, 0]).slice(); render(); return true; }
  if (f === 'ppick') { paintPick[+el.dataset.slot] = +el.value; render(); return true; }
  if (f === 'pwinner') { paintOf(t).winner = +el.value; touch(); render(); return true; }
  if (f === 'tname') t.name = el.value;
  else {
    const p = t.players.find(x => x.id === +el.dataset.pid); if (!p) return true;
    if (f === 'pname') p.name = el.value; else if (f === 'parmy') p.army = el.value; else if (f === 'plist') p.list = el.value.trim();
  }
  touch();
  return true;
}

importHash();
