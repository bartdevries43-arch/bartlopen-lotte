/* ================================================================== *
 *  Lotte, Run Coach · 10 km uitlopen
 *  16 weken vanaf ma 19 okt 2026, flexibel 2x per week naast hockey, knie voorop.
 *  2 flexibele trainingen per week: snelheid en rustig langer.
 *  Gebouwd op de hoofdapp van Kim. Alles lokaal in de browser.
 * ================================================================== */

const CONFIG = {
  unit:       "km",
  zonePaceSuffix: "",
  footEmoji:  "🏃‍♀️",
  mottos: [
    "Zet 'm op, strijder!",
    "Lekker begonnen, strijder!",
    "Je bouwt 'm op, strijder.",
    "Halverwege, knap volgehouden! ⚡",
    "De 10 km komt eraan, strijder!",
    "10 km uitgelopen! Wat een strijder 🎉",
  ],
  appName:    "Op naar 10K",
  runner:     "Lotte",
  goal:       "10 km uitlopen",
  startDate:  new Date(2026, 9, 19),
  storeKey:   "lotte10k.log.v1",
  coachName:  "Coach Bart",
  coachHandle:"@bartlopen",
  coachPhoto: "coach.jpg",
  athleteWord:"strijder",
  catchphrase:"Zet 'm op, strijder!",
};

const RUNNER = CONFIG.runner;
const GOAL = CONFIG.goal;
const START_DATE = CONFIG.startDate;
const STORE_KEY = CONFIG.storeKey;
const TOTAL_WEEKS = 16;
const UNIT = CONFIG.unit === "min" ? "min" : "km";
const UNIT_LABEL = UNIT;
const nlNum = (v) => String(v).replace(".", ",");
const ZONE_SUFFIX = CONFIG.zonePaceSuffix ?? "/km";
const COACH_INITIAL = (CONFIG.coachName.replace(/^coach\s+/i, "")[0] || "C").toUpperCase();

const ZONES = [
  { key: "herstel", name: "Heel rustig",  pace: "los en makkelijk", info: "RPE 2 · alleen even bewegen" },
  { key: "duur",    name: "Rustig",       pace: "kletstempo",       info: "RPE 3-4 · je kunt nog kletsen" },
  { key: "lang",    name: "Langere loop", pace: "rustig",           info: "RPE 3-4 · het gaat om de afstand" },
  { key: "tempo",   name: "Iets vlotter", pace: "vlot, geen sprint", info: "RPE 5-6 · nog korte zinnen" },
];
const zoneByKey = Object.fromEntries(ZONES.map((z) => [z.key, z]));

const COACH = {
  herstel: [
    "Vandaag echt rustig, strijder. Hier word je sterker van.",
    "Lichte dag. Je knie wordt er blij van.",
    "Niets forceren, gewoon lekker bewegen.",
    "Slim rustig doen is ook sterk zijn, strijder.",
  ],
  duur: [
    "Rustig, strijder. Kun je nog kletsen? Dan zit je goed.",
    "Ontspannen schouders, rustige adem. Lekker bezig.",
    "Rustig is geen zwakte, het is de basis onder je 10 km.",
    "Zeurt je knie? Even wandelen, dan rustig verder.",
  ],
  lang: [
    "Langere loop, strijder. Rustig starten, trots finishen.",
    "Elke kilometer erbij brengt je dichter bij die 10.",
    "Het tempo maakt niet uit, uitlopen telt.",
    "Je kunt verder dan je denkt. Geniet ervan!",
  ],
  tempo: [
    "Iets vlotter, strijder, maar geen sprint.",
    "Tussen de stukjes echt rustig, dat hoort erbij.",
    "Je hockeybenen kunnen dit makkelijk. Beheerst blijven.",
    "Lekker afwisselen, zo wordt hardlopen leuker.",
  ],
};
const coachLine = (zone) => {
  const arr = COACH[zone] || COACH.duur;
  return arr[Math.floor(Math.random() * arr.length)];
};

const DONE = [
  "💪 Sterk gedaan, strijder!",
  "🔥 Weer eentje afgevinkt.",
  "👏 Lekker bezig, strijder.",
  "🤎 Weer een stap richting 10 km.",
  "✅ Weer een stukje sterker.",
  "⭐ Knap volgehouden!",
];

const WHY = {
  herstel: "Heel rustig lopen houdt je los zonder nieuwe belasting. Juist op deze momenten worden je spieren en je knie sterker.",
  duur:    "Rustig hardlopen bouwt je basis: een sterker hart en benen die langer meegaan. Bij hockey ren je in korte sprintjes, bij 10 km loop je lang aan één stuk. Dat leert je lichaam hier stap voor stap.",
  lang:    "De langere loop is de belangrijkste training van je week. Elke keer een stukje verder, tot je straks 10 km uitloopt. Het tempo doet er niet toe, de afstand wel.",
  tempo:   "Korte stukjes iets vlotter maken je looppas lichter en het hardlopen gevarieerder. Bewust kort en beheerst, want je hockey is al genoeg sprintwerk en je knie moet het fijn blijven vinden.",
};

/* --- Helpers: twee flexibele trainingen, de finale op de echte zondag --- */
/* Het label onder een training volgt de zone, tenzij een sessie zelf een kind meegeeft. */
const KIND_BY_ZONE = { herstel: "Heel rustig", duur: "Rustig", lang: "Langere loop", tempo: "Iets vlotter" };
const d1 = (o) => ({ day: "d1", dayLabel: "Training 1 · korter", kind: KIND_BY_ZONE[o.zone], ...o });
const d2 = (o) => ({ day: "d2", dayLabel: "Training 2 · langer", kind: KIND_BY_ZONE[o.zone], ...o });

