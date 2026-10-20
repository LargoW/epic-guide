// Reference view: rules summaries and balanced terrain layouts (DE/EN). Opened from the header, not part of the game flow.
let refSec = 'goals', refLay = 0, refGrid = true, refScen = null;

const D = (de, en) => ({de, en});
const tx = o => (typeof o === 'string' ? o : o[S.lang]);

const REF_SECS = {
  goals: ['🏁', D('Ziele', 'Goals')],
  terrain: ['⛰', D('Gelände', 'Terrain')],
  barrage: ['💥', D('Sperrfeuer Tabelle', 'Barrage Table')],
  combat: ['⚔', D('Kampf', 'Combat')],
  layouts: ['🧭', D('Layouts', 'Layouts')],
};

const REF = {
  goalsTourn: [
    {h: D('Turnierszenario', 'Tournament scenario')},
    {p: D('Geprüft am Ende von Runde 3 und 4. Wer mindestens 2 der 5 Siegesbedingungen erfüllt und mehr als der Gegner, gewinnt. Beide Spieler können dieselbe Bedingung gleichzeitig erfüllen.',
          'Checked at the end of rounds 3 and 4. You win by achieving at least 2 of the 5 conditions and more than your opponent. Both players can meet the same condition at the same time.')},
    {table: {head: [D('Bedingung', 'Condition'), D('Beschreibung', 'Description')], rows: [
      [D('Blitzkrieg', 'Blitzkrieg'), D('Das Ziel an der gegnerischen Tischkante erobern und halten.', 'Capture and hold the objective on the enemy table edge.')],
      [D('Brecht Ihren Willen', 'Break Their Spirit'), D('Den Verband mit dem höchsten Punktwert des Gegners vernichten (aufgerieben zählt nicht).', 'Destroy the enemy formation with the highest points value (broken does not count).')],
      [D('Verteidigt Die Flagge', 'Defend The Flag'), D('Alle 3 Ziele in der eigenen Hälfte kontrollieren.', 'Control all 3 objectives in your own half.')],
      [D('Sichern Und Halten', 'Take And Hold'), D('2 Ziele in der gegnerischen Hälfte kontrollieren.', 'Control 2 objectives in the enemy half.')],
      [D('Sie Können Nicht Vorbei', 'They Shall Not Pass'), D('Keine ungebrochenen gegnerischen Verbände in der eigenen Hälfte.', 'No unbroken enemy formations in your half.')],
    ]}},
    {p: D('Gleichstand: Beide würfeln einen W6. Gleich ⇒ eine weitere Runde; ungleich ⇒ Spielende, Siegpunkte (Armeewert) entscheiden.',
          'Tie: both roll a D6. Equal ⇒ another round; unequal ⇒ the game ends and victory points (army value) decide.')},
    {h: D('Ziele (Marker)', 'Objectives (markers)')},
    {ul: [
      D('6 Ziele, abwechselnd platziert; der Spieler mit dem höheren Strategiewert beginnt.', '6 objectives, placed alternately; the player with the higher Strategy rating starts.'),
      D('Je Spieler: das erste Ziel liegt an der eigenen Tischkante (Blitz-Ziel).', 'Per player: the first objective is on their own table edge (Blitz objective).'),
      D('Die anderen 2 liegen in der eigenen Hälfte, ≥ 30 cm von der Kante und ≥ 30 cm von anderen Zielen.', 'The other 2 go in their own half, ≥ 30 cm from the edge and ≥ 30 cm from other objectives.'),
      D('Gehalten: eigene Einheit ≤ 15 cm und keine gegnerische. Umkämpft: beide Seiten ≤ 15 cm. Aufgeriebene oder soeben gesammelte Verbände können nicht erobern.', 'Held: own unit within 15 cm and no enemy. Contested: both sides within 15 cm. Broken or just-rallied formations cannot capture.'),
    ]},
  ],

  goalsFire: [
    {h: D('Zündet die Leuchtfeuer', 'Fire the Beacons')},
    {p: D('3 Runden. Siegesbedingungen werden nach jeder Runde (ab Runde 1) und VOR dem Sammeln geprüft. Beide Spieler können jede Bedingung gleichzeitig erfüllen; die Punkte werden über alle Runden addiert.',
          '3 rounds. Victory conditions are checked after every round (from round 1) and BEFORE rallying. Both players can meet every condition at the same time; points add up over all rounds.')},
    {table: {head: [D('Bedingung', 'Condition'), D('Punkte', 'Points'), D('Beschreibung', 'Description')], rows: [
      [D('Blitzkrieg', 'Blitzkrieg'), D('1 / Runde', '1 / round'), D('Das Ziel an der gegnerischen Tischkante besitzen.', 'Own the objective on the enemy table edge.')],
      [D('Brecht Ihren Willen', 'Break Their Spirit'), D('2, einmalig', '2, once only'), D('Den Verband mit dem höchsten Punktwert des Gegners vernichten (aufgerieben zählt nicht). Pro Spieler nur einmal im Spiel.', 'Destroy the enemy formation with the highest points value (broken does not count). Once per player per game.')],
      [D('Verteidigt Die Flagge', 'Defend The Flag'), D('1 / Runde', '1 / round'), D('Alle 3 Ziele in der eigenen Hälfte besitzen und nicht umkämpft haben.', 'Own all 3 objectives in your own half, with none contested.')],
      [D('Sichern Und Halten', 'Take And Hold'), D('1 / Runde', '1 / round'), D('2 Ziele in der gegnerischen Hälfte besitzen.', 'Own 2 objectives in the enemy half.')],
      [D('Sie Können Nicht Vorbei', 'They Shall Not Pass'), D('1 / Runde', '1 / round'), D('Keine ungebrochenen gegnerischen Verbände in der eigenen Hälfte.', 'No unbroken enemy formations in your half.')],
    ]}},
    {h: D('Besitz der Ziele', 'Objective ownership')},
    {ul: [
      D('6 Ziele mit zweiseitigen Markern: Jedes gehört anfangs dem Spieler seiner Hälfte und behält den Besitzer, auch wenn Einheiten abziehen.', '6 objectives with two-sided markers: each starts with the owner of its half and keeps its owner even after units leave.'),
      D('Nach jeder Aktion wechselt ein Ziel den Besitzer, wenn nur eine ungebrochene gegnerische Einheit ≤ 15 cm steht (gesammelte Einheiten zählen).', 'After every action an objective flips if only an unbroken enemy unit is within 15 cm (rallied units count).'),
      D('Umkämpfen: Ein ungebrochener Gegner ≤ 15 cm verhindert „Verteidigt Die Flagge“, auch wenn das Ziel dir gehört.', 'Contesting: an unbroken enemy within 15 cm prevents Defend The Flag even if you own the objective.'),
      D('Eigene Einheiten müssen nicht ≤ 15 cm stehen, um Punkte zu erhalten.', 'Your own units need not be within 15 cm to score.'),
      D('Platzierung: Blitz-Ziel ≥ 15 cm von jeder Ecke; die anderen ≥ 15 cm von jeder Kante; nie in unpassierbarem Gelände.', 'Placement: Blitz objective ≥ 15 cm from every corner; the others ≥ 15 cm from every edge; never in impassable terrain.'),
    ]},
    {h: D('Sieg & Sonderfälle', 'Winning & special cases')},
    {ul: [
      D('Sieger ist, wer nach Runde 3 mehr Punkte hat; die Differenz bestimmt die Turnierpunkte.', 'The winner has more points after round 3; the difference sets the tournament points.'),
      D('Vorsprung ≥ 8 SP nach Runde 2 beendet das Spiel vorzeitig.', 'A lead of ≥ 8 VP after round 2 ends the game early.'),
      D('Gelandete Flieger können in ihrer Landerunde weder erobern noch umkämpfen noch „Sie Können Nicht Vorbei“ verhindern.', 'Landed aircraft cannot capture, contest or stop They Shall Not Pass in the round they land.'),
    ]},
  ],

  terrain: [
    {h: D('Sicht & Deckung', 'Line of sight & cover')},
    {ul: [
      D('Empfehlung: Gelände gilt als „unendlich hoch“ – auch Kriegsmaschinen blockieren Sichtlinien.', 'Recommended: all terrain counts as “infinitely tall” – war engines block lines of sight too.'),
      D('Keine Bodeneinheit sieht durch ein Geländestück, außer sie steht darin. Aufgetauchte Antigravfahrzeuge und Einheiten auf Hügeln sehen darüber, aber nur Einheiten, die weiter vom Rand entfernt sind als sie selbst. Flugzeuge sehen immer über alles.', 'No ground unit sees through a terrain piece unless it is inside. Skimmers and units on hills see over it, but only units farther from the edge than themselves. Aircraft always see over everything.'),
      D('In Deckung: Sicht-blockierendes Gelände schützt Einheiten darin oder teilweise dahinter vor dem ganzen schießenden Verband: −1 auf den Trefferwurf und ein Deckungswurf (statt, nicht zusätzlich zum Rüstungswurf).', 'In cover: line-blocking terrain shields units in or partly behind it from the whole firing formation: −1 to hit and a cover save (instead of, not in addition to, the armour save).'),
    ]},
    {table: {head: [D('Gelände', 'Terrain'), 'INF', 'AV', D('Kriegsm.', 'WE'), D('Blockt', 'Blocks LOS')], rows: [
      [D('Großes Gebäude', 'Large building'), D('Deckung 4+', 'Cover 4+'), D('Unpassierbar', 'Impassable'), D('Unpassierbar', 'Impassable'), D('Ja', 'Yes')],
      [D('Stadtgebiet', 'Urban area'), D('Deckung 5+', 'Cover 5+'), D('Schwierig', 'Difficult'), D('Schwierig', 'Difficult'), D('Ja', 'Yes')],
      [D('Ruinen, Trümmer', 'Ruins, rubble'), D('Deckung 4+', 'Cover 4+'), D('Gefährlich', 'Dangerous'), D('Gefährlich', 'Dangerous'), D('Ja', 'Yes')],
      [D('Krater', 'Crater'), D('Deckung 4+', 'Cover 4+'), D('Gefährlich', 'Dangerous'), D('Gefährlich', 'Dangerous'), D('Nein', 'No')],
      [D('Dschungel', 'Jungle'), D('Deckung 4+, schwierig', 'Cover 4+, difficult'), D('Gefährlich', 'Dangerous'), D('Gefährlich', 'Dangerous'), D('Ja', 'Yes')],
      [D('Wälder', 'Woods'), D('Deckung 5+', 'Cover 5+'), D('Gefährlich', 'Dangerous'), D('Gefährlich', 'Dangerous'), D('Ja', 'Yes')],
      [D('Sumpf', 'Swamp'), D('Deckung 5+', 'Cover 5+'), D('Gefährlich', 'Dangerous'), D('Gefährlich', 'Dangerous'), D('Nein', 'No')],
      [D('Gestrüpp', 'Brush'), D('Deckung 6+', 'Cover 6+'), D('Schwierig', 'Difficult'), D('Schwierig', 'Difficult'), D('Ja', 'Yes')],
      [D('Feld', 'Field'), D('Deckung 6+', 'Cover 6+'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Nein', 'No')],
      [D('Bach, seichter Fluss', 'Stream, shallow river'), D('Deckung 6+, schwierig', 'Cover 6+, difficult'), D('Schwierig', 'Difficult'), D('Kein Effekt', 'No effect'), D('Nein', 'No')],
      [D('Offenes Gelände', 'Open ground'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Nein', 'No')],
      [D('Straße', 'Road'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Nein', 'No')],
      [D('Hügel', 'Hill'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Kein Effekt', 'No effect'), D('Ja', 'Yes')],
      [D('Gebirge', 'Mountains'), D('Unpassierbar', 'Impassable'), D('Unpassierbar', 'Impassable'), D('Unpassierbar', 'Impassable'), D('Ja', 'Yes')],
      [D('See / Lavafeld', 'Lake / lava field'), D('Unpassierbar', 'Impassable'), D('Unpassierbar', 'Impassable'), D('Unpassierbar', 'Impassable'), D('Nein', 'No')],
    ]}},
    {h: D('Sonderregeln', 'Special rules')},
    {ul: [
      D('Gefährlich: W6 beim Betreten/Bewegungsbeginn; bei 1 wird die Einheit zerstört (kein Schutzwurf, keine Beschussmarke). Vorsichtig bewegen: Geschwindigkeit 5 cm, mit Wiederholungswürfen.', 'Dangerous: roll a D6 on entering/starting a move; on a 1 the unit is destroyed (no save, no blast marker). Cautious move: speed 5 cm with re-rolls.'),
      D('Schwierig: W6 beim Betreten/Bewegungsbeginn; bei 1 ein zweiter W6; bei 1–3 ein Treffer ohne Schutzwurf (keine Beschussmarke). Vorsichtig: Geschwindigkeit 5 cm ohne Test. „Geländegängig“ ignoriert es.', 'Difficult: roll a D6 on entering/starting a move; on a 1 roll again; on 1–3 the unit takes one hit with no save (no blast marker). Cautious: speed 5 cm without a test. “Walker/terrain-capable” units ignore it.'),
      D('Offenes Gelände: Infanterie in Feuerbereitschaft gilt als in Deckung und hat einen Deckungswurf 5+ (verfällt nach dem Schuss). Empfehlung: für alle Geländetypen anwenden.', 'Open ground: infantry on Overwatch count as in cover with a 5+ cover save (lost after firing). Recommended: apply this to all terrain types.'),
      D('Hügel: Einheiten darauf sehen wie aufgetauchte Antigravfahrzeuge. Steile Seiten können für alle unpassierbar sein – im Warm-up klären.', 'Hills: units on them see like skimmers. Steep sides may be impassable to all – agree in the warm-up.'),
      D('Straße: +5 cm Bewegung, wenn die ganze Bewegung auf der Straße liegt (nicht bei Sonderbewegungen). Straßenbewegung (alle Einheiten starten auf der Straße; Vorrücken/Doppelt/Marsch): +1 auf den Initiativwurf, alle müssen auf der Straße bleiben.', 'Road: +5 cm movement if the whole move is on the road (not special moves). Road move (all units start on the road; Advance/Double/March): +1 to the action test, all units must stay on the road.'),
      D('Eigene gepanzerte Fahrzeuge/Kriegsmaschinen berührend: Infanterie gilt als in Deckung (−1, kein Deckungswurf). Max. 2 Einheiten je AV, 4 je H-AV, 2 je Kriegsmaschinen-DC.', 'Touching own armoured vehicles/war engines: infantry count as in cover (−1, no save). Max 2 units per AV, 4 per H-AV, 2 per war-engine DC.'),
      D('Befestigungen: Kreuzfeuer-Malus −1 auf Schutzwürfe entfällt, die zusätzliche Marke bleibt.', 'Fortifications: ignore the −1 save penalty from crossfire; the extra marker still applies.'),
    ]},
  ],

  barrage: [
    {h: D('Sperrfeuer-Tabelle', 'Barrage points table')},
    {p: D('Sperrfeuerpunkte (BP) addieren; Schablone 7,4 cm, Orbitalschablone 12 cm. Zusätzliche Schablonen müssen die erste berühren und dürfen sich nicht überlappen.',
          'Add up barrage points (BP). Barrage template 7.4 cm, orbital template 12 cm. Extra templates must touch the first one and must not overlap.')},
    {table: {head: ['BP', D('Zus. Schablonen', 'Extra templates'), D('Zus. Marken', 'Extra blast'), 'AP', 'AT'], rows: [
      ['1', D('keine', 'none'), D('keine', 'none'), '6+', '6+'],
      ['2', D('keine', 'none'), D('keine', 'none'), '5+', '6+'],
      ['3', D('keine', 'none'), D('keine', 'none'), '4+', '5+'],
      ['4–5', D('eine', 'one'), D('keine', 'none'), '4+', '5+'],
      ['6–7', D('eine', 'one'), D('eine', 'one'), '4+', '5+'],
      ['8–9', D('zwei', 'two'), D('eine', 'one'), '4+', '5+'],
      ['10–12', D('zwei', 'two'), D('zwei', 'two'), '4+', '5+'],
      ['13–15', D('zwei', 'two'), D('drei', 'three'), '4+', '5+'],
      ['16–18', D('zwei', 'two'), D('vier', 'four'), '4+', '5+'],
    ]}},
  ],

  combat: [
    {h: D('Rundenablauf', 'Round sequence')},
    {ul: [
      D('Strategiephase: W6 + Strategiewert; der Höhere wählt, wer zuerst aktiviert (Gleichstand: der letzte Verlierer).', 'Strategy phase: D6 + Strategy rating; the higher total chooses who activates first (tie: last round’s loser).'),
      D('Aktionsphase: abwechselnd Verbände aktivieren.', 'Action phase: alternate activating formations.'),
      D('Endphase: sammeln, dann Siegesbedingungen prüfen.', 'End phase: rally, then check victory conditions.'),
    ]},
    {h: D('Aktionen', 'Actions')},
    {table: {head: [D('Aktion', 'Action'), D('Ablauf', 'Effect')], rows: [
      [D('Vorrücken', 'Advance'), D('1× bewegen, dann schießen', 'Move once, then shoot')],
      [D('Offensive', 'Engage'), D('1× bewegen, dann Nahkampf', 'Move once, then assault')],
      [D('Eilschritt', 'Double'), D('2× bewegen, dann schießen (−1)', 'Move twice, then shoot (−1)')],
      [D('Marsch', 'March'), D('3× bewegen', 'Move three times')],
      [D('Ordnen', 'Marshal'), D('Schießen (−1) ODER 1× bewegen, dann sammeln', 'Shoot (−1) OR move once, then rally')],
      [D('Feuerbereitschaft', 'Overwatch'), D('Nicht möglich, wenn Feind ≤ 15 cm oder Einheit außerhalb des Verbands. Schuss nach Feindbewegung/Ausladen.', 'Not possible if an enemy is within 15 cm or a unit is out of formation. Shoot after an enemy move/unload.')],
      [D('Dauerfeuer', 'Sustained fire'), D('Nicht bewegen, schießen mit +1', 'No move, shoot at +1')],
      [D('Halten', 'Hold'), D('Fehlgeschlagene Aktivierung: 1× bewegen, schießen oder sammeln', 'Failed activation: move once, shoot or rally')],
    ]}},
    {p: D('Aktionstest: Wurf ≥ Initiative. −1 mit Beschussmarken im Verband, −1 zusätzlich beim Behalten der Initiative.', 'Action test: roll ≥ Initiative. −1 if the formation has blast markers, a further −1 when retaining initiative.')},
    {h: D('Beschuss', 'Shooting')},
    {ul: [
      D('Trefferwurf-Modifikatoren: Ziel in Deckung −1; Eilschritt/Ordnen −1; Dauerfeuer +1. Eine natürliche 1 trifft nie.', 'Hit modifiers: target in cover −1; Double/Marshal −1; Sustained fire +1. A natural 1 always misses.'),
      D('Bei „7+“: erst 6 würfeln, dann 4+ ⇒ 7, 5+ ⇒ 8, 6 ⇒ 9; 10 ist unmöglich.', 'For “7+”: roll a 6, then 4+ ⇒ 7, 5+ ⇒ 8, 6 ⇒ 9; 10 is impossible.'),
      D('Treffer werden von vorne zugewiesen. Rüstungswurf: Wurf ≥ Rüstung.', 'Hits are assigned from the front. Armour save: roll ≥ Arm.'),
      D('Beschussmarken: +1 fürs Beschossenwerden, +1 je Verlust. Aufgerieben, wenn Marken ≥ Einheiten. Jede Marke unterdrückt eine Einheit (von hinten).', 'Blast markers: +1 for being shot at, +1 per casualty. Broken when markers ≥ units. Each marker suppresses one unit (from the back).'),
      D('Kreuzfeuer: Linie ≤ 45 cm zu einem eigenen Verband, der das Ziel kreuzt: −1 auf Schutzwürfe und 2 Marken für den ersten Verlust (dicke Heckpanzerung ignoriert das −1).', 'Crossfire: line ≤ 45 cm to a friendly formation crossing the target: −1 to saves and 2 markers for the first casualty (thick rear armour ignores the −1).'),
    ]},
    {h: D('Nahkampf', 'Assault')},
    {ol: [
      D('Ziel wählen', 'Choose target'),
      D('Angriffsbewegung (mind. 1 Einheit endet ≤ 15 cm)', 'Charge move (at least 1 unit ends within 15 cm)'),
      D('Gegenangriff: Geschw. ≥ 30 cm ⇒ 10 cm, sonst 5 cm', 'Counter-charge: speed ≥ 30 cm ⇒ 10 cm, otherwise 5 cm'),
      D('Kämpfe auflösen: Basekontakt = CC, ≤ 15 cm mit Sicht = FF; keine Modifikatoren; angreifende Infanterie ohne Deckungswurf. Feuerunterstützung: andere Verbände ≤ 15 cm mit Sicht.', 'Resolve: base contact = CC, ≤ 15 cm with LOS = FF; no modifiers; charging infantry get no cover saves. Fire support: other formations within 15 cm with LOS.'),
      D('Ergebnis: 2 W6, der HÖHERE zählt, plus Modifikatoren', 'Result: 2D6, take the HIGHER die, plus modifiers'),
      D('Rückzug des Verlierers: 2 Bewegungen; Einheiten ≤ 15 cm vom Feind werden zerstört', 'Loser withdraws 2 moves; units ending within 15 cm of the enemy are destroyed'),
      D('Konsolidieren: Sieger erhält Marken = eigene Verluste, 5 cm Bewegung', 'Consolidate: winner gets markers = own losses, 5 cm move'),
    ]},
    {table: {head: [D('Modifikator (kumulativ)', 'Modifier (cumulative)'), ''], rows: [
      [D('je zugefügter Verlust', 'per casualty inflicted'), '+1'],
      [D('mehr Einheiten als der Gegner', 'more units than the opponent'), '+1'],
      [D('mehr als doppelt so viele Einheiten', 'more than double the units'), '+1'],
      [D('eigener Verband ohne Marken', 'own formation has no blast markers'), '+1'],
      [D('Gegner hat mehr Marken', 'enemy has more blast markers'), '+1'],
    ]}},
    {p: D('Aufgeriebene Verbände zählen, als hätten sie Marken = Einheitenzahl. Der Verlierer ist aufgerieben und erleidet Zusatztreffer in Höhe der Differenz (ohne Schutzwurf). Gleichstand ⇒ zweite Kampfrunde.',
          'Broken formations count as having markers equal to their unit count. The loser is broken and takes extra hits equal to the difference (no saves). A tie ⇒ a second round of combat.')},
    {h: D('Sammeln', 'Rallying')},
    {ul: [
      D('Ordnen: 2 W6, der HÖHERE bestimmt, wie viele Marken entfernt werden.', 'Marshal: roll 2D6; the HIGHER die is the number of markers removed.'),
      D('Endphase: Wurf ≥ Initiative, −2 wenn aufgerieben, −1 wenn Feind ≤ 30 cm. Erfolg: halbe Marken (aufgerundet) entfernen.', 'End phase: roll ≥ Initiative, −2 if broken, −1 if an enemy is within 30 cm. Success: remove half the markers (rounded up).'),
    ]},
  ],
};

// Balanced layouts: 180×120 cm table, 60 cm squares, 12 pieces. Only the top half (y < 60) is listed;
// the bottom half is its 180° rotation, so both sides (long edge or corner deployment) are identical.
// Pieces: [type, centre x, centre y, width, height]
// Colourblind-safe: Okabe-Ito palette, plus a unique pattern, shape and letter code per type (never colour alone).
const TERR = {
  building: {c: '#999999', n: D('Gebäude', 'Building'), s: 'r', p: 'solid', k: D('G', 'B')},
  ruins: {c: '#CC79A7', n: D('Ruinen', 'Ruins'), s: 'r', p: 'diag', k: D('R', 'R'), dash: true},
  woods: {c: '#009E73', n: D('Wald', 'Woods'), s: 'e', p: 'dots', k: D('W', 'W')},
  jungle: {c: '#0072B2', n: D('Dschungel', 'Jungle'), s: 'e', p: 'cross', k: D('D', 'J')},
  hill: {c: '#E69F00', n: D('Hügel', 'Hill'), s: 'e', p: 'lines', k: D('H', 'H')},
  brush: {c: '#F0E442', n: D('Gestrüpp (Krater, Felder)', 'Scrub (craters, fields)'), s: 'e', p: 'ticks', k: D('S', 'S')},
  river: {c: '#56B4E9', n: D('Fluss', 'River'), s: 'r', p: 'wave', k: D('F', 'R')},
};
const PAT_DEFS = `<defs>
  <pattern id="p-diag" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M-1 5L5 -1M-1 1L1 -1M3 5L5 3" stroke="#000" stroke-opacity=".6" stroke-width=".8"/></pattern>
  <pattern id="p-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#000" fill-opacity=".6"/></pattern>
  <pattern id="p-cross" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0L4 4M4 0L0 4" stroke="#fff" stroke-opacity=".7" stroke-width=".7"/></pattern>
  <pattern id="p-lines" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 2H4" stroke="#000" stroke-opacity=".6" stroke-width=".8"/></pattern>
  <pattern id="p-ticks" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M2 0V4" stroke="#000" stroke-opacity=".6" stroke-width=".8"/></pattern>
  <pattern id="p-wave" width="8" height="6" patternUnits="userSpaceOnUse"><path d="M0 3Q2 0 4 3T8 3" fill="none" stroke="#000" stroke-opacity=".6" stroke-width=".8"/></pattern>
  <pattern id="p-za" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M-1 5L5 -1M-1 1L1 -1M3 5L5 3" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/></pattern>
  <pattern id="p-zb" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 2H4" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/></pattern>
</defs>`;
function terrShape(t, x, y, w, h) {
  const T0 = TERR[t], st = `stroke="#fff" stroke-width="${T0.dash ? .8 : .6}"${T0.dash ? ' stroke-dasharray="2 1.2"' : ''}`;
  const geo = T0.s === 'e'
    ? (f => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" ${f}/>`)
    : (f => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="1.5" ${f}/>`);
  return geo(`fill="${T0.c}"`) + (T0.p === 'solid' ? '' : geo(`fill="url(#p-${T0.p})"`)) + geo(`fill="none" ${st}`);
}
const LAYOUTS = [
  {
    name: D('A · Ausgewogener Mix', 'A · Balanced mix'),
    note: D('Je Quadrat 2 Stücke. Sichtblockierendes Gelände auf beiden Flanken, offene Mitte mit Hügel als Sichtpunkt.',
            'Two pieces per square. Line-blocking terrain on both flanks, open centre with a hill as vantage point.'),
    top: [['woods', 25, 32, 24, 24], ['ruins', 52, 48, 28, 22], ['hill', 90, 30, 26, 18], ['brush', 75, 52, 18, 14], ['building', 150, 32, 16, 16], ['brush', 130, 52, 22, 14]],
  },
  {
    name: D('B · Offene Mitte', 'B · Open centre'),
    note: D('Nur 1 Stück im mittleren Quadrat: schnelle Mitte, Deckung an den Flanken. Gut für Armeen mit großer Reichweite und mit Nahkampfstärke gleichermaßen.',
            'Only 1 piece in the middle square: fast centre, cover on the flanks. Fair to both long-range and close-combat armies.'),
    top: [['building', 30, 32, 16, 16], ['ruins', 52, 48, 28, 22], ['brush', 18, 54, 16, 14], ['hill', 90, 28, 26, 18], ['woods', 140, 35, 28, 28], ['brush', 166, 50, 22, 14]],
  },
  {
    name: D('C · Zerstörte Stadt', 'C · Destroyed city'),
    note: D('Ruinenfelder auf beiden Flanken, in der Mitte nur zwei Ruinen und ein Gebäude: klare Schusslinien, Deckung an den Seiten.',
            'Ruin fields on both flanks, only two ruins and a building in the centre: clear lines of fire, cover on the sides.'),
    top: [['ruins', 28, 30, 26, 22], ['brush', 45, 52, 18, 14], ['ruins', 78, 34, 28, 22], ['building', 108, 50, 16, 16], ['ruins', 152, 30, 26, 22], ['brush', 135, 52, 18, 14]],
  },
  {
    name: D('D · Ausgewogen 2', 'D · Balanced 2'),
    note: D('Je ein Stück jeder Hauptgeländeart verteilt: Gebäude, Wald, Ruinen, Hügel, Gestrüpp. Keine Seite und kein Quadrat bevorzugt.',
            'One piece of each main terrain type spread out: building, woods, ruins, hill, scrub. No side or square favoured.'),
    top: [['building', 28, 30, 16, 16], ['woods', 48, 50, 22, 20], ['ruins', 85, 34, 28, 22], ['hill', 112, 50, 26, 18], ['brush', 135, 32, 22, 14], ['ruins', 158, 48, 24, 20]],
  },
  {
    name: D('E · Dschungel & Wald', 'E · Jungle & woods'),
    note: D('Viel Dschungel und Wald: kurze Sichtlinien, Infanterie im Vorteil, Fahrzeuge brauchen Wege. Dschungel ist gefährlich für AV/Kriegsmaschinen (4+ Deckung, schwierig für INF) – nur eine Ruine als Fixpunkt in der Mitte.',
            'Lots of jungle and woods: short lines of sight, favours infantry, vehicles need lanes. Jungle is dangerous for AV/war engines (4+ cover, difficult for INF) – only one ruin as a landmark in the centre.'),
    top: [['jungle', 28, 30, 28, 28], ['woods', 54, 52, 22, 20], ['jungle', 85, 30, 26, 26], ['ruins', 110, 50, 24, 18], ['woods', 135, 32, 26, 26], ['jungle', 162, 48, 26, 24]],
  },
  {
    name: D('F · Flussübergang', 'F · River crossing'),
    note: D('Ein Fluss (zählt als 2 Stücke, eines je gekreuztem Quadrat) quer durch die Mitte mit Brücke/Furt alle 30 cm. Gelände auf den Seiten bietet Deckung beim Übergang.',
            'A river (counts as 2 pieces, one per square crossed) through the centre with a bridge/ford every 30 cm. Terrain on the banks gives cover at the crossing.'),
    river: true,
    top: [['building', 28, 30, 16, 16], ['woods', 48, 50, 22, 20], ['ruins', 112, 40, 26, 22], ['woods', 145, 32, 26, 26], ['brush', 160, 52, 22, 14]],
  },
];

function layoutPieces(l) {
  const mir = ([t, x, y, w, h]) => [t, 180 - x, 120 - y, w, h];
  return [...l.top, ...l.top.map(mir)];
}

function pieceSvg([t, x, y, w, h]) {
  return terrShape(t, x, y, w, h) +
    `<text x="${x}" y="${y + 2.4}" class="pk">${esc(tx(TERR[t].k))}</text>`;
}

function layoutSvg(l) {
  const pcs = layoutPieces(l), mode = S.deploy;
  const counts = Array(6).fill(0);
  const sq = (x, y) => Math.min(2, Math.floor(x / 60)) + 3 * Math.min(1, Math.floor(y / 60));
  pcs.forEach(p => counts[sq(p[1], p[2])]++);
  let river = '';
  if (l.river) {
    counts[1]++; counts[4]++;
    river = terrShape('river', 90, 60, 8, 120) +
      [15, 45, 75, 105].map(y => `<rect x="85" y="${y - 4}" width="10" height="8" fill="#ddd" stroke="#000" stroke-width=".5"/><path d="M85 ${y - 1.5}H95M85 ${y + 1.5}H95" stroke="#000" stroke-width=".5"/>`).join('');
  }
  const grid = refGrid ? [60, 120].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="120" class="gl"/>`).join('') + `<line x1="0" y1="60" x2="180" y2="60" class="gl"/>` +
    counts.map((n, i) => `<text x="${(i % 3) * 60 + 4}" y="${Math.floor(i / 3) * 60 + 9}" class="cn">${n}</text>`).join('') : '';
  const a = '#0072B2', b = '#D55E00';
  const zone = (pts, col, pat) => `<polygon points="${pts}" fill="${col}" fill-opacity=".75"/><polygon points="${pts}" fill="url(#p-${pat})"/><polygon points="${pts}" fill="none" stroke="${col}" stroke-width=".8"/>`;
  const lab = (x, y, p) => `<text x="${x}" y="${y}" class="zt">${p === 'A' ? '▲' : '■'} ${esc(nm(p))}</text>`;
  const zones = mode === 'long'
    ? zone('0,0 180,0 180,15 0,15', a, 'za') + zone('0,105 180,105 180,120 0,120', b, 'zb') + lab(94, 10, 'A') + lab(90, 114.5, 'B')
    : zone('0,0 90,0 90,15 15,15 15,60 0,60', a, 'za') + zone('180,120 90,120 90,105 165,105 165,60 180,60', b, 'zb') + lab(36, 10, 'A') + lab(128, 114.5, 'B');
  return `<svg class="board" viewBox="-4 -4 188 128" xmlns="http://www.w3.org/2000/svg">
    <style>.gl{stroke:#fff;stroke-opacity:.5;stroke-dasharray:2 2;stroke-width:.4}.cn{font:700 6px system-ui;fill:#fff;stroke:#000;stroke-width:1.2;paint-order:stroke}.pk{font:800 7px system-ui;text-anchor:middle;fill:#fff;stroke:#000;stroke-width:1.6;paint-order:stroke}.zt{font:700 6px system-ui;text-anchor:middle;fill:#fff;stroke:#000;stroke-width:1.2;paint-order:stroke}</style>
    ${PAT_DEFS}
    <rect x="0" y="0" width="180" height="120" fill="#232a33" rx="2"/>${zones}${river}${pcs.map(pieceSvg).join('')}${grid}
    <rect x="0" y="0" width="180" height="120" fill="none" stroke="#fff" stroke-opacity=".5" rx="2"/></svg>`;
}

function refBlock(b) {
  if (b.h) return `<h3 class="rh">${tx(b.h)}</h3>`;
  if (b.p) return `<p class="rp">${esc(tx(b.p))}</p>`;
  if (b.ul) return `<ul class="rl">${b.ul.map(i => `<li>${esc(tx(i))}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol class="rl">${b.ol.map(i => `<li>${esc(tx(i))}</li>`).join('')}</ol>`;
  if (b.table) {
    const {head, rows} = b.table;
    return `<div class="rt"><table><tr>${head.map(h => `<th>${esc(tx(h))}</th>`).join('')}</tr>` +
      rows.map(r => `<tr>${r.map(c => `<td>${esc(tx(c))}</td>`).join('')}</tr>`).join('') + `</table></div>`;
  }
  return '';
}

function viewLayouts() {
  const l = LAYOUTS[refLay], t = T();
  const used = [...new Set(layoutPieces(l).map(p => p[0]).concat(l.river ? ['river'] : []))];
  const msg = S.lang === 'de'
    ? ['Gleichgewicht: Die Layouts sind 180°-punktsymmetrisch – beide Seiten haben identisches Gelände, egal ob Lange Kante oder Ecke. 12 Stücke (2 je 60-cm-Quadrat), 15–30 cm groß, 0–4 Stücke je Quadrat. Ziele und Straßen werden danach platziert.',
       'Raster', 'Zahl = Stücke je Quadrat']
    : ['Balance: layouts are 180° point-symmetric – both sides get identical terrain whether you use Long Edge or Corner. 12 pieces (2 per 60 cm square), 15–30 cm each, 0–4 per square. Objectives and roads are placed afterwards.',
       'Grid', 'Number = pieces per square'];
  return `<div class="laygrid">${LAYOUTS.map((x, i) => `<button data-lay="${i}" class="${i === refLay ? 'on' : ''}">${esc(tx(x.name))}</button>`).join('')}</div>
    <div class="row" style="margin-bottom:10px">${['long', 'corner'].map(k => `<button data-dep="${k}" class="${S.deploy === k ? 'on' : ''}">${t[k]}</button>`).join('')}
      <button data-grid class="${refGrid ? 'on' : ''}">${msg[1]}</button></div>
    ${layoutSvg(l)}
    <div class="legend">${used.map(k => `<span><svg width="22" height="16" viewBox="0 0 22 16">${PAT_DEFS}${terrShape(k, 11, 8, 18, 12)}<text x="11" y="11" class="pk" style="font-size:8px">${esc(tx(TERR[k].k))}</text></svg>${tx(TERR[k].n)}</span>`).join('')}</div>
    <p class="rp">${esc(tx(l.note))}</p>
    <p class="rp mut">${esc(msg[0])}${refGrid ? ' (' + msg[2] + ')' : ''}</p>`;
}

function viewRef() {
  const t = T();
  const chips = Object.keys(REF_SECS).map(k =>
    `<button data-ref="${k}" class="${k === refSec ? 'on' : ''}"><span>${REF_SECS[k][0]}</span>${tx(REF_SECS[k][1])}</button>`).join('');
  const sc = refScen || S.scenario;
  const toggle = refSec === 'goals' ? `<div class="row" style="margin-bottom:12px">${[['fire', t.scenFire], ['tourn', t.scenTourn]].map(([k, n]) =>
    `<button data-rscen="${k}" class="${sc === k ? 'on' : ''}">${n}</button>`).join('')}</div>` : '';
  const blocks = refSec === 'goals' ? REF[sc === 'fire' ? 'goalsFire' : 'goalsTourn'] : REF[refSec];
  const body = refSec === 'layouts' ? viewLayouts() : toggle + blocks.map(refBlock).join('');
  return `<div class="card"><h2>📖 ${S.lang === 'de' ? 'Referenz' : 'Reference'}</h2><div class="chips">${chips}</div></div>
    <div class="card refbody">${body}</div>
    <button data-refclose style="width:100%">${S.lang === 'de' ? '✕ Referenz schließen' : '✕ Close reference'}</button>`;
}
