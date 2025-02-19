// /app/constants/config.ts

// Default locale and country
export const defaultLocale = "en";
export const defaultCountry = "in";

// Define a type for all valid ISO 3166-1 alpha-2 country codes in lowercase
export type CountryCode =
  | "af"
  | "ax"
  | "al"
  | "dz"
  | "as"
  | "ad"
  | "ao"
  | "ai"
  | "aq"
  | "ag"
  | "ar"
  | "am"
  | "aw"
  | "au"
  | "at"
  | "az"
  | "bs"
  | "bh"
  | "bd"
  | "bb"
  | "by"
  | "be"
  | "bz"
  | "bj"
  | "bm"
  | "bt"
  | "bo"
  | "bq"
  | "ba"
  | "bw"
  | "bv"
  | "br"
  | "io"
  | "bn"
  | "bg"
  | "bf"
  | "bi"
  | "cv"
  | "kh"
  | "cm"
  | "ca"
  | "ky"
  | "cf"
  | "td"
  | "cl"
  | "cn"
  | "cx"
  | "cc"
  | "co"
  | "km"
  | "cd"
  | "cg"
  | "ck"
  | "cr"
  | "hr"
  | "cu"
  | "cw"
  | "cy"
  | "cz"
  | "dk"
  | "dj"
  | "dm"
  | "do"
  | "ec"
  | "eg"
  | "sv"
  | "gq"
  | "er"
  | "ee"
  | "sz"
  | "et"
  | "fk"
  | "fo"
  | "fj"
  | "fi"
  | "fr"
  | "gf"
  | "pf"
  | "tf"
  | "ga"
  | "gm"
  | "ge"
  | "de"
  | "gh"
  | "gi"
  | "gr"
  | "gl"
  | "gd"
  | "gp"
  | "gu"
  | "gt"
  | "gg"
  | "gn"
  | "gw"
  | "gy"
  | "ht"
  | "hm"
  | "va"
  | "hn"
  | "hk"
  | "hu"
  | "is"
  | "in"
  | "id"
  | "ir"
  | "iq"
  | "ie"
  | "im"
  | "il"
  | "it"
  | "jm"
  | "jp"
  | "je"
  | "jo"
  | "kz"
  | "ke"
  | "ki"
  | "kp"
  | "kr"
  | "kw"
  | "kg"
  | "la"
  | "lv"
  | "lb"
  | "ls"
  | "lr"
  | "ly"
  | "li"
  | "lt"
  | "lu"
  | "mo"
  | "mg"
  | "mw"
  | "my"
  | "mv"
  | "ml"
  | "mt"
  | "mh"
  | "mq"
  | "mr"
  | "mu"
  | "yt"
  | "mx"
  | "fm"
  | "md"
  | "mc"
  | "mn"
  | "me"
  | "ms"
  | "ma"
  | "mz"
  | "mm"
  | "na"
  | "nr"
  | "np"
  | "nl"
  | "nc"
  | "nz"
  | "ni"
  | "ne"
  | "ng"
  | "nu"
  | "nf"
  | "mp"
  | "no"
  | "om"
  | "pk"
  | "pw"
  | "ps"
  | "pa"
  | "pg"
  | "py"
  | "pe"
  | "ph"
  | "pn"
  | "pl"
  | "pt"
  | "pr"
  | "qa"
  | "re"
  | "ro"
  | "ru"
  | "rw"
  | "bl"
  | "sh"
  | "kn"
  | "lc"
  | "mf"
  | "pm"
  | "vc"
  | "ws"
  | "sm"
  | "st"
  | "sa"
  | "sn"
  | "rs"
  | "sc"
  | "sl"
  | "sg"
  | "sx"
  | "sk"
  | "si"
  | "sb"
  | "so"
  | "za"
  | "gs"
  | "ss"
  | "es"
  | "lk"
  | "sd"
  | "sr"
  | "sj"
  | "se"
  | "ch"
  | "sy"
  | "tw"
  | "tj"
  | "tz"
  | "th"
  | "tl"
  | "tg"
  | "tk"
  | "to"
  | "tt"
  | "tn"
  | "tr"
  | "tm"
  | "tc"
  | "tv"
  | "ug"
  | "ua"
  | "ae"
  | "gb"
  | "us"
  | "um"
  | "uy"
  | "uz"
  | "vu"
  | "ve"
  | "vn"
  | "vg"
  | "vi"
  | "wf"
  | "eh"
  | "ye"
  | "zm"
  | "zw";