const PLAN = [
  /* ---------- Fase 1 · Rustig wennen ---------- */
  { week: 1, dates: "19–25 okt", phase: "Fase 1 · Rustig wennen", sessions: [
    d1({ zone: "duur", km: 3, title: "3 km rustig", goal: "Lekker beginnen", why: "Je eerste training is bewust kort. Je knie en je spieren moeten wennen aan regelmatig hardlopen, en dat gaat het best met rustige, korte stukjes. Hardlopen moet vooral leuk blijven, dus geen haast.", blocks: [
      "5 min wandelen om warm te worden",
      "3 km rustig hardlopen, zo rustig dat je nog kunt kletsen",
      "Wandelen tussendoor mag altijd",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 4, title: "4 km rustig", goal: "Je langere loop van de week", blocks: [
      "5 min wandelen om warm te worden",
      "4 km rustig, precies wat je nu al kunt",
      "Voelt je knie zeurderig? Wandel even en loop daarna rustig verder. Blijft het, stop dan",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 2, dates: "26 okt–1 nov", phase: "Fase 1 · Rustig wennen", sessions: [
    d1({ zone: "duur", km: 3.5, title: "3,5 km rustig", goal: "Ritme vinden", blocks: [
      "5 min wandelen",
      "3,5 km rustig hardlopen",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 4.5, title: "4,5 km rustig", goal: "Een stukje verder", blocks: [
      "5 min wandelen",
      "4,5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 3, dates: "2–8 nov", phase: "Fase 1 · Rustig wennen", sessions: [
    d1({ zone: "duur", km: 3.5, title: "3,5 km rustig", goal: "Rustig blijven", blocks: [
      "5 min wandelen",
      "3,5 km rustig hardlopen",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 5, title: "5 km rustig", goal: "Je eerste 5 km!", why: "Vijf kilometer is een mooie mijlpaal: de helft van je doel. Loop hem rustig, het tempo maakt niets uit. Wat telt is dat je hem uitloopt zonder dat je knie gaat mopperen.", blocks: [
      "5 min wandelen",
      "5 km rustig, zo rustig dat je nog kunt praten",
      "5 min uitwandelen",
      "Gelukt? Dan zit je al op de helft 🎉",
    ] }),
  ]},
  { week: 4, dates: "9–15 nov", phase: "Fase 1 · Rustig wennen", recovery: true, sessions: [
    d1({ zone: "herstel", km: 3, title: "3 km heel rustig", goal: "Rustweek, je knie tankt bij", why: "Elke vierde week is lichter. Je wordt niet sterker tijdens het trainen, maar tijdens het rusten erna. Zeker voor je knie zijn deze weken heel belangrijk.", blocks: [
      "5 min wandelen",
      "3 km heel rustig",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "duur", km: 4, title: "4 km rustig", goal: "Lekker luchtig", blocks: [
      "5 min wandelen",
      "4 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},

  /* ---------- Fase 2 · Naar 6,5 km ---------- */
  { week: 5, dates: "16–22 nov", phase: "Fase 2 · Naar 6,5 km", sessions: [
    d1({ zone: "tempo", km: 4, title: "4 km met 4× 1 min iets vlotter", goal: "Even wat vlotter", blocks: [
      "5 min wandelen",
      "1 km rustig inlopen",
      "4× 1 min iets vlotter, met 2 min rustig ertussen",
      "Rustig uitlopen tot 4 km",
      "Iets vlotter is geen sprint: je kunt nog korte zinnen zeggen",
    ] }),
    d2({ zone: "lang", km: 5.5, title: "5,5 km rustig", goal: "Je langere loop", blocks: [
      "5 min wandelen",
      "5,5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 6, dates: "23–29 nov", phase: "Fase 2 · Naar 6,5 km", sessions: [
    d1({ zone: "duur", km: 4, title: "4 km rustig", goal: "Basis", blocks: [
      "5 min wandelen",
      "4 km rustig hardlopen",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 6, title: "6 km rustig", goal: "Je langste tot nu toe", blocks: [
      "5 min wandelen",
      "6 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 7, dates: "30 nov–6 dec", phase: "Fase 2 · Naar 6,5 km", sessions: [
    d1({ zone: "tempo", km: 4.5, title: "4,5 km met 3× 2 min iets vlotter", goal: "Lekker afwisselen", blocks: [
      "5 min wandelen",
      "1 km rustig inlopen",
      "3× 2 min iets vlotter, met 2 min rustig ertussen",
      "Rustig uitlopen tot 4,5 km",
    ] }),
    d2({ zone: "lang", km: 6.5, title: "6,5 km rustig", goal: "Je langere loop", blocks: [
      "5 min wandelen",
      "6,5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 8, dates: "7–13 dec", phase: "Fase 2 · Naar 6,5 km", recovery: true, sessions: [
    d1({ zone: "herstel", km: 3.5, title: "3,5 km heel rustig", goal: "Rustweek", blocks: [
      "5 min wandelen",
      "3,5 km heel rustig",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "duur", km: 5, title: "5 km rustig", goal: "Lekker luchtig", blocks: [
      "5 min wandelen",
      "5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},

  /* ---------- Fase 3 · Naar 8 km ---------- */
  { week: 9, dates: "14–20 dec", phase: "Fase 3 · Naar 8 km", sessions: [
    d1({ zone: "tempo", km: 4.5, title: "4,5 km met 3× 3 min iets vlotter", goal: "Iets langer vlot", blocks: [
      "5 min wandelen",
      "1 km rustig inlopen",
      "3× 3 min iets vlotter, met 2 min rustig ertussen",
      "Rustig uitlopen tot 4,5 km",
    ] }),
    d2({ zone: "lang", km: 7, title: "7 km rustig", goal: "Zeven kilometer!", blocks: [
      "5 min wandelen",
      "7 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 10, dates: "21–27 dec", phase: "Fase 3 · Naar 8 km", recovery: true, sessions: [
    d1({ zone: "duur", km: 4, title: "4 km rustig", goal: "Kerstweek, lekker rustig", blocks: [
      "5 min wandelen",
      "4 km rustig",
      "5 min uitwandelen",
      "Druk met de feestdagen? Dan is één keer lopen deze week ook goed",
    ] }),
    d2({ zone: "duur", km: 6, title: "6 km rustig", goal: "Kerstweek", blocks: [
      "5 min wandelen",
      "6 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 11, dates: "28 dec–3 jan", phase: "Fase 3 · Naar 8 km", sessions: [
    d1({ zone: "duur", km: 4.5, title: "4,5 km rustig", goal: "Het nieuwe jaar in", blocks: [
      "5 min wandelen",
      "4,5 km rustig",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 7.5, title: "7,5 km rustig", goal: "Je langere loop", blocks: [
      "5 min wandelen",
      "7,5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 12, dates: "4–10 jan", phase: "Fase 3 · Naar 8 km", sessions: [
    d1({ zone: "tempo", km: 5, title: "5 km met 4× 2 min iets vlotter", goal: "Lekker afwisselen", blocks: [
      "5 min wandelen",
      "1 km rustig inlopen",
      "4× 2 min iets vlotter, met 2 min rustig ertussen",
      "Rustig uitlopen tot 5 km",
    ] }),
    d2({ zone: "lang", km: 8, title: "8 km rustig", goal: "Acht kilometer, knap!", blocks: [
      "5 min wandelen",
      "8 km rustig",
      "Neem eventueel wat te drinken mee",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 13, dates: "11–17 jan", phase: "Fase 3 · Naar 8 km", recovery: true, sessions: [
    d1({ zone: "herstel", km: 4, title: "4 km heel rustig", goal: "Rustweek voor de laatste stap", blocks: [
      "5 min wandelen",
      "4 km heel rustig",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "duur", km: 6, title: "6 km rustig", goal: "Lekker luchtig", blocks: [
      "5 min wandelen",
      "6 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},

  /* ---------- Fase 4 · Op naar 10 km ---------- */
  { week: 14, dates: "18–24 jan", phase: "Fase 4 · Op naar 10 km", sessions: [
    d1({ zone: "duur", km: 5, title: "5 km rustig", goal: "Basis", blocks: [
      "5 min wandelen",
      "5 km rustig",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 8.5, title: "8,5 km rustig", goal: "Bijna daar", blocks: [
      "5 min wandelen",
      "8,5 km rustig",
      "5 min uitwandelen",
    ] }),
  ]},
  { week: 15, dates: "25–31 jan", phase: "Fase 4 · Op naar 10 km", sessions: [
    d1({ zone: "duur", km: 5, title: "5 km soepel", goal: "Fris blijven", blocks: [
      "5 min wandelen",
      "5 km rustig, laatste kilometer iets vlotter als het lekker gaat",
      "5 min uitwandelen",
    ] }),
    d2({ zone: "lang", km: 9, title: "9 km rustig", goal: "Je laatste lange loop voor de finale", blocks: [
      "5 min wandelen",
      "9 km rustig",
      "5 min uitwandelen",
      "Volgende week je 10 km. Je kunt het!",
    ] }),
  ]},
  { week: 16, dates: "1–7 feb", phase: "Fase 4 · Op naar 10 km", finish: true, raceLabel: "🎉 Jouw finale", raceSub: "10 km uitlopen, op je eigen tempo", sessions: [
    d1({ zone: "herstel", km: 4, title: "4 km soepel", goal: "Benen fris voor je finale", blocks: [
      "5 min wandelen",
      "4 km heel rustig",
      "5 min uitwandelen",
      "Doe je finale minstens twee dagen hierna",
    ] }),
    d2({ zone: "lang", km: 10, kind: "Finale", title: "🎉 10 km uitlopen", goal: "Jouw finale: 10 km, op je eigen tempo", why: "Zestien weken geleden liep je 4 km. Vandaag loop je er 10. Rustig, op je eigen tempo, en met een knie die je onderweg goed hebt leren kennen. Neem iemand mee om je aan te moedigen, of kies een mooie route. Dit is jouw moment, geniet ervan.", blocks: [
      "Kies een dag zonder hockey ervoor of erna",
      "5 min wandelen om warm te worden",
      "10 km rustig, net zo rustig als je lange lopen",
      "Wandelen tussendoor mag altijd, uitlopen telt",
      "5 min uitwandelen. Gefeliciteerd, strijder! 🎉",
    ] }),
  ]},
];

const INFO = [
  { icon: "🎯", title: "Je doel: 10 km uitlopen", items: [
    "In 16 weken van 4 km naar 10 km, op je eigen tempo. Een tijd hoeft niet, uitlopen is het doel.",
    "We bouwen heel rustig op, met elke vierde week een lichtere week. Zo blijft het leuk en geven we je knie de tijd.",
    "Gaat het een keer minder? Geen probleem. Je knie en je plezier bepalen het tempo, niet het schema.",
  ]},
  { icon: "🦵", title: "Je knie gaat voor", items: [
    "Je knieklachten nemen we serieus. Daarom bouwen we rustig op en zitten er geen harde trainingen in.",
    "Voel je je knie tijdens het lopen? Ga wandelen. Wordt het niet minder, stop dan. Dat is geen opgeven, dat is slim.",
    "Heb je regelmatig last, ook na het hockeyen of bij traplopen? Laat dan een huisarts of fysiotherapeut ernaar kijken. Op jouw leeftijd groeit je lichaam nog, en dan kunnen knieën gevoelig zijn. Een fysio weet precies wat je wel en niet moet doen. Vertel het ook even thuis.",
    "Twee keer per week 5 minuten, en alleen als het pijnvrij gaat: bruggetje (billen omhoog), zijwaarts liggend je bovenste been heffen, en op je tenen gaan staan (kuitheffen). Dat maakt de spieren rond je knie sterker.",
    "Zegt een fysio iets anders dan dit schema? Dan gaat de fysio voor. Laat het Coach Bart weten, dan passen we het aan.",
  ]},
  { icon: "🏑", title: "Hockey en hardlopen samen", items: [
    "Je hockeyt op dinsdag, donderdag en zaterdag. Dat is al veel, en het telt gewoon mee.",
    "Kies voor hardlopen dagen zonder hockey, zoals maandag, woensdag, vrijdag of zondag.",
    "Liever niet je langere loop op de dag na een zware wedstrijd.",
    "Moe of zware benen? Dan is één keer lopen die week ook prima.",
  ]},
  { icon: "🗓️", title: "Flexibel lopen, zo werkt het", items: [
    "Elke week staan er twee trainingen klaar en jij kiest wanneer je ze doet.",
    "Houd minstens één dag tussen je twee looptrainingen, dat is fijn voor je knie.",
    "Komt een hele week niet uit? Gebruik de knop bij het schema om alles een week op te schuiven.",
    "Een training missen is niet erg. Ga gewoon verder waar je was.",
  ]},
  { icon: "🔢", title: "Zo lees je je trainingen", items: [
    "Rustig betekent: zo rustig dat je nog kunt kletsen. Kan dat niet, dan ga je te hard.",
    "Iets vlotter betekent: je kunt nog korte zinnen zeggen. Het is geen sprint.",
    "4× 1 min iets vlotter betekent: vier keer een minuut iets vlotter, met rustig hardlopen ertussen.",
    "Elke training begint en eindigt met 5 minuten wandelen.",
  ]},
  { icon: "👟", title: "Schoenen en ondergrond", items: [
    "Loop op echte hardloopschoenen, niet op je hockeyschoenen. Dat scheelt echt voor je knie.",
    "Zachte ondergrond is fijner: gras, een bospad of gravel.",
    "Nieuwe schoenen nodig? Een hardloopwinkel kan je goed adviseren.",
  ]},
  { icon: "🔥", title: "Warming-up en afkoelen", items: [
    "Begin altijd met 5 minuten wandelen.",
    "Start rustiger dan je wil, je komt vanzelf in je ritme.",
    "Na afloop 5 minuten uitwandelen en even losmaken: kuiten, bovenbenen en heupen.",
  ]},
  { icon: "😴", title: "Rust, slaap en plezier", items: [
    "School, hockey en hardlopen is veel. Goed slapen helpt je het meest.",
    "Vergelijk jezelf niet met anderen. Jij loopt jouw eigen schema, en dat is precies goed.",
    "Plezier gaat voor alles. Vind je het een keer niet leuk? Neem een vriendin mee of kies een nieuwe route.",
    "Vragen of twijfels? Stuur Coach Bart een bericht.",
  ]},
];

const BADGES = [
  { id: "first",   icon: "👟", name: "Eerste stap",    desc: "1 training afgevinkt",    test: (s) => s.done >= 1 },
  { id: "week",    icon: "✅", name: "Week compleet",  desc: "Een hele week afgerond",  test: (s) => s.fullWeeks >= 1 },
  { id: "vijf",    icon: "🖐️", name: "Vijf km",        desc: "5 km in één training",    test: (s) => s.maxDist >= 5 },
  { id: "streak",  icon: "🔥", name: "Drie weken vol", desc: "Reeks van 6 trainingen",  test: (s) => s.streak >= 6 },
  { id: "half",    icon: "⚡", name: "Halverwege",     desc: "50% van je schema",       test: (s) => s.done >= s.total / 2 },
  { id: "zeven",   icon: "7️⃣", name: "Zeven km",       desc: "7 km in één training",    test: (s) => s.maxDist >= 7 },
  { id: "vijftig", icon: "🌟", name: "Vijftig km",     desc: "50 km totaal gelopen",    test: (s) => s.km >= 50 },
  { id: "negen",   icon: "🏔️", name: "Bijna daar",     desc: "9 km in één training",    test: (s) => s.maxDist >= 9 },
  { id: "honderd", icon: "💯", name: "Honderd km",     desc: "100 km totaal gelopen",   test: (s) => s.km >= 100 },
  { id: "finish",  icon: "🎉", name: "10 km!",         desc: "Je finale uitgelopen",    test: (s) => s.finaleDone },
];

/* ================================================================== *
 *  State
 * ================================================================== */
const LEGACY_KEYS = CONFIG.legacyKeys || [];

function leesSleutel(k) {
  try { const v = JSON.parse(localStorage.getItem(k)); return v && typeof v === "object" ? v : null; }
  catch { return null; }
}
function aantalSessies(o) { return o ? Object.keys(o).filter((k) => /^w\d+-/.test(k)).length : 0; }
function samenvoegen(hoofd, extra) { return { ...extra, ...hoofd }; }

/* Voortgang laden. Staat er iets onder een oudere opslagsleutel, dan nemen we
   dat over, zodat niemand zijn afgevinkte trainingen kwijtraakt. */
function loadLog() {
  let uit = leesSleutel(STORE_KEY) || {};
  const eigen = aantalSessies(uit);
  LEGACY_KEYS.forEach((k) => {
    const oud = leesSleutel(k);
    if (aantalSessies(oud)) uit = samenvoegen(uit, oud);
  });
  if (aantalSessies(uit) > eigen) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(uit)); } catch {}
  }
  return uit;
}
function saveLog() {
  log.__saved = Date.now();
  try { localStorage.setItem(STORE_KEY, JSON.stringify(log)); } catch {}
  idbZet(log);
  renderLaatstOpgeslagen();
}

/* ----- Tweede back-up in IndexedDB ---------------------------------- *
 *  localStorage kan door de browser worden opgeruimd. Elke opslag gaat
 *  daarom ook naar IndexedDB; bij opstarten halen we terug wat vollediger is.
 * -------------------------------------------------------------------- */
const IDB_NAAM = "bartlopen-runcoach", IDB_STORE = "logs";
function idbOpen() {
  return new Promise((ok, nee) => {
    if (!window.indexedDB) return nee(new Error("geen indexedDB"));
    const r = indexedDB.open(IDB_NAAM, 1);
    r.onupgradeneeded = () => {
      if (!r.result.objectStoreNames.contains(IDB_STORE)) r.result.createObjectStore(IDB_STORE);
    };
    r.onsuccess = () => ok(r.result);
    r.onerror = () => nee(r.error);
  });
}
async function idbZet(data) {
  try {
    const db = await idbOpen();
    await new Promise((ok, nee) => {
      const t = db.transaction(IDB_STORE, "readwrite");
      t.objectStore(IDB_STORE).put(JSON.parse(JSON.stringify(data)), STORE_KEY);
      t.oncomplete = ok; t.onerror = () => nee(t.error);
    });
  } catch {}
}
async function idbHaal() {
  try {
    const db = await idbOpen();
    return await new Promise((ok, nee) => {
      const t = db.transaction(IDB_STORE, "readonly");
      const q = t.objectStore(IDB_STORE).get(STORE_KEY);
      q.onsuccess = () => ok(q.result || null);
      q.onerror = () => nee(q.error);
    });
  } catch { return null; }
}
function herstelUitBackup() {
  return idbHaal().then((kopie) => {
    if (!kopie) { idbZet(log); return false; }
    if (aantalSessies(kopie) > aantalSessies(log)) {
      log = samenvoegen(log, kopie);
      saveLog(); renderAll();
      toast("Je voortgang is teruggehaald 🔄");
      return true;
    }
    idbZet(log);
    return false;
  }).catch(() => false);
}
function renderLaatstOpgeslagen() {
  const el = document.getElementById("lastSaved");
  if (!el) return;
  const t = log.__saved;
  if (!t) { el.textContent = ""; return; }
  const d = new Date(t), pad = (n) => String(n).padStart(2, "0");
  el.textContent = `Laatst opgeslagen: ${d.getDate()}-${pad(d.getMonth() + 1)} om ${pad(d.getHours())}:${pad(d.getMinutes())} · ${aantalSessies(log)} trainingen ingevuld`;
}
let log = loadLog();

const sid = (week, day) => `w${week}-${day}`;
const flatSessions = PLAN.flatMap((w) => w.sessions.map((s) => ({ ...s, week: w.week })));
const totalSessions = flatSessions.length;
const LAST_SESSION = flatSessions[flatSessions.length - 1];
/* Vast anker, zodat de finale-badge niet verschuift als er weken bijkomen. */
const FINALE_SESSION = { week: 16, day: "d2" }; /* 10 km uitlopen, week van 1 feb */
const DAY_OFFSET = { ma: 0, di: 1, wo: 2, do: 3, vr: 4, za: 5, zo: 6, d1: 0, d2: 2, d3: 4, d4: 6 };

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function dateAtDay(dayIndex) {
  const date = new Date(schedStartMs());
  date.setDate(date.getDate() + dayIndex);
  date.setHours(12, 0, 0, 0);
  return date;
}

function sessionDate(week, day) {
  return dateAtDay((week - 1) * 7 + (DAY_OFFSET[day] ?? 0));
}

function isoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function planningEntries() {
  return Array.isArray(log.__planning) ? log.__planning : [];
}

function planningForWeek(week) {
  const start = isoDate(dateAtDay((week - 1) * 7));
  const end = isoDate(dateAtDay((week - 1) * 7 + 6));
  return planningEntries().filter((entry) => entry.start <= end && (entry.end || entry.start) >= start);
}

function parseTime(str) {
  if (!str) return null;
  const parts = String(str).split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 60;
}

function durationParts(str) {
  const total = parseTime(str) || 0;
  return { minutes: Math.floor(total / 60), seconds: total % 60 };
}

function durationValue(minutes, seconds) {
  const m = Math.max(0, parseInt(minutes, 10) || 0);
  const s = Math.min(59, Math.max(0, parseInt(seconds, 10) || 0));
  return `${m}:${String(s).padStart(2, "0")}`;
}
function paceSeconds(distance, timeStr) {
  const d = parseFloat(String(distance).replace(",", "."));
  const sec = parseTime(timeStr);
  if (!d || !sec) return null;
  return sec / d;
}
function fmtPace(perKm) {
  if (!perKm) return null;
  const m = Math.floor(perKm / 60);
  const s = Math.round(perKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

/* Afgeleide statistieken uit de log */
function computeStats() {
  let done = 0, km = 0, maxDist = 0, maxTime = 0, bestPace = 0, secs = 0, raceDone = false;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (!e || !e.done) return;
    done++;
    const d = parseFloat(String(e.distance || "").replace(",", ".")) || 0;
    km += d;
    if (d > maxDist) maxDist = d;
    const t = parseTime(e.time) || 0;
    secs += t;
    if (t > maxTime) maxTime = t;
    const p = paceSeconds(e.distance, e.time);
    if (p && (bestPace === 0 || p < bestPace)) bestPace = p;
    if (s.week === LAST_SESSION.week && s.day === LAST_SESSION.day) raceDone = true;
  });
  let streak = 0, run = 0;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (e && e.done) { run++; streak = Math.max(streak, run); } else run = 0;
  });
  let fullWeeks = 0;
  PLAN.forEach((w) => {
    if (w.sessions.every((s) => log[sid(w.week, s.day)]?.done)) fullWeeks++;
  });
  const finaleDone = !!log[sid(FINALE_SESSION.week, FINALE_SESSION.day)]?.done;
  return { done, total: totalSessions, km, maxDist, maxTime, bestPace, secs, raceDone, finaleDone, streak, fullWeeks };
}

function currentWeek() {
  const diff = Math.floor((Date.now() - schedStartMs()) / (7 * 864e5));
  /* Uit PLAN afleiden, niet uit TOTAL_WEEKS: anders blijft de huidige week
     hangen op de oude laatste week zodra er weken bijkomen. */
  return Math.min(PLAN[PLAN.length - 1].week, Math.max(1, diff + 1));
}

/* ================================================================== *
 *  Rendering
 * ================================================================== */
const $ = (id) => document.getElementById(id);

function animateCount(el, to, suffix = "") {
  const dur = 700, t0 = performance.now();
  const dec = to % 1 !== 0;
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const v = to * (1 - Math.pow(1 - k, 3));
    el.textContent = (dec ? v.toFixed(1).replace(".", ",") : Math.round(v)) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderHero(stats) {
  $("runnerName").textContent = RUNNER;
  $("goalText").textContent = GOAL;
  const pct = Math.round((stats.done / stats.total) * 100);
  $("ringPct").textContent = `${pct}%`;
  const r = 52, c = 2 * Math.PI * r;
  const fg = $("ringFg");
  fg.style.strokeDasharray = c;
  fg.style.strokeDashoffset = c;
  requestAnimationFrame(() => { fg.style.strokeDashoffset = c * (1 - pct / 100); });
  const mottos = CONFIG.mottos || ["Zet 'm op, strijder!", "Lekker bezig, strijder!", "Je bouwt 'm rustig op, strijder.", "Halverwege, knap volgehouden! ⚡", "Bijna race-klaar, strijder!", "Finisher! Wat een prestatie, strijder. 🏅"];
  $("heroMotto").textContent =
    stats.raceDone ? mottos[5] : pct >= 80 ? mottos[4] : pct >= 50 ? mottos[3] : pct >= 20 ? mottos[2] : pct > 0 ? mottos[1] : mottos[0];
  renderCountdown();
  renderSubgoal();
}

function raceTarget() {
  /* Het eerstvolgende doel dat nog moet komen. Gelopen = datum voorbij óf afgevinkt.
     Via dateAtDay rekenen, niet met milliseconden: dat schuift bij de zomertijd. */
  const vandaag = new Date().setHours(0, 0, 0, 0);
  const datumVan = (w) => {
    const d = w.sessions[w.sessions.length - 1].day;
    return dateAtDay((w.week - 1) * 7 + (DAY_OFFSET[d] ?? 6)).setHours(0, 0, 0, 0);
  };
  const doelen = PLAN.filter((w) => w.race || w.finish || w.tuneup);
  const gelopen = (w) => {
    const d = w.sessions[w.sessions.length - 1].day;
    return datumVan(w) < vandaag || !!log[sid(w.week, d)]?.done;
  };
  const volgende = doelen.find((w) => !gelopen(w));
  const rw = volgende || doelen[doelen.length - 1] || PLAN[PLAN.length - 1];
  const rs = rw.sessions[rw.sessions.length - 1];
  return { rw, rs, date: new Date(datumVan(rw)), allesGelopen: !volgende };
}

function raceInfo() {
  const { rs, date, allesGelopen } = raceTarget();
  const days = Math.round((new Date(date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5);
  return { days: allesGelopen ? -1 : days, name: rs.title.replace(/^[^\p{L}\d]+/u, "").trim() };
}

const NL_DAG = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const NL_MAAND = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
function renderSubgoal() {
  const el = document.querySelector(".hero-subgoal");
  if (!el) return;
  const { rw, rs, date, allesGelopen } = raceTarget();
  const d = new Date(date);
  const voorbij = allesGelopen || new Date(date).setHours(12, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  const soort = rw.race ? "🏁 Doelrace" : rw.finish ? "🎉 Finale" : "🎯 Tussendoel";
  /* Flexibele trainingen hebben geen vaste dag: dan noemen we de week. */
  const ma = dateAtDay((rw.week - 1) * 7);
  const wanneer = /^d\d+$/.test(rs.day)
    ? `week van ${ma.getDate()} ${NL_MAAND[ma.getMonth()]}`
    : `${NL_DAG[d.getDay()]} ${d.getDate()} ${NL_MAAND[d.getMonth()]}`;
  const kop = `${voorbij ? "🎉 Gelopen" : soort} · ${wanneer}`;
  el.innerHTML = `<span>${kop}</span><strong>${rw.raceSub || rs.title.replace(/^[^\p{L}\d]+/u, "").trim()}</strong>`;
}

function renderCountdown() {
  const motto = $("heroMotto");
  if (!motto) return;
  let el = $("raceCountdown");
  if (!el) {
    el = document.createElement("p");
    el.id = "raceCountdown";
    el.className = "hero-countdown";
    motto.after(el);
  }
  const { days, name } = raceInfo();
  const wks = Math.round(days / 7), mon = Math.round(days / 30);
  el.textContent =
    days > 180 ? `🗓️ jouw grote doel: over ~${mon} maanden, ${name}` :
    days > 14 ? `🗓️ nog ${wks} weken tot je ${name}` :
    days > 1 ? `🗓️ nog ${days} dagen tot je ${name}` :
    days === 1 ? `🗓️ morgen is het zover: ${name}!` :
    days === 0 ? `🔥 vandaag is het zover: ${name}!` :
    `🎉 ${name} volbracht, chapeau!`;
}

function renderStats(stats) {
  animateCount($("statDone"), stats.done);
  animateCount($("statKm"), Math.round(stats.km * 10) / 10, " km");
  animateCount($("statStreak"), stats.streak);
  const cw = currentWeek();
  const wk = PLAN.find((w) => w.week === cw);
  const wkDone = wk.sessions.filter((s) => log[sid(cw, s.day)]?.done).length;
  $("statWeek").textContent = `${wkDone}/${wk.sessions.length}`;
}

function renderNextUp() {
  const cw = currentWeek();
  const next =
    flatSessions.find((s) => s.week >= cw && !log[sid(s.week, s.day)]?.done) ||
    flatSessions.find((s) => !log[sid(s.week, s.day)]?.done);
  const box = $("nextUp");
  if (!next) {
    box.innerHTML = `<div class="nextup-card done"><span class="nextup-eyebrow">🏅 Schema compleet</span><strong>Alles afgevinkt, chapeau, ${RUNNER}!</strong></div>`;
    return;
  }
  const z = zoneByKey[next.zone];
  box.innerHTML = `
    <button class="nextup-card zone-${next.zone}" data-week="${next.week}" data-day="${next.day}">
      <span class="nextup-eyebrow">Volgende training · week ${next.week} · ${next.dayLabel}</span>
      <strong>${next.title}</strong>
      <span class="nextup-meta">${nlNum(next[UNIT])} ${UNIT_LABEL} · ${z.name}</span>
      <span class="nextup-go">Openen ›</span>
    </button>`;
  box.querySelector(".nextup-card").addEventListener("click", () => openDetail(next.week, next.day));
}

const PLANNING_META = {
  race: {
    icon: "🏁", label: "Tussentijdse race",
    advice: "Laat deze race je lange training vervangen. Houd de training ervoor rustig en plan daarna minimaal één hersteldag.",
  },
  vacation: {
    icon: "🌴", label: "Vakantie",
    advice: "Gemiste trainingen hoef je niet in te halen. Pak bij thuiskomst de eerstvolgende rustige training op.",
  },
  rest: {
    icon: "🩹", label: "Rust / blessure",
    advice: "Herstel gaat voor het schema. Hervat pas pijnvrij en bouw de eerste week extra rustig op.",
  },
};

function formatPlanDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

function renderPlanning() {
  const list = $("planningList");
  if (!list) return;
  const entries = [...planningEntries()].sort((a, b) => a.start.localeCompare(b.start));
  if (!entries.length) {
    list.innerHTML = `<div class="planning-empty"><span>🗓️</span><p>Nog niets gepland. Voeg een vakantie of oefenwedstrijd toe zodra je die weet.</p></div>`;
    return;
  }
  list.innerHTML = entries.map((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    const period = entry.end && entry.end !== entry.start
      ? `${formatPlanDate(entry.start)} – ${formatPlanDate(entry.end)}`
      : formatPlanDate(entry.start);
    return `<article class="planning-item plan-${entry.type}">
      <span class="planning-icon">${meta.icon}</span>
      <div class="planning-copy">
        <span class="planning-type">${meta.label} · ${period}</span>
        <strong>${escapeHtml(entry.title)}</strong>
        ${entry.note ? `<p>${escapeHtml(entry.note)}</p>` : ""}
        <p class="planning-advice"><b>Coachadvies:</b> ${meta.advice}</p>
      </div>
      <button class="planning-remove" type="button" data-plan-id="${escapeHtml(entry.id)}" aria-label="${escapeHtml(entry.title)} verwijderen">×</button>
    </article>`;
  }).join("");
  list.querySelectorAll(".planning-remove").forEach((button) => {
    button.addEventListener("click", () => {
      log.__planning = planningEntries().filter((entry) => entry.id !== button.dataset.planId);
      saveLog();
      renderAll();
      toast("Uit je planning verwijderd");
    });
  });
}

function renderZones() {
  $("zonesList").innerHTML = ZONES.map((z) => `
    <div class="zone-row zone-${z.key}">
      <span class="zone-dot"></span>
      <div class="zone-main"><strong>${z.name}</strong><span>${z.info}</span></div>
      <span class="zone-pace">${z.pace}${ZONE_SUFFIX ? `<small>${ZONE_SUFFIX}</small>` : ""}</span>
    </div>`).join("");
}

function renderChart() {
  const cwBar = currentWeek();
  const max = Math.max(...PLAN.map((w) => w.sessions.reduce((n, s) => n + s[UNIT], 0)));
  $("volumeChart").innerHTML = PLAN.map((w) => {
    const planned = w.sessions.reduce((n, s) => n + s[UNIT], 0);
    const doneMin = w.sessions.reduce((n, s) => n + (log[sid(w.week, s.day)]?.done ? s[UNIT] : 0), 0);
    const h = Math.round((planned / max) * 100);
    const fill = planned ? Math.round((doneMin / planned) * 100) : 0;
    const cls = ((w.race || w.tuneup || w.finish) ? "is-race" : w.recovery ? "is-rest" : "") + (w.week === cwBar ? " is-now" : "");
    return `
      <div class="bar ${cls}" title="Week ${w.week}: ${nlNum(Math.round(planned * 10) / 10)} ${UNIT_LABEL} gepland">
        <div class="bar-track" style="height:${h}%">
          <div class="bar-fill" style="height:${fill}%"></div>
        </div>
        <span class="bar-x">${w.week}</span>
      </div>`;
  }).join("");
}

function tagOf(w) {
  if (w.finish) return `<span class="week-tag tag-race">Finale</span>`;
  if (w.race) return `<span class="week-tag tag-race">Raceweek</span>`;
  if (w.tuneup) return `<span class="week-tag tag-tuneup">${w.tuneupTag || "Wedstrijd"}</span>`;
  if (w.recovery) return `<span class="week-tag tag-rest">Herstel</span>`;
  if (w.taper) return `<span class="week-tag tag-taper">Taper</span>`;
  return "";
}

function renderWeeks() {
  const cw = currentWeek();
  const todayIso = isoDate(new Date());
  let html = "", lastPhase = "";
  PLAN.forEach((w, i) => {
    if (w.phase !== lastPhase) { html += `<h4 class="sub-phase reveal">${w.phase}</h4>`; lastPhase = w.phase; }
    const sess = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const z = zoneByKey[s.zone];
      const pace = fmtPace(paceSeconds(e.distance, e.time));
      const bits = [];
      if (e.distance) bits.push(`${e.distance} km`);
      if (pace) bits.push(pace);
      if (e.hr) bits.push(`${e.hr} bpm`);
      const logged = bits.length ? `<span class="session-logged">📊 ${bits.join(" · ")}</span>` : "";
      const lastDay = w.sessions[w.sessions.length - 1].day;
      const isRaceSession = (w.race || w.tuneup || w.finish) && s.day === lastDay;
      const isToday = isoDate(sessionDate(w.week, s.day)) === todayIso;
      const raceKicker = isRaceSession
        ? `<span class="session-race-kicker">${w.raceLabel || (w.race ? "🏅 Doelrace" : w.tuneup ? "🏁 Wedstrijd" : "🏁 Finale")}</span>`
        : "";
      const isFlexibleSlot = /^d\d+$/.test(s.day);
      const badgeLabel = isFlexibleSlot ? s.day.slice(1) : s.dayLabel.slice(0, 2);
      return `
        <button class="session zone-${s.zone} ${isRaceSession ? "is-race-session" : ""} ${e.done ? "is-done" : ""} ${isToday ? "is-today" : ""}" data-week="${w.week}" data-day="${s.day}">
          <span class="session-day ${isFlexibleSlot ? "is-slot" : ""}" title="${s.dayLabel}">${isRaceSession ? "<small>🏁</small>" : ""}${badgeLabel}</span>
          <span class="session-body">
            ${raceKicker}
            <span class="session-title">${s.title}${isToday ? ' <span class="today-badge">Vandaag</span>' : ""}</span>
            <span class="session-meta">${nlNum(s[UNIT])} ${UNIT_LABEL} · ${s.kind}</span>
            ${logged}
          </span>
          <span class="session-check">${e.done ? "✓" : ""}</span>
        </button>`;
    }).join("");
    const weekPlans = planningForWeek(w.week);
    const planStrip = weekPlans.length ? `<div class="week-planning">${weekPlans.map((entry) => {
      const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
      return `<span>${meta.icon} ${escapeHtml(entry.title)}</span>`;
    }).join("")}</div>` : "";
    html += `
      <article class="week-card reveal ${w.tuneup ? "is-tuneup-week" : ""} ${w.race ? "is-goal-race-week" : ""} ${w.week === cw ? "is-current" : ""} ${w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? "is-complete" : "is-missed") : ""}" style="--i:${i % 4}">
        <header class="week-head">
          <div><span class="week-no">Week ${w.week}</span><span class="week-dates">${weekDateLabel(w)}</span></div>
          ${w.week === cw ? `<span class="week-tag tag-now">Nu</span>` : w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? `<span class="week-tag tag-done">✓ af</span>` : `<span class="week-tag tag-missed">gemist</span>`) : tagOf(w)}
        </header>
        ${planStrip}
        <div class="session-list">${sess}</div>
      </article>`;
  });
  $("weeksList").innerHTML = html;
  $("weeksList").querySelectorAll(".session").forEach((b) =>
    b.addEventListener("click", () => openDetail(+b.dataset.week, b.dataset.day)));
  observeReveals();
}

function renderBadges(stats) {
  $("badgeGrid").innerHTML = BADGES.map((b) => {
    const got = b.test(stats);
    return `
      <div class="badge ${got ? "got" : "locked"}" title="${b.desc}">
        <span class="badge-icon">${got ? b.icon : "🔒"}</span>
        <strong>${b.name}</strong>
        <span class="badge-desc">${b.desc}</span>
      </div>`;
  }).join("");
}

function renderInfo() {
  $("infoList").innerHTML = INFO.map((c, i) => `
    <article class="info-card reveal" style="--i:${i}">
      <span class="info-icon">${c.icon}</span>
      <h4>${c.title}</h4>
      <ul>${c.items.map((t) => `<li>${t}</li>`).join("")}</ul>
    </article>`).join("");
}

function addJumpButton() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head || document.getElementById("jumpNow")) return;
  const btn = document.createElement("button");
  btn.id = "jumpNow";
  btn.type = "button";
  btn.className = "jump-now";
  btn.textContent = "Naar deze week ↓";
  btn.addEventListener("click", () =>
    document.querySelector(".week-card.is-current")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  head.insertAdjacentElement("afterend", btn);
}

/* ----- Extra's: begroeting, records, consistentie ------------------- */
function greetingWord() {
  const h = new Date().getHours();
  return h < 6 ? "Goedenacht" : h < 12 ? "Goedemorgen" : h < 18 ? "Goedemiddag" : "Goedenavond";
}
function renderGreeting() {
  const copy = document.querySelector(".hero-copy");
  if (!copy) return;
  let el = document.getElementById("heroGreeting");
  if (!el) {
    el = document.createElement("p");
    el.id = "heroGreeting";
    el.className = "hero-greeting";
    copy.insertBefore(el, copy.firstChild);
  }
  el.textContent = `${greetingWord()}, ${RUNNER.split(" ")[0]} 👋`;
}
function renderRecords(stats) {
  const anchor = document.querySelector(".weeks");
  if (!anchor) return;
  let sec = document.getElementById("recordsPanel");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "recordsPanel";
    sec.className = "panel reveal";
    anchor.parentNode.insertBefore(sec, anchor);
  }
  const pace = fmtPace(stats.bestPace);
  const longest = UNIT === "min"
    ? (stats.maxTime ? `${Math.round(stats.maxTime / 60)} min` : "–")
    : (stats.maxDist ? `${nlNum(stats.maxDist)} km` : "–");
  const totaalMin = stats.secs ? `${Math.round(stats.secs / 60)} min` : "–";
  const rows = UNIT === "min"
    ? [
        stats.bestPace ? ["⚡ Snelste tempo", pace] : ["✅ Trainingen gedaan", String(stats.done)],
        ["⏱️ Langste loop", longest],
        ["📊 Totaal gelopen", totaalMin],
        ["🔥 Langste reeks", String(stats.streak)],
      ]
    : [
        ["⚡ Snelste tempo", pace || "–"],
        ["🏔️ Verste loop", longest],
        ["📊 Totaal gelopen", `${nlNum(Math.round(stats.km * 10) / 10)} km`],
        ["🔥 Langste reeks", String(stats.streak)],
      ];
  sec.innerHTML = `<h3 class="panel-head">Jouw records</h3>
    <div class="records">${rows.map(([l, v]) =>
      `<div class="record"><span class="record-val">${v}</span><span class="record-label">${l}</span></div>`).join("")}</div>`;
}
function renderConsistency() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;
  let sec = document.getElementById("consistencyStrip");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "consistencyStrip";
    sec.className = "panel consistency-panel reveal";
    grid.parentNode.insertBefore(sec, grid.nextSibling);
  }
  const todayIso = isoDate(new Date());
  const cw = currentWeek();
  let done = 0, total = 0;
  const cols = PLAN.map((w) => {
    const cells = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const dIso = isoDate(sessionDate(w.week, s.day));
      total++;
      if (e.done) done++;
      const cls = e.done ? "is-done" : dIso < todayIso ? "is-missed" : "is-todo";
      return `<span class="ccell ${cls}${dIso === todayIso ? " is-today" : ""}" title="Week ${w.week} \u00b7 ${s.dayLabel}"></span>`;
    }).join("");
    return `<div class="cweek${w.week === cw ? " is-current" : ""}"><div class="ccells">${cells}</div><span class="cweek-no">${w.week}</span></div>`;
  }).join("");
  const pct = total ? Math.round((done / total) * 100) : 0;
  sec.innerHTML = `
    <h3 class="panel-head">Consistentie <span class="panel-sub">elk blokje is een training</span></h3>
    <div class="cweeks">${cols}</div>
    <div class="cons-foot">
      <div class="cons-legend"><span><i class="ck ck-done"></i>afgerond</span><span><i class="ck ck-missed"></i>gemist</span><span><i class="ck ck-todo"></i>komt nog</span></div>
      <span class="cons-score"><strong>${done}/${total}</strong> gedaan \u00b7 ${pct}%</span>
    </div>`;
}

/* ----- Schema opschuiven (drukke week) ------------------------------ */
const NL_MND = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
function weekOffset() { return (log && log.__weekOffset) || 0; }
function schedStartMs() { return START_DATE.getTime() + weekOffset() * 7 * 864e5; }
function weekDateLabel(w) {
  if (!weekOffset()) return w.dates;
  const mon = dateAtDay((w.week - 1) * 7), sun = dateAtDay((w.week - 1) * 7 + 6);
  return `${mon.getDate()} ${NL_MND[mon.getMonth()]}–${sun.getDate()} ${NL_MND[sun.getMonth()]}`;
}
function renderShiftControl() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head) return;
  let el = document.getElementById("shiftControl");
  if (!el) {
    el = document.createElement("div");
    el.id = "shiftControl";
    el.className = "shift-control reveal";
    head.insertAdjacentElement("afterend", el);
  }
  const off = weekOffset();
  const wk = (n) => `${n} week${n > 1 ? "en" : ""}`;
  el.innerHTML = off > 0
    ? `<div class="shift-copy"><strong>Schema ${wk(off)} opgeschoven</strong><span>Je hele schema loopt nu ${wk(off)} langer. Niks staat op gemist.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Nog een week</button><button id="shiftReset" type="button" class="ghost">Ongedaan maken</button></div>`
    : `<div class="shift-copy"><strong>Drukke week gehad?</strong><span>Schuif je hele schema een week op, dan raak je niks kwijt.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Schuif 1 week op ↦</button></div>`;
  el.querySelector("#shiftMore").addEventListener("click", () => {
    if (!confirm("Je hele schema een week opschuiven?\n\nAlle trainingen schuiven mee. Je kunt dit altijd terugzetten.")) return;
    log.__weekOffset = weekOffset() + 1; saveLog(); renderAll();
    toast("Schema een week opgeschoven 📅");
  });
  const rs = el.querySelector("#shiftReset");
  if (rs) rs.addEventListener("click", () => {
    log.__weekOffset = 0; saveLog(); renderAll();
    toast("Opschuiven ongedaan gemaakt");
  });

  /* Duidelijke melding bovenaan: een per ongeluk verschoven schema moet je
     meteen zien, niet pas als je ver naar beneden scrollt. */
  const hero = document.querySelector(".hero");
  let notice = document.getElementById("shiftNotice");
  if (off > 0 && hero) {
    if (!notice) {
      notice = document.createElement("div");
      notice.id = "shiftNotice";
      notice.className = "shift-notice";
      hero.insertAdjacentElement("afterend", notice);
    }
    notice.innerHTML = `<div class="shift-copy"><strong>\u{1F4C5} Je schema staat ${wk(off)} opgeschoven</strong><span>Daardoor sta je ${wk(off)} eerder in je schema dan de kalender. Klopt dat niet? Zet het gewoon terug.</span></div><div class="shift-btns"><button id="noticeReset" type="button">Zet terug</button></div>`;
    notice.querySelector("#noticeReset").addEventListener("click", () => {
      log.__weekOffset = 0; saveLog(); renderAll();
      toast("Schema teruggezet \u{1F4C5}");
    });
  } else if (notice) {
    notice.remove();
  }
}

function renderAll() {
  const stats = computeStats();
  renderHero(stats);
  renderStats(stats);
  renderGreeting();
  renderConsistency();
  renderNextUp();
  renderPlanning();
  renderChart();
  renderZones();
  renderWeeks();
  addJumpButton();
  renderShiftControl();
  renderBadges(stats);
  renderRecords(stats);
  renderInfo();
  observeReveals();
}

/* ----- Detailweergave ------------------------------------------------ */
function openDetail(week, day) {
  const w = PLAN.find((x) => x.week === week);
  const s = w.sessions.find((x) => x.day === day);
  /* Alleen de wedstrijd zelf is een wedstrijd, niet de andere trainingen in die week. */
  const isRaceDetail = (w.race || w.tuneup || w.finish) && s.day === w.sessions[w.sessions.length - 1].day;
  const id = sid(week, day);
  const e = log[id] || {};
  const z = zoneByKey[s.zone];
  const enteredTime = durationParts(e.time);

  $("detailTitle").textContent = `Week ${week} · ${s.dayLabel}`;
  $("detailBody").innerHTML = `
    <div class="detail-hero zone-${s.zone}">
      <span class="detail-kind">${s.kind} · ${nlNum(s[UNIT])} ${UNIT_LABEL}</span>
      <h2>${s.title}</h2>
      <p class="detail-goal">${s.goal}</p>
      <span class="detail-zone">${z.name} · ${z.info}</span>
    </div>

    <div class="coach-bubble">
      <div class="coach-ava">
        <img src="${CONFIG.coachPhoto}" alt="${CONFIG.coachName}" onerror="this.style.display='none'">
        <span>${COACH_INITIAL}</span>
      </div>
      <div class="coach-text">
        <strong>${CONFIG.coachName} <span class="coach-handle">${CONFIG.coachHandle}</span></strong>
        <p>${coachLine(s.zone)}</p>
      </div>
    </div>

    <section class="detail-block why">
      <h4>${isRaceDetail ? (w.finish ? "Waarom deze mijlpaal" : "Waarom deze wedstrijd") : "Waarom deze training"}</h4>
      <p>${s.why || WHY[s.zone] || ""}</p>
    </section>

    <section class="detail-block">
      <h4>Opbouw</h4>
      <ol class="block-list">${s.blocks.map((b) => `<li>${b}</li>`).join("")}</ol>
    </section>

    <section class="detail-block">
      <h4>${isRaceDetail ? (w.finish ? "Invullen na je mijlpaal" : "Invullen na de wedstrijd") : "Invullen na de training"}</h4>
      <div class="form-grid">
        <label>Afstand (km)
          <input id="fDistance" type="text" inputmode="decimal" placeholder="bv. 6,2" value="${escapeHtml(e.distance ?? "")}">
        </label>
        <label>Tijd
          <span class="duration-input">
            <input id="fTimeMinutes" type="number" inputmode="numeric" min="0" max="999" placeholder="36" value="${enteredTime.minutes || ""}" aria-label="Minuten">
            <span>min</span>
            <input id="fTimeSeconds" type="number" inputmode="numeric" min="0" max="59" placeholder="30" value="${enteredTime.seconds || ""}" aria-label="Seconden">
            <span>sec</span>
          </span>
        </label>
        <label class="full">Gemiddeld tempo
          <output id="fPace" class="pace-out">${fmtPace(paceSeconds(e.distance, e.time)) || "–"}</output>
        </label>
        <label>Hartslag (bpm)
          <input id="fHr" type="number" inputmode="numeric" placeholder="bv. 152" value="${escapeHtml(e.hr ?? "")}">
        </label>
        <label>Gevoel / zwaarte
          <select id="fFeel">
            ${["", "1 · heel licht", "2 · licht", "3 · prima", "4 · pittig", "5 · zwaar"]
              .map((o) => `<option value="${o}" ${String(e.feel ?? "") === o ? "selected" : ""}>${o || "Kies…"}</option>`).join("")}
          </select>
        </label>
        <label class="full">Notitie
          <textarea id="fNote" rows="2" placeholder="Hoe ging het?">${escapeHtml(e.note ?? "")}</textarea>
        </label>
      </div>
    </section>

    <div class="detail-actions">
      <button id="toggleDone" class="btn-primary ${e.done ? "is-done" : ""}">${e.done ? "✓ Gedaan" : "Markeer als gedaan"}</button>
      <button id="saveSession" class="btn-ghost">Opslaan</button>
    </div>`;

  const readTime = () => {
    if (!$("fTimeMinutes").value && !$("fTimeSeconds").value) return "";
    return durationValue($("fTimeMinutes").value, $("fTimeSeconds").value);
  };
  const recalc = () => ($("fPace").textContent = fmtPace(paceSeconds($("fDistance").value, readTime())) || "–");
  $("fDistance").addEventListener("input", recalc);
  $("fTimeMinutes").addEventListener("input", recalc);
  $("fTimeSeconds").addEventListener("input", () => {
    if (+$("fTimeSeconds").value > 59) $("fTimeSeconds").value = "59";
    recalc();
  });

  const collect = () => ({
    ...log[id],
    distance: $("fDistance").value.trim(),
    time: readTime(),
    hr: $("fHr").value.trim(),
    feel: $("fFeel").value,
    note: $("fNote").value.trim(),
  });

  $("saveSession").addEventListener("click", () => {
    log[id] = collect(); saveLog();
    toast("Opgeslagen 💾");
    closeDetail();
  });
  $("toggleDone").addEventListener("click", () => {
    const cur = collect();
    cur.done = !cur.done;
    log[id] = cur; saveLog();
    if (cur.done) {
      celebrate();
      toast(!isRaceDetail
        ? DONE[Math.floor(Math.random() * DONE.length)]
        : "🎉 10 km uitgelopen! Wat een strijder, Lotte!");
    }
    closeDetail();
  });

  showView("detail");
}

function closeDetail() { renderAll(); showView("list"); }

function showView(name) {
  const list = $("listView"), detail = $("detailView"), back = $("backButton");
  if (name === "detail") {
    list.classList.add("hidden");
    detail.classList.remove("hidden");
    requestAnimationFrame(() => detail.classList.add("is-in"));
    back.classList.remove("hidden");
    window.scrollTo(0, 0);
  } else {
    detail.classList.remove("is-in");
    back.classList.add("hidden");
    setTimeout(() => {
      detail.classList.add("hidden");
      list.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 280);
  }
}

/* ----- Invliegende beelden -------------------------------------------- */
let io, initialRevealDone = false;
function observeReveals() {
  // Na de eerste keer: nieuw getekende blokken meteen tonen (geen her-animatie bij navigeren)
  if (initialRevealDone) {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    return;
  }
  io = io || new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
}

/* ----- Toast ----------------------------------------------------------- */
let toastT;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----- Confetti --------------------------------------------------------- */
function celebrate() {
  const cv = $("confetti");
  const ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const cs = getComputedStyle(document.documentElement);
  const colors = ["--volt", "--flame", "--pastel-blue", "--violet"]
    .map((v) => cs.getPropertyValue(v).trim()).filter(Boolean).concat("#ffffff");
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 14, vy: Math.random() * -16 - 4,
    s: Math.random() * 7 + 4, c: colors[(Math.random() * colors.length) | 0],
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
  }));
  let frame = 0;
  (function loop() {
    frame++;
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach((p) => {
      p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    });
    if (frame < 120) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ================================================================== *
 *  Init
 * ================================================================== */
/* Branding uit CONFIG zetten (zodat templaten makkelijk is) */
document.title = `${CONFIG.appName}, ${CONFIG.coachHandle}`;
if ($("appName")) $("appName").textContent = CONFIG.appName;
if ($("brandHandle")) $("brandHandle").textContent = CONFIG.coachHandle;
if ($("footCredit")) {
  $("footCredit").innerHTML =
    `<span class="catch">${CONFIG.catchphrase}</span>` +
    `Coaching door ${CONFIG.coachName} · TikTok <strong>${CONFIG.coachHandle}</strong> ${CONFIG.footEmoji || "🏃\u200d♀️"}`;
}

function setPlanningForm(open) {
  const form = $("planningForm");
  const toggle = $("togglePlanningForm");
  form.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "× Sluiten" : "＋ Toevoegen";
  if (open && !$("planStart").value) $("planStart").value = isoDate(new Date());
}

$("togglePlanningForm").addEventListener("click", () => {
  setPlanningForm($("planningForm").classList.contains("hidden"));
});
$("cancelPlanning").addEventListener("click", () => setPlanningForm(false));
$("planningForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const start = $("planStart").value;
  const end = $("planEnd").value || start;
  if (end < start) {
    toast("De einddatum ligt vóór de startdatum");
    return;
  }
  const entry = {
    id: `plan-${Date.now()}`,
    type: $("planType").value,
    title: $("planTitle").value.trim(),
    start,
    end,
    note: $("planNote").value.trim(),
  };
  log.__planning = [...planningEntries(), entry];
  saveLog();
  $("planningForm").reset();
  setPlanningForm(false);
  renderAll();
  toast("Toegevoegd aan je schema 🗓️");
});

$("backButton").addEventListener("click", closeDetail);
$("resetButton").addEventListener("click", () => {
  if (confirm("Alle ingevulde voortgang wissen?")) { log = {}; saveLog(); renderAll(); toast("Voortgang gewist"); }
});

/* ----- Back-up: exporteren / importeren ------------------------------- */
function downloadJSON(filename, obj) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function downloadText(filename, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function icsEscape(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll(/\r?\n/g, "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function icsDay(value) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : value;
  return isoDate(date).replaceAll("-", "");
}

function addDays(value, amount) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
}

function calendarFile() {
  const stamp = new Date().toISOString().replaceAll(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//bartlopen//Run Coach//NL",
    `X-WR-CALNAME:${icsEscape(CONFIG.appName)} · ${icsEscape(RUNNER)}`,
  ];
  flatSessions.forEach((session) => {
    const date = sessionDate(session.week, session.day);
    const z = zoneByKey[session.zone];
    lines.push(
      "BEGIN:VEVENT",
      `UID:${sid(session.week, session.day)}-${icsDay(date)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(date)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(date, 1))}`,
      `SUMMARY:${icsEscape(`${CONFIG.footEmoji || "🏃\u200d♀️"} ${session.title}`)}`,
      `DESCRIPTION:${icsEscape(`${nlNum(session[UNIT])} ${UNIT_LABEL} · ${z.name}\n${session.goal}\n\n${session.blocks.join("\n")}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  planningEntries().forEach((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsEscape(entry.id)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(entry.start)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(entry.end || entry.start, 1))}`,
      `SUMMARY:${icsEscape(`${meta.icon} ${entry.title}`)}`,
      `DESCRIPTION:${icsEscape(`${entry.note ? `${entry.note}\n\n` : ""}Coachadvies: ${meta.advice}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
$("exportBtn").addEventListener("click", () => {
  downloadJSON(`${CONFIG.appName.replace(/\s+/g, "-")}-voortgang.json`, {
    app: "bartlopen-runcoach", storeKey: STORE_KEY, runner: RUNNER,
    exportedAt: new Date().toISOString(), log,
  });
  toast("Back-up opgeslagen ⬇︎");
});
$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const incoming = data && data.log ? data.log : data;
      if (!incoming || typeof incoming !== "object") throw new Error("ongeldig");
      log = { ...log, ...incoming };
      saveLog(); renderAll();
      toast("Back-up geladen ⬆︎, welkom terug!");
    } catch {
      toast("Kon dit bestand niet lezen");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

$("calendarBtn").addEventListener("click", () => {
  downloadText(`${CONFIG.appName.replace(/\s+/g, "-")}-schema.ics`, calendarFile(), "text/calendar;charset=utf-8");
  toast("Agenda-bestand staat klaar 🗓️");
});

$("pdfBtn").addEventListener("click", () => {
  document.body.classList.add("print-schema");
  const cleanup = () => document.body.classList.remove("print-schema");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  setTimeout(cleanup, 1500);
});

/* Alles tekenen */
renderAll();
renderLaatstOpgeslagen();
herstelUitBackup();
/* Na de intro-animatie geen her-fade meer; failsafe die alles zeker toont */
setTimeout(() => { initialRevealDone = true; }, 900);
setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in")), 1600);

/* Intro-splash netjes weg laten faden (tikken slaat 'm over) */
(function () {
  const splash = $("splash");
  if (!splash) return;
  const hide = () => splash.classList.add("gone");
  setTimeout(hide, 1100);
  splash.addEventListener("click", hide);
  setTimeout(() => splash.remove(), 1700);
})();

/* Service worker voor offline gebruik (alleen op http/https, niet via file://) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  /* Auto-verversen: nieuwe versie neemt over -> pagina herlaadt zichzelf een keer */
  const hadController = !!navigator.serviceWorker.controller;
  let autoReloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || autoReloaded) return;
    autoReloaded = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

/* Vraag de browser om je voortgang echt te bewaren. Zonder dit mag een
   browser opgeslagen gegevens opruimen als er ruimte nodig is, en dan ben
   je je afgevinkte trainingen kwijt. */
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persisted()
    .then((al) => (al ? true : navigator.storage.persist()))
    .catch(() => {});
}
