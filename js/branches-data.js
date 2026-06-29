// js/branches-data.js

const branchLocations = [
  // ── MAIN BRANCH ──
  {
    type: 'main',
    name: "IProcess Victorias Branch",
    address: "Motortrade Victorias and Old Lopues, Room 5, 2nd Floor, Garl Building, Jalandoni St., Brgy. XIII, Victorias City, Philippines",
    lat: 10.896757832752504,
    lng: 123.06491050869002,
    phone: "(034) 123 4567",
    email: "victorias@iprocessph.com",
  },
  // ── REGULAR BRANCHES ──
  {
    type: 'branch',
    name: "LJ LPG OUTLET",
    address: "#14 Dry Goods Section Public Market Vito City of Sagay, Negros Occidental, Philippines",
    lat: 10.90432313226772,
    lng: 123.51493792390936,
    phone: "9122631633",

  },
  {
    type: 'branch',
    name: "BALUARTE PAYMENT CENTER",
    address: "#14 Dry Goods Section Public Market Vito City of Sagay, Negros Occidental, Philippines",
    lat: 10.594758559897784,
    lng: 123.48131455132616,
    phone: "9369449241",

  },
  {
    type: 'branch',
    name: "FASTBOOT",
    address: "Old Poblacion , Escalante City Negros Occidental",
    lat: 10.834359480525999,
    lng: 123.55114071893574,
    phone: "9763150550",

  },
  {
    type: 'branch',
    name: "CEL AND JIM",
    address: "Brgy. Tabun ak Toboso Negros Occidental",
    lat: 10.728513035110517,
    lng: 123.4868860662355,
    phone: "9303022531",

  },
  {
    type: 'branch',
    name: "AGM LPG Trading",
    address: "Brgy Patun.an Calatrava Negros Occidental",
    lat: 10.572876146440793,
    lng: 123.46722223963104,
    phone: "9266862887",

  },
  {
    type: 'branch',
    name: "PAIDAL BILLS PAYMENT",
    address: "SIASI, SULU",
    lat: 5.547685461514926,
    lng: 120.84516194182757,
    phone: "9979166961",

  },
  {
    type: 'branch',
    name: "GRAZIE VARIETY STORE",
    address: "SUPANG, BUENAVISTA GUIMARAS",
    lat: 10.70378406368638,
    lng: 122.67153161134567,
    phone: "9683009738",

  },
  {
    type: 'branch',
    name: "ZOE MINI GROCERY",
    address: "CDC Subdivision, Brgy. Purisima, Manapla",
    lat: 10.932578712131408,
    lng: 123.16592122951486,
    phone: "9505102923",

  },
  {
    type: 'branch',
    name: "RAN N KRING",
    address: "Purok Paghiliusa, Barangay Fabrica, Sagay City",
    lat: 10.889071472244995,
    lng: 123.35362559357232,
    phone: "9778030388",

  },
  {
    type: 'branch',
    name: "ANNA MARIE STORE",
    address: "SITIO TAYAP BRGY. PATAG SILAY CITY",
    lat: 10.73082687156463,
    lng: 123.16999598402073,
    phone: "9208903334",

  },
  {
    type: 'branch',
    name: "GRAZIE VARIETY STORE",
    address: "SUPANG, BUENAVISTA GUIMARAS",
    lat: 10.703531051745182,
    lng: 122.66771214574607,
    phone: "9683009738",

  },
  {
    type: 'branch',
    name: "GRACE SARI SARI STORE",
    address: "MURCIA",
    lat: 10.602484115903804,
    lng: 123.04103463843038,
    phone: "9914711774",

  },
  {
    type: 'branch',
    name: "STA. CRUZ VIEJO, TANJAY CITY",
    address: "MURCIA",
    lat: 9.528387135691101,
    lng: 123.093401876797,
    phone: "9707209814",

  },
  {
    type: 'branch',
    name: "HERLEE SARI SARI STORE",
    address: "Hda. Sta. Teresa Brgy, Enrique B. Magalona, Negros Occidental",
    lat: 10.892012958226625,
    lng: 123.01325415274526,
    phone: "9079786121",

  },
  {
    type: 'branch',
    name: "NORL'S BILLS PAYENT",
    address: "DUMARAO, CAPIZ",
    lat: 11.221002139078655,
    lng: 122.82286416974853,
    phone: "9223563028",

  },
  {
    type: 'branch',
    name: "GUMBAN STORE",
    address: "Hda. Sta. Teresa Brgy, Enrique B. Magalona, Negros Occidental",
    lat: 9.571596008807036,
    lng: 122.54758174208482,
    phone: "9508768547",

  },
  {
    type: 'branch',
    name: "DIRTBUSTER LAUNDRY SHOP",
    address: "BANGA LOTE FND BUILDING UNIT 2 BRGY. ALIJIS",
    lat: 10.644880936317497,
    lng: 122.93842594512441,
    phone: "9162822965",

  },
  {
    type: 'branch',
    name: "ELVIRA SARI SARI STORE",
    address: "Tabu, Ilog, Negros Occidental",
    lat: 9.896536762324098,
    lng: 122.71406447129216,
    phone: "9104392506",

  },
  {
    type: 'branch',
    name: "CORTEZ SARI SARI STORE",
    address: "Dulao, Bago City, Negros Occidental",
    lat: 10.557194022908076,
    lng: 122.9587682251594,
    phone: "9214515678",

  },
  {
    type: 'branch',
    name: "JENZEN AGRIVET SUPPLY",
    address: "CITY OF SIPALAY, NEGROS OCCIDENTAL",
    lat: 9.727182861177692,
    lng: 122.45477911350876,
    phone: "9939863290",

  },
  {
    type: 'branch',
    name: "CHERYL SARI SARI STORE",
    address: "HINOBA-AN, NEGROS OCCIDENTAL",
    lat: 9.548574291216676,
    lng: 122.57367427112484,
    phone: "9101707062",

  },
  {
    type: 'branch',
    name: "BENROSE SARI SARI STORE AND HARDWARE",
    address: "CALATRAVA NEGROS OCCIDENTAL",
    lat: 10.67710624312934,
    lng: 123.34272656843883,
    phone: "9770657716",

  },
  {
    type: 'branch',
    name: "AINA STORE",
    address: "MINAPASUK, CALATRAVA",
    lat: 10.70059437070738,
    lng: 123.35227094325461,
    phone: "9107817629",

  },
  {
    type: 'branch',
    name: "ERONS CANSI HOUSE",
    address: "CAPITOL SHOPPING, BACOLOD CITY",
    lat: 10.67364864872426,
    lng: 122.95961010724153,
    phone: "9204155252",

  },
  {
    type: 'branch',
    name: "ROSELYN STORE",
    address: "CADIZ CITY",
    lat: 10.922250023276316,
    lng: 123.33592131120275,
    phone: "9178402062",

  },
  {
    type: 'branch',
    name: "JAMIEL E LOADING BILLS PAYMENT",
    address: "KABANKALAN CITY",
    lat: 9.884338616836457,
    lng: 122.76323671754498,
    phone: "9061406127",

  },
  {
    type: 'branch',
    name: "KURBADA CAFE",
    address: "MARICALUM, CITY OF SIPALAY",
    lat: 9.713838960456744,
    lng: 122.4417171414476,
    phone: "9959885244",

  },
  {
    type: 'branch',
    name: "LENI SARI SARI STORE ",
    address: "PUROK OREGANO, BUCANA ILOG",
    lat: 10.009940205144789,
    lng: 122.73425817004147,
    phone: "9469593527",

  },
  {
    type: 'branch',
    name: "RYV PHARMACY",
    address: "SIPALAY CITY",
    lat: 9.754252719193765,
    lng: 122.4657654415256,
    phone: "9474730842",

  },
  {
    type: 'branch',
    name: "NADZ MINI GROCERY",
    address: "CABUG, BACOLOD CITY",
    lat: 10.600730926363267,
    lng: 122.94799573103806,
    phone: "9055188108",

  },
  {
    type: 'branch',
    name: "MICO JR. SARI SARI STORE",
    address: "PRK 1 BRGY.MADALAG E.B MAGALONA NEGROS OCCIDENTAL",
    lat: 10.898467930677922,
    lng: 122.9828751408616,
    phone: "9984962022",

  },
  {
    type: 'branch',
    name: "POLANTE STORE",
    address: "POBLACION MAGALLANES, SORSOGON",
    lat: 12.827364987658777,
    lng: 123.83433288378036,
    phone: "9496218564",

  },
  {
    type: 'branch',
    name: "VIRTEK'S PAYMENT CENTER",
    address: "Tubod Bitoon, Dumanjug Cebu",
    lat: 10.068790398740411,
    lng: 123.47049337022793,
    phone: "9290121181",

  },
  {
    type: 'branch',
    name: "BPK BUSINESS CENTER",
    address: "PONTEVEDRA, NEG. OCC.",
    lat: 10.33285458454681,
    lng: 122.9492828491576,
    phone: "9519652808",

  },
  {
    type: 'branch',
    name: "MISS LAINE BUSINESS CENTER",
    address: "SUM-AG, BACOLOD CITY",
    lat: 10.601502912519255,
    lng: 122.91793267562817,
    phone: "9776462492",

  },
  {
    type: 'branch',
    name: "P.A.C. BUSINESS CENTER",
    address: "BAGO CITY",
    lat: 10.494833829294263,
    lng: 122.9394526621879,
    phone: "9993844773",

  },
  {
    type: 'branch',
    name: "LJG BUSINESS CENTER",
    address: "CADIZ CITY",
    lat: 10.928317824737555,
    lng: 123.30845549116066,
    phone: "9270571644",

  },
  {
    type: 'branch',
    name: "FARMACIA ANTONIA",
    address: "BRGY. 1, HINOBAAN, NEGROS OCCIDENTAL",
    lat: 9.608544163703321,
    lng: 122.4627512142033,
    phone: "9100309869",

  },
  {
    type: 'branch',
    name: "FUENTES PAYKOLECT",
    address: "MUINICIPALITY OF ILOG, NEGROS OCCIDENTAL",
    lat: 10.023168323023745,
    lng: 122.76823043188588,
    phone: "9466072598",

  },
  {
    type: 'branch',
    name: "D ELRIE CAFE AND PRINTING SERVICES",
    address: "SAN ISIDRO TOBOSO",
    lat: 10.732303453154074,
    lng: 123.43694509804858,
    phone: "9158344122",

  },
  {
    type: 'branch',
    name: "HANNAH PHARMACY",
    address: "MABIGO CANLAON",
    lat: 10.365861300813501,
    lng: 123.21183792677238,
    phone: "9659823470",

  },
  {
    type: 'branch',
    name: "RHIANNA MOTORCYCLE PARTS SHOP",
    address: "BAGO CITY",
    lat: 10.52858992676796,
    lng: 122.98116637637689,
    phone: "9285473034",

  },
  {
    type: 'branch',
    name: "SERATO GING REFRESHMENT PARLOR",
    address: "DIVINA COLONIA SAGAY CITY NEGROS OCCIDENTAL",
    lat: 10.768827980717939,
    lng: 123.32078320185356,
    phone: "9691342050",

  },
  {
    type: 'branch',
    name: "LAS SARI SARI STORE",
    address: "Brgy San Isidro, E.B. Magalona, Negros Occidental",
    lat: 10.806516893040067,
    lng: 123.13410455926295,
    phone: "9665616842",

  },
  {
    type: 'branch',
    name: "JASA MARKETING/JVR SERVIZIO BILLS PAYMENT CENTER",
    address: "PUROK MAHOGANY 4, TAYUD, LILOAN, CEBU",
    lat: 10.371096389314204,
    lng: 123.9896239752292,
    phone: "9608214219",

  },
  {
    type: 'branch',
    name: "TETS CAFETERIA",
    address: "Brgy Malanog, Calatrava, Negros Occidental",
    lat: 10.641341991732926,
    lng: 123.43199048357572,
    phone: "9468931889",

  },
  {
    type: 'branch',
    name: "LUCKY E-LOADING AND ONLINE SHOP",
    address: "GRANADA BACOLOD CITY",
    lat: 10.666334558143932,
    lng: 123.03579478793226,
    phone: "9102952403",
  },
  {
    type: 'branch',
    name: "BUGSAY CAFE",
    address: "Brgy. XI, Victorias City Negros Occidental",
    lat: 10.79932458948734,
    lng: 123.17318126369284,
    phone: "9063372445",

  },
];

export default branchLocations;