// Mapping of all ISO 3166-1 alpha-2 country codes to their respective country names
export const countryNames: Record<CountryCode, string> = {
  af: "Afghanistan",
  ax: "Åland Islands",
  al: "Albania",
  dz: "Algeria",
  as: "American Samoa",
  ad: "Andorra",
  ao: "Angola",
  ai: "Anguilla",
  aq: "Antarctica",
  ag: "Antigua and Barbuda",
  ar: "Argentina",
  am: "Armenia",
  aw: "Aruba",
  au: "Australia",
  at: "Austria",
  az: "Azerbaijan",
  bs: "Bahamas",
  bh: "Bahrain",
  bd: "Bangladesh",
  bb: "Barbados",
  by: "Belarus",
  be: "Belgium",
  bz: "Belize",
  bj: "Benin",
  bm: "Bermuda",
  bt: "Bhutan",
  bo: "Bolivia (Plurinational State of)",
  bq: "Bonaire, Sint Eustatius and Saba",
  ba: "Bosnia and Herzegovina",
  bw: "Botswana",
  bv: "Bouvet Island",
  br: "Brazil",
  io: "British Indian Ocean Territory",
  bn: "Brunei Darussalam",
  bg: "Bulgaria",
  bf: "Burkina Faso",
  bi: "Burundi",
  cv: "Cabo Verde",
  kh: "Cambodia",
  cm: "Cameroon",
  ca: "Canada",
  ky: "Cayman Islands",
  cf: "Central African Republic",
  td: "Chad",
  cl: "Chile",
  cn: "China",
  cx: "Christmas Island",
  cc: "Cocos (Keeling) Islands",
  co: "Colombia",
  km: "Comoros",
  cd: "Congo (the Democratic Republic of the)",
  cg: "Congo",
  ck: "Cook Islands",
  cr: "Costa Rica",
  hr: "Croatia",
  cu: "Cuba",
  cw: "Curaçao",
  cy: "Cyprus",
  cz: "Czechia",
  dk: "Denmark",
  dj: "Djibouti",
  dm: "Dominica",
  do: "Dominican Republic",
  ec: "Ecuador",
  eg: "Egypt",
  sv: "El Salvador",
  gq: "Equatorial Guinea",
  er: "Eritrea",
  ee: "Estonia",
  sz: "Eswatini",
  et: "Ethiopia",
  fk: "Falkland Islands (Malvinas)",
  fo: "Faroe Islands",
  fj: "Fiji",
  fi: "Finland",
  fr: "France",
  gf: "French Guiana",
  pf: "French Polynesia",
  tf: "French Southern Territories",
  ga: "Gabon",
  gm: "Gambia",
  ge: "Georgia",
  de: "Germany",
  gh: "Ghana",
  gi: "Gibraltar",
  gr: "Greece",
  gl: "Greenland",
  gd: "Grenada",
  gp: "Guadeloupe",
  gu: "Guam",
  gt: "Guatemala",
  gg: "Guernsey",
  gn: "Guinea",
  gw: "Guinea-Bissau",
  gy: "Guyana",
  ht: "Haiti",
  hm: "Heard Island and McDonald Islands",
  va: "Holy See",
  hn: "Honduras",
  hk: "Hong Kong",
  hu: "Hungary",
  is: "Iceland",
  in: "India",
  id: "Indonesia",
  ir: "Iran (Islamic Republic of)",
  iq: "Iraq",
  ie: "Ireland",
  im: "Isle of Man",
  il: "Israel",
  it: "Italy",
  jm: "Jamaica",
  jp: "Japan",
  je: "Jersey",
  jo: "Jordan",
  kz: "Kazakhstan",
  ke: "Kenya",
  ki: "Kiribati",
  kp: "Korea (the Democratic People's Republic of)",
  kr: "Korea (the Republic of)",
  kw: "Kuwait",
  kg: "Kyrgyzstan",
  la: "Lao People's Democratic Republic",
  lv: "Latvia",
  lb: "Lebanon",
  ls: "Lesotho",
  lr: "Liberia",
  ly: "Libya",
  li: "Liechtenstein",
  lt: "Lithuania",
  lu: "Luxembourg",
  mo: "Macao",
  mg: "Madagascar",
  mw: "Malawi",
  my: "Malaysia",
  mv: "Maldives",
  ml: "Mali",
  mt: "Malta",
  mh: "Marshall Islands",
  mq: "Martinique",
  mr: "Mauritania",
  mu: "Mauritius",
  yt: "Mayotte",
  mx: "Mexico",
  fm: "Micronesia (Federated States of)",
  md: "Moldova (the Republic of)",
  mc: "Monaco",
  mn: "Mongolia",
  me: "Montenegro",
  ms: "Montserrat",
  ma: "Morocco",
  mz: "Mozambique",
  mm: "Myanmar",
  na: "Namibia",
  nr: "Nauru",
  np: "Nepal",
  nl: "Netherlands",
  nc: "New Caledonia",
  nz: "New Zealand",
  ni: "Nicaragua",
  ne: "Niger",
  ng: "Nigeria",
  nu: "Niue",
  nf: "Norfolk Island",
  mp: "Northern Mariana Islands",
  no: "Norway",
  om: "Oman",
  pk: "Pakistan",
  pw: "Palau",
  ps: "Palestine, State of",
  pa: "Panama",
  pg: "Papua New Guinea",
  py: "Paraguay",
  pe: "Peru",
  ph: "Philippines",
  pn: "Pitcairn",
  pl: "Poland",
  pt: "Portugal",
  pr: "Puerto Rico",
  qa: "Qatar",
  re: "Réunion",
  ro: "Romania",
  ru: "Russian Federation",
  rw: "Rwanda",
  bl: "Saint Barthélemy",
  sh: "Saint Helena, Ascension and Tristan da Cunha",
  kn: "Saint Kitts and Nevis",
  lc: "Saint Lucia",
  mf: "Saint Martin (French part)",
  pm: "Saint Pierre and Miquelon",
  vc: "Saint Vincent and the Grenadines",
  ws: "Samoa",
  sm: "San Marino",
  st: "Sao Tome and Principe",
  sa: "Saudi Arabia",
  sn: "Senegal",
  rs: "Serbia",
  sc: "Seychelles",
  sl: "Sierra Leone",
  sg: "Singapore",
  sx: "Sint Maarten (Dutch part)",
  sk: "Slovakia",
  si: "Slovenia",
  sb: "Solomon Islands",
  so: "Somalia",
  za: "South Africa",
  gs: "South Georgia and the South Sandwich Islands",
  ss: "South Sudan",
  es: "Spain",
  lk: "Sri Lanka",
  sd: "Sudan",
  sr: "Suriname",
  sj: "Svalbard and Jan Mayen",
  se: "Sweden",
  ch: "Switzerland",
  sy: "Syrian Arab Republic",
  tw: "Taiwan",
  tj: "Tajikistan",
  tz: "Tanzania, United Republic of",
  th: "Thailand",
  tl: "Timor-Leste",
  tg: "Togo",
  tk: "Tokelau",
  to: "Tonga",
  tt: "Trinidad and Tobago",
  tn: "Tunisia",
  tr: "Turkey",
  tm: "Turkmenistan",
  tc: "Turks and Caicos Islands",
  tv: "Tuvalu",
  ug: "Uganda",
  ua: "Ukraine",
  ae: "United Arab Emirates",
  gb: "United Kingdom ",
  us: "United States ",
  um: "United States Minor Outlying Islands",
  uy: "Uruguay",
  uz: "Uzbekistan",
  vu: "Vanuatu",
  ve: "Venezuela (Bolivarian Republic of)",
  vn: "Viet Nam",
  vg: "Virgin Islands (British)",
  vi: "Virgin Islands (U.S.)",
  wf: "Wallis and Futuna",
  eh: "Western Sahara",
  ye: "Yemen",
  zm: "Zambia",
  zw: "Zimbabwe",
};
