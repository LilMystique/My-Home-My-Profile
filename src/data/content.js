// All editable content lives here. Every PLACEHOLDER comment needs a real value before launch.

export const CONTACT = {
  company: "Capricon Technologies, Tanzania",
  whatsapp: "255734390606", // international format, no plus sign; used only for chat links
  email: "capriconempire@gmail.com",
  location: { en: "Tanzania", sw: "Tanzania" }, // PLACEHOLDER: add office city
  bookingUrl: "", // optional: Calendly or Google Calendar link; hidden when empty
  social: [{ label: "Instagram", href: "https://www.instagram.com/capriconmarketing_/" }],
};

// 1 USD in TZS. PLACEHOLDER rate used only by the TZS/USD price toggle.
export const USD_RATE = 2600;

export const UI = {
  nav: {
    work: { en: "Work", sw: "Kazi zetu" },
    services: { en: "Services", sw: "Huduma" },
    process: { en: "Process", sw: "Mchakato" },
    team: { en: "Team", sw: "Timu" },
    engage: { en: "Work with us", sw: "Fanya kazi nasi" },
    cta: { en: "Start a project", sw: "Anza mradi" },
    menu: { en: "Menu", sw: "Menyu" },
    close: { en: "Close", sw: "Funga" },
    theme: { en: "Switch light or dark", sw: "Badilisha mwangaza au giza" },
  },
  marquee: [
    { en: "Business systems", sw: "Mifumo ya biashara" },
    { en: "SaaS products", sw: "Bidhaa za SaaS" },
    { en: "Websites and e-commerce", sw: "Tovuti na biashara mtandaoni" },
    { en: "Digital strategy", sw: "Mkakati wa kidijitali" },
    { en: "Built in Tanzania", sw: "Imejengwa Tanzania" },
    { en: "Mobile money ready", sw: "Tayari kwa malipo ya simu" },
    { en: "Swahili and English", sw: "Kiswahili na Kiingereza" },
  ],
  hero: {
    eyebrow: { en: "Capricon Technologies, Tanzania", sw: "Capricon Technologies, Tanzania" },
    title: {
      en: "Software built in Tanzania, for how Tanzania actually does business.",
      sw: "Programu zilizojengwa Tanzania, kwa jinsi biashara za Tanzania zinavyofanya kazi kweli.",
    },
    sub: {
      en: "We design and build business systems, SaaS products and websites for Tanzanian and East African companies. Mobile money, Swahili and local workflows are built in from day one.",
      sw: "Tunabuni na kujenga mifumo ya biashara, bidhaa za SaaS na tovuti kwa kampuni za Tanzania na Afrika Mashariki. Malipo ya simu, Kiswahili na mtiririko wa kazi wa hapa vimejumuishwa tangu siku ya kwanza.",
    },
    // Three loud words, one per line.
    words: {
      en: ["Build.", "Ship.", "Scale."],
      sw: ["Jenga.", "Tuma.", "Kua."],
    },
    tags: [
      { en: "Systems", sw: "Mifumo" },
      { en: "SaaS", sw: "SaaS" },
      { en: "Websites", sw: "Tovuti" },
    ],
    lead: {
      en: "Business systems, SaaS and websites for Tanzanian and East African companies. Mobile money and Swahili built in from day one.",
      sw: "Mifumo ya biashara, SaaS na tovuti kwa kampuni za Tanzania na Afrika Mashariki. Malipo ya simu na Kiswahili tangu siku ya kwanza.",
    },
    primary: { en: "Start a project", sw: "Anza mradi" },
    secondary: { en: "See our work", sw: "Tazama kazi zetu" },
    buildFor: { en: "We build for", sw: "Tunajenga kwa" },
    // Each one is work we have actually done or are doing.
    audiences: [
      { en: "car importers.", sw: "waagizaji wa magari." },
      { en: "shop owners.", sw: "wenye maduka." },
      { en: "event organisers.", sw: "waandaaji wa matukio." },
      { en: "WiFi hotspot owners.", sw: "wamiliki wa hotspot za WiFi." },
      { en: "clearing and forwarding firms.", sw: "kampuni za kusafirisha mizigo." },
    ],
    // PLACEHOLDER numbers: replace with real, checkable figures
    stats: [
      { v: "6", l: { en: "Products and systems", sw: "Bidhaa na mifumo" } },
      { v: "4", l: { en: "Core services", sw: "Huduma kuu" } },
    ],
  },
  work: {
    title: { en: "Work Done", sw: "Kazi Zilizofanyika" },
    sub: {
      en: "Systems and products we have built for Tanzanian businesses.",
      sw: "Mifumo na bidhaa tulizojenga kwa biashara za Tanzania.",
    },
    filters: {
      all: { en: "All", sw: "Zote" },
      systems: { en: "Business systems", sw: "Mifumo ya biashara" },
      saas: { en: "SaaS", sw: "SaaS" },
      websites: { en: "Websites", sw: "Tovuti" },
    },
    view: { en: "View case study", sw: "Soma kisa kamili" },
    visit: { en: "Visit site", sw: "Tembelea tovuti" },
    building: { en: "Currently building", sw: "Tunayojenga sasa" },
    clients: { en: "Companies we have worked with", sw: "Kampuni tulizofanya nazo kazi" },
    shotNote: { en: "Screenshot to add", sw: "Picha itaongezwa" },
    prev: { en: "Previous", sw: "Iliyotangulia" },
    next: { en: "Next", sw: "Inayofuata" },
  },
  case: {
    back: { en: "All work", sw: "Kazi zote" },
    problem: { en: "The problem", sw: "Tatizo" },
    built: { en: "What we built", sw: "Tulichojenga" },
    result: { en: "Result", sw: "Matokeo" },
    stack: { en: "Built with", sw: "Teknolojia" },
    status: { en: "Status", sw: "Hali" },
    type: { en: "Type", sw: "Aina" },
    ctaTitle: { en: "Need something like this?", sw: "Unahitaji kitu kama hiki?" },
    ctaBtn: { en: "Talk to us about it", sw: "Zungumza nasi kuhusu hili" },
    notFound: { en: "That project was not found.", sw: "Mradi huo haukupatikana." },
  },
  services: {
    title: { en: "What we do", sw: "Tunachofanya" },
    forLabel: { en: "Who it is for", sw: "Kwa nani" },
    getLabel: { en: "What you get", sw: "Unachopata" },
    items: [
      {
        name: { en: "Custom business systems", sw: "Mifumo maalum ya biashara" },
        for: {
          en: "Importers, logistics firms and retailers running on spreadsheets and chat groups.",
          sw: "Waagizaji, kampuni za usafirishaji na wauzaji wanaotumia Excel na vikundi vya gumzo.",
        },
        get: {
          en: "A system that matches how your team already works, with roles, reports and mobile money payments.",
          sw: "Mfumo unaoendana na jinsi timu yako inavyofanya kazi, wenye majukumu, ripoti na malipo ya simu.",
        },
      },
      {
        name: { en: "SaaS products", sw: "Bidhaa za SaaS" },
        for: {
          en: "Founders and companies with a product idea for the East African market.",
          sw: "Waanzilishi na kampuni zenye wazo la bidhaa kwa soko la Afrika Mashariki.",
        },
        get: {
          en: "A multi-tenant product built, launched and supported, from first pilot to paying customers.",
          sw: "Bidhaa inayohudumia wateja wengi, iliyojengwa, kuzinduliwa na kusaidiwa, kuanzia majaribio hadi wateja wanaolipa.",
        },
      },
      {
        name: { en: "Websites and e-commerce", sw: "Tovuti na biashara mtandaoni" },
        for: {
          en: "Businesses that need a fast site that turns visitors into WhatsApp enquiries and orders.",
          sw: "Biashara zinazohitaji tovuti ya haraka inayogeuza wageni kuwa maulizo na oda za WhatsApp.",
        },
        get: {
          en: "A lightweight bilingual site with search basics and a simple way to take enquiries or orders.",
          sw: "Tovuti nyepesi ya lugha mbili, misingi ya SEO na njia rahisi ya kupokea maulizo au oda.",
        },
      },
      {
        name: { en: "Digital strategy", sw: "Mkakati wa kidijitali" },
        for: {
          en: "Teams unsure what to build first, or how to sell it.",
          sw: "Timu zisizojua nini cha kujenga kwanza, au jinsi ya kukiuza.",
        },
        get: {
          en: "A clear plan: what to build, in what order, how to price it and how to reach customers.",
          sw: "Mpango wazi: nini cha kujenga, kwa mpangilio gani, bei na jinsi ya kuwafikia wateja.",
        },
      },
    ],
  },
  process: {
    title: { en: "How a project runs", sw: "Jinsi mradi unavyoendeshwa" },
    steps: [
      {
        name: { en: "Discovery", sw: "Ugunduzi" },
        text: {
          en: "We map how you work today and agree what success looks like.",
          sw: "Tunaelewa jinsi unavyofanya kazi leo na kukubaliana mafanikio yanamaanisha nini.",
        },
      },
      {
        name: { en: "Pilot", sw: "Majaribio" },
        text: {
          en: "A small working version with a few real users, so decisions rest on evidence.",
          sw: "Toleo dogo linalofanya kazi na watumiaji wachache halisi, ili maamuzi yawe na ushahidi.",
        },
      },
      {
        name: { en: "Launch", sw: "Uzinduzi" },
        text: {
          en: "Roll out, train your team, connect payments and go live.",
          sw: "Kusambaza, kufundisha timu yako, kuunganisha malipo na kuanza rasmi.",
        },
      },
      {
        name: { en: "Support", sw: "Msaada" },
        text: {
          en: "Fixes, updates and new features after launch, on a retainer or as needed.",
          sw: "Marekebisho, masasisho na vipengele vipya baada ya uzinduzi, kwa mkataba wa kila mwezi au inapohitajika.",
        },
      },
    ],
  },
  team: {
    title: { en: "The team", sw: "Timu" },
    sub: {
      en: "A small team that builds, ships and stays on the call after launch.",
      sw: "Timu ndogo inayojenga, kuzindua na kubaki nawe baada ya uzinduzi.",
    },
    placeholder: { en: "Placeholder", sw: "Mfano" },
  },
  engage: {
    title: { en: "Work with us", sw: "Fanya kazi nasi" },
    sub: {
      en: "Three simple ways to start. Pricing is shared after you send an inquiry, based on your project.",
      sw: "Njia tatu rahisi za kuanza. Bei hutolewa baada ya kutuma ombi, kulingana na mradi wako.",
    },
    priceNote: { en: "Price shared after your inquiry", sw: "Bei hutolewa baada ya ombi lako" },
    inquire: { en: "Send an inquiry", sw: "Tuma ombi" },
    from: { en: "From", sw: "Kuanzia" },
    perMonth: { en: "per month", sw: "kwa mwezi" },
    discuss: { en: "Let's discuss", sw: "Tuzungumze" },
    cards: [
      {
        name: { en: "Fixed project", sw: "Mradi wa bei maalum" },
        text: {
          en: "Defined scope, fixed price and a clear delivery date.",
          sw: "Kazi iliyoainishwa, bei maalum na tarehe wazi ya kukabidhi.",
        },
        price: 2500000, // PLACEHOLDER (TZS)
        monthly: false,
      },
      {
        name: { en: "Retainer", sw: "Mkataba wa kila mwezi" },
        text: {
          en: "Monthly hours for improvements, fixes and support.",
          sw: "Saa za kila mwezi kwa maboresho, marekebisho na msaada.",
        },
        price: 800000, // PLACEHOLDER (TZS)
        monthly: true,
      },
      {
        name: { en: "Product partnership", sw: "Ubia wa bidhaa" },
        text: {
          en: "We build and run a product with you, with shared upside.",
          sw: "Tunajenga na kuendesha bidhaa pamoja nawe, tukigawana faida.",
        },
        price: null,
        monthly: false,
      },
    ],
  },
  contact: {
    title: { en: "Let's talk.", sw: "Tuzungumze." },
    sub: {
      en: "Tell us what you need. We reply on WhatsApp or by phone.",
      sw: "Tuambie unachohitaji. Tunajibu kupitia WhatsApp au simu.",
    },
    whatsapp: { en: "Chat on WhatsApp", sw: "Ongea nasi WhatsApp" },
    book: { en: "Book a call", sw: "Panga simu" },
    name: { en: "Name", sw: "Jina" },
    phone: { en: "Phone or WhatsApp", sw: "Simu au WhatsApp" },
    need: { en: "What do you need?", sw: "Unahitaji nini?" },
    budget: { en: "Budget range (optional)", sw: "Bajeti (si lazima)" },
    message: { en: "Anything else (optional)", sw: "Maelezo zaidi (si lazima)" },
    send: { en: "Send", sw: "Tuma" },
    sending: { en: "Sending", sw: "Inatuma" },
    required: { en: "Required", sw: "Lazima" },
    badPhone: { en: "Enter a valid phone number", sw: "Weka namba sahihi ya simu" },
    wait: { en: "Please wait a minute before sending again.", sw: "Tafadhali subiri dakika moja kabla ya kutuma tena." },
    fail: { en: "Could not send. Use the WhatsApp button instead.", sw: "Imeshindikana kutuma. Tumia kitufe cha WhatsApp." },
    thanks: {
      en: "Thanks. We have your details and will contact you on the number you gave.",
      sw: "Asante. Tumepokea taarifa zako na tutakupigia kwa namba uliyotoa.",
    },
    needs: [
      { v: "systems", l: { en: "A business system", sw: "Mfumo wa biashara" } },
      { v: "saas", l: { en: "A SaaS product", sw: "Bidhaa ya SaaS" } },
      { v: "website", l: { en: "A website or shop", sw: "Tovuti au duka mtandaoni" } },
      { v: "strategy", l: { en: "Digital strategy", sw: "Mkakati wa kidijitali" } },
      { v: "unsure", l: { en: "Not sure yet", sw: "Sijui bado" } },
    ],
    budgets: [
      { v: "lt2m", l: { en: "Under TZS 2M", sw: "Chini ya TZS 2M" } },
      { v: "2-5m", l: { en: "TZS 2M to 5M", sw: "TZS 2M hadi 5M" } },
      { v: "5-15m", l: { en: "TZS 5M to 15M", sw: "TZS 5M hadi 15M" } },
      { v: "gt15m", l: { en: "Over TZS 15M", sw: "Zaidi ya TZS 15M" } },
      { v: "unsure", l: { en: "Not sure yet", sw: "Sijui bado" } },
    ],
    waGreeting: {
      en: "Hi Capricon, I'm interested in ",
      sw: "Habari Capricon, ninavutiwa na ",
    },
    waDefault: { en: "a project.", sw: "mradi." },
  },
  footer: {
    tagline: {
      en: "Software for East African business, built in Tanzania.",
      sw: "Programu za biashara za Afrika Mashariki, zilizojengwa Tanzania.",
    },
    callTitle: { en: "Prefer a call?", sw: "Unapendelea kupigiwa simu?" },
    callText: { en: "Leave your number and we call you back.", sw: "Acha namba yako, tutakupigia." },
    callPlaceholder: { en: "Your phone number", sw: "Namba yako ya simu" },
    callBtn: { en: "Call me", sw: "Nipigie" },
    callSending: { en: "Sending", sw: "Inatuma" },
    callDone: { en: "Thanks. We will call you.", sw: "Asante. Tutakupigia." },
    links: { en: "Quick links", sw: "Viungo" },
    ourWork: { en: "Our work", sw: "Kazi zetu" },
    contact: { en: "Contact", sw: "Mawasiliano" },
    payLabel: { en: "Payments we build for", sw: "Malipo tunayojenga" },
    rights: { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." },
  },
  wa: { en: "WhatsApp", sw: "WhatsApp" },
};

// Confirm each project is public and the client agrees before launch.
// Add a screenshot at public/work/<slug>.webp and set image to "/work/<slug>.webp".
export const PROJECTS = [
  {
    slug: "darcity",
    name: "DarCity",
    category: "saas",
    status: { en: "Demo", sw: "Onyesho" },
    line: {
      en: "Fan app for a basketball team: tickets, schedule, predictions and a shop.",
      sw: "Programu ya mashabiki wa timu ya mpira wa kikapu: tiketi, ratiba, utabiri na duka.",
    },
    problem: {
      en: "Fans find fixtures, tickets and team news in different places, and teams miss a direct line to their supporters.",
      sw: "Mashabiki hupata ratiba, tiketi na habari za timu sehemu tofauti, na timu hukosa mawasiliano ya moja kwa moja na wafuasi wao.",
    },
    built: {
      en: "A mobile-first fan app with match-day info, ticket buying, score predictions and a team shop, built as a demo for the club.",
      sw: "Programu ya mashabiki kwa simu yenye taarifa za siku ya mechi, ununuzi wa tiketi, utabiri wa matokeo na duka la timu, iliyojengwa kama onyesho kwa klabu.",
    },
    result: null,
    stack: ["React", "Vite", "PWA"],
    image: "/work/darcity.webp",
    url: "https://darcity-app.vercel.app",
  },
  {
    slug: "swahili-bookshelf",
    name: "The Swahili Bookshelf",
    category: "saas",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Swahili books, audiobooks and stories in your pocket.",
      sw: "Vitabu vya Kiswahili, vitabu vya sauti na hadithi mfukoni mwako.",
    },
    problem: {
      en: "Swahili readers have few places to find, buy and read local books on a phone.",
      sw: "Wasomaji wa Kiswahili wana sehemu chache za kutafuta, kununua na kusoma vitabu vya hapa kwenye simu.",
    },
    built: {
      en: "A reading app with ebooks, audiobooks and stories, daily reading goals, a personal library and an English and Swahili interface.",
      sw: "Programu ya kusoma yenye vitabu pepe, vitabu vya sauti na hadithi, malengo ya kila siku ya kusoma, maktaba binafsi na lugha za Kiingereza na Kiswahili.",
    },
    result: null,
    stack: ["React", "Vite", "PWA"],
    image: "/work/swahili-bookshelf.webp",
    url: "https://swahilibookshelf.vercel.app",
  },
  {
    slug: "nalink",
    name: "Nalink",
    category: "saas",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Job search and hiring in Dar es Salaam, matched by real recruiters.",
      sw: "Kutafuta kazi na kuajiri Dar es Salaam, kwa msaada wa waajiri halisi.",
    },
    problem: {
      en: "Employers drown in applications and seekers never hear back.",
      sw: "Waajiri hufurika maombi na wanaotafuta kazi hawapati majibu.",
    },
    built: {
      en: "A jobs platform where seekers apply free and companies get a shortlist of 3 to 5 candidates chosen by people who read every application.",
      sw: "Jukwaa la kazi ambapo wanaotafuta kazi huomba bure na kampuni hupata orodha fupi ya wagombea 3 hadi 5 waliochaguliwa na watu wanaosoma kila ombi.",
    },
    result: null,
    stack: ["React", "Vite"],
    image: "/work/nalink.webp",
    url: "https://nalink-h-rapp.vercel.app",
  },
  {
    slug: "manna-pos",
    name: "Manna POS",
    category: "saas",
    status: { en: "Pilot from November 2026", sw: "Majaribio kuanzia Novemba 2026" },
    line: {
      en: "Offline-first point of sale for Tanzanian shops. Formerly LUCE.",
      sw: "Mfumo wa mauzo wa maduka ya Tanzania unaofanya kazi bila intaneti. Zamani LUCE.",
    },
    problem: {
      en: "Shops lose sales and stock records when the network drops, and most POS tools are not built for local trade.",
      sw: "Maduka hupoteza mauzo na rekodi za stoo mtandao unapokatika, na zana nyingi za POS hazijajengwa kwa biashara za hapa.",
    },
    built: {
      en: "A multi-tenant POS that works offline and syncs when the connection returns, configurable for different kinds of shops.",
      sw: "POS ya wateja wengi inayofanya kazi bila intaneti na kusawazisha mtandao ukirudi, inayoweza kubadilishwa kwa aina tofauti za maduka.",
    },
    result: null,
    stack: ["Vite", "React", "Supabase", "PWA"],
    image: "/work/manna-pos.webp",
    url: "https://luce-pos.vercel.app",
  },
  {
    slug: "tiketi",
    name: "tiketiApp",
    category: "saas",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Event ticketing for Tanzania.",
      sw: "Mfumo wa tiketi za matukio Tanzania.",
    },
    problem: {
      en: "Organisers need a simple way to sell tickets and check people in without paper or guesswork.",
      sw: "Waandaaji wanahitaji njia rahisi ya kuuza tiketi na kuwapokea watu bila karatasi wala kubahatisha.",
    },
    built: {
      en: "An event ticketing platform for selling and managing tickets.",
      sw: "Jukwaa la tiketi za matukio kwa kuuza na kusimamia tiketi.",
    },
    result: null,
    stack: ["React", "Supabase", "Tailwind"],
    image: "/work/tiketi.webp",
    url: "https://tiketi-app-two.vercel.app",
  },
  {
    slug: "wifi-kitonga",
    name: "WiFi Kitonga",
    category: "saas",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Captive portal that turns shared WiFi into revenue.",
      sw: "Ukurasa wa kuingia WiFi unaogeuza WiFi kuwa mapato.",
    },
    problem: {
      en: "Hotspot owners give away data with no easy way to charge for access.",
      sw: "Wamiliki wa hotspot hutoa data bure bila njia rahisi ya kutoza.",
    },
    built: {
      en: "A captive portal platform where users pay to connect, deployed and running.",
      sw: "Jukwaa la ukurasa wa kuingia ambapo watumiaji hulipa ili kuunganishwa, tayari linafanya kazi.",
    },
    result: null,
    stack: ["React", "Supabase", "Mobile money"],
    image: "/work/wifi-kitonga.webp",
    url: "https://wifikitongacapricon.netlify.app",
  },
  {
    slug: "volta",
    name: "Volta",
    category: "saas",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Online store where East African artists sell merch and music direct to fans.",
      sw: "Duka la mtandaoni ambapo wasanii wa Afrika Mashariki huuza bidhaa na muziki moja kwa moja kwa mashabiki.",
    },
    problem: {
      en: "Artists sell through DMs and screenshots, with no storefront, no catalogue and no easy way to pay.",
      sw: "Wasanii huuza kupitia DM na picha za skrini, bila duka, orodha ya bidhaa wala njia rahisi ya kulipa.",
    },
    built: {
      en: "A multi-artist commerce platform with artist pages, drops and a searchable shop, built for East Africa.",
      sw: "Jukwaa la biashara la wasanii wengi lenye kurasa za wasanii, drops na duka linalotafutika, lililojengwa kwa Afrika Mashariki.",
    },
    result: null,
    stack: ["Next.js", "Supabase", "Tailwind"],
    image: "/work/volta.webp",
    url: "https://volta-final.vercel.app",
  },
  {
    slug: "vera",
    name: "Vera International Travel",
    category: "websites",
    status: { en: "Live", sw: "Inafanya kazi" },
    line: {
      en: "Website for an IATA-accredited travel agency in Dar es Salaam.",
      sw: "Tovuti ya wakala wa safari mwenye IATA jijini Dar es Salaam.",
    },
    problem: {
      en: "Travellers needed a clear way to ask for flights, hotels, car hire and safaris without calling around.",
      sw: "Wasafiri walihitaji njia wazi ya kuomba tiketi, hoteli, magari na safari za utalii bila kupiga simu nyingi.",
    },
    built: {
      en: "A website with an enquiry form for flights, hotels, safaris and car hire, plus safari and tour pages.",
      sw: "Tovuti yenye fomu ya maulizo ya tiketi, hoteli, safari na magari, pamoja na kurasa za safari na ziara.",
    },
    result: null,
    stack: ["Website", "Enquiry form"],
    image: "/work/vera.webp",
    url: "https://vera4l.vercel.app",
  },
];

// Companies we have worked with. Add logo: "/clients/<file>.svg" (or .webp) once you have it;
// until then the name is shown as a clean wordmark.
export const CLIENTS = [
  { name: "Vera International Travel", logo: "" },
];

// Shown as a small strip so we do not overclaim.
export const BUILDING = [
  { name: "Shule Pro", note: { en: "School management", sw: "Usimamizi wa shule" } },
  { name: "Safiri", note: { en: "Tourism marketplace", sw: "Soko la utalii" } },
  { name: "VOLTA", note: { en: "Merch for East African artists", sw: "Bidhaa za wasanii wa Afrika Mashariki" } },
  { name: "Nalink", note: { en: "HR talent matching", sw: "Kuunganisha vipaji vya ajira" } },
  { name: "Swahili Bookshelf", note: { en: "Books and audiobooks", sw: "Vitabu na vitabu vya sauti" } },
  { name: "Gari Lipa", note: { en: "Car financing tracker", sw: "Ufuatiliaji wa malipo ya magari" } },
  { name: "Neno", note: { en: "Bible and spiritual content", sw: "Biblia na maudhui ya kiroho" } },
];

// PLACEHOLDER team: replace names, roles, bios and add photos at public/team/<file>.webp
export const TEAM = [
  {
    name: "SimonJr",
    role: { en: "Developer and digital strategist", sw: "Msanidi programu na mkakati wa kidijitali" },
    line: {
      en: "Builds the products and leads delivery.",
      sw: "Hujenga bidhaa na kuongoza utekelezaji.",
    },
    photo: "",
    placeholder: false,
  },
  {
    name: "Team member name",
    role: { en: "Role", sw: "Wadhifa" },
    line: { en: "One line about what they do.", sw: "Sentensi moja kuhusu wanachofanya." },
    photo: "",
    placeholder: true,
  },
  {
    name: "Team member name",
    role: { en: "Role", sw: "Wadhifa" },
    line: { en: "One line about what they do.", sw: "Sentensi moja kuhusu wanachofanya." },
    photo: "",
    placeholder: true,
  },
  {
    name: "Team member name",
    role: { en: "Role", sw: "Wadhifa" },
    line: { en: "One line about what they do.", sw: "Sentensi moja kuhusu wanachofanya." },
    photo: "",
    placeholder: true,
  },
];

// Shown as small chips in the footer. PLACEHOLDER: keep only what you have really built.
export const FOOTER_PAYMENTS = [
  { en: "Mobile money", sw: "Pesa ya simu" },
  { en: "Card payments", sw: "Malipo ya kadi" },
  { en: "Bank transfer", sw: "Uhamisho wa benki" },
];

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
