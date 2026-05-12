export const STOCKS = [
  // ─── TECNOLOGÍA ────────────────────────────────────────────
  { ticker: "AAPL",  name: "Apple Inc.",            sector: "tecnologia",  subsector: "Hardware",          country: "USA", cedear: true,  emoji: "🍎" },
  { ticker: "MSFT",  name: "Microsoft Corp.",        sector: "tecnologia",  subsector: "Software/Cloud",    country: "USA", cedear: true,  emoji: "🪟" },
  { ticker: "GOOGL", name: "Alphabet (Google)",      sector: "tecnologia",  subsector: "Internet/Ads",      country: "USA", cedear: true,  emoji: "🔍" },
  { ticker: "META",  name: "Meta Platforms",         sector: "tecnologia",  subsector: "Redes Sociales",    country: "USA", cedear: true,  emoji: "👥" },
  { ticker: "AMZN",  name: "Amazon",                 sector: "tecnologia",  subsector: "E-commerce/Cloud",  country: "USA", cedear: true,  emoji: "📦" },
  { ticker: "NVDA",  name: "NVIDIA Corp.",           sector: "tecnologia",  subsector: "Chips/IA",          country: "USA", cedear: true,  emoji: "🧠" },
  { ticker: "NFLX",  name: "Netflix Inc.",           sector: "tecnologia",  subsector: "Streaming",         country: "USA", cedear: true,  emoji: "🎬" },
  { ticker: "SPOT",  name: "Spotify Technology",    sector: "tecnologia",  subsector: "Streaming Audio",   country: "SWE", cedear: true,  emoji: "🎵" },
  { ticker: "UBER",  name: "Uber Technologies",      sector: "tecnologia",  subsector: "Movilidad",         country: "USA", cedear: true,  emoji: "🚖" },
  { ticker: "ABNB",  name: "Airbnb Inc.",            sector: "tecnologia",  subsector: "Turismo/Tech",      country: "USA", cedear: true,  emoji: "🏠" },
  { ticker: "PYPL",  name: "PayPal Holdings",        sector: "finanzas",    subsector: "Fintech",           country: "USA", cedear: true,  emoji: "💳" },
  { ticker: "CRM",   name: "Salesforce",             sector: "tecnologia",  subsector: "Software/Cloud",    country: "USA", cedear: true,  emoji: "☁️" },
  { ticker: "ORCL",  name: "Oracle Corporation",    sector: "tecnologia",  subsector: "Software/Cloud",    country: "USA", cedear: true,  emoji: "🗃️" },
  { ticker: "IBM",   name: "IBM Corp.",              sector: "tecnologia",  subsector: "IT/IA",             country: "USA", cedear: true,  emoji: "💼" },

  // ─── FINANZAS ─────────────────────────────────────────────
  { ticker: "JPM",   name: "JPMorgan Chase",         sector: "finanzas",    subsector: "Banco",             country: "USA", cedear: true,  emoji: "🏦" },
  { ticker: "GS",    name: "Goldman Sachs",          sector: "finanzas",    subsector: "Banco Inversión",   country: "USA", cedear: true,  emoji: "📊" },
  { ticker: "BAC",   name: "Bank of America",        sector: "finanzas",    subsector: "Banco",             country: "USA", cedear: true,  emoji: "🏛️" },
  { ticker: "V",     name: "Visa Inc.",              sector: "finanzas",    subsector: "Pagos",             country: "USA", cedear: true,  emoji: "💳" },
  { ticker: "MA",    name: "Mastercard Inc.",        sector: "finanzas",    subsector: "Pagos",             country: "USA", cedear: true,  emoji: "🔴" },
  { ticker: "WFC",   name: "Wells Fargo",            sector: "finanzas",    subsector: "Banco",             country: "USA", cedear: true,  emoji: "🏦" },
  { ticker: "BBAR",  name: "Banco BBVA Argentina",  sector: "finanzas",    subsector: "Banco Local AR",    country: "ARG", cedear: false, emoji: "🇦🇷" },
  { ticker: "GGAL",  name: "Grupo Galicia",          sector: "finanzas",    subsector: "Banco Local AR",    country: "ARG", cedear: false, emoji: "🇦🇷" },
  { ticker: "BMA",   name: "Banco Macro",            sector: "finanzas",    subsector: "Banco Local AR",    country: "ARG", cedear: false, emoji: "🇦🇷" },

  // ─── ENERGÍA ──────────────────────────────────────────────
  { ticker: "XOM",   name: "ExxonMobil",             sector: "energia",     subsector: "Petróleo",          country: "USA", cedear: true,  emoji: "🛢️" },
  { ticker: "CVX",   name: "Chevron Corp.",          sector: "energia",     subsector: "Petróleo",          country: "USA", cedear: true,  emoji: "⛽" },
  { ticker: "NEE",   name: "NextEra Energy",         sector: "energia",     subsector: "Renovable",         country: "USA", cedear: true,  emoji: "🌬️" },
  { ticker: "YPF",   name: "YPF S.A.",               sector: "energia",     subsector: "Petróleo AR",       country: "ARG", cedear: false, emoji: "🇦🇷" },
  { ticker: "PAMP",  name: "Pampa Energía",          sector: "energia",     subsector: "Energía AR",        country: "ARG", cedear: false, emoji: "🇦🇷" },

  // ─── CONSUMO / RETAIL ─────────────────────────────────────
  { ticker: "WMT",   name: "Walmart Inc.",           sector: "consumo",     subsector: "Supermercado",      country: "USA", cedear: true,  emoji: "🛒" },
  { ticker: "COST",  name: "Costco Wholesale",       sector: "consumo",     subsector: "Mayorista",         country: "USA", cedear: true,  emoji: "📦" },
  { ticker: "TGT",   name: "Target Corp.",           sector: "consumo",     subsector: "Retail",            country: "USA", cedear: true,  emoji: "🎯" },

  // ─── ALIMENTOS ────────────────────────────────────────────
  { ticker: "MCD",   name: "McDonald's Corp.",       sector: "alimentos",   subsector: "Fast Food",         country: "USA", cedear: true,  emoji: "🍔" },
  { ticker: "SBUX",  name: "Starbucks Corp.",        sector: "alimentos",   subsector: "Café/Bebidas",      country: "USA", cedear: true,  emoji: "☕" },
  { ticker: "KO",    name: "Coca-Cola Co.",          sector: "alimentos",   subsector: "Bebidas",           country: "USA", cedear: true,  emoji: "🥤" },
  { ticker: "PEP",   name: "PepsiCo Inc.",           sector: "alimentos",   subsector: "Bebidas/Snacks",    country: "USA", cedear: true,  emoji: "🫙" },

  // ─── MODA / LUJO ──────────────────────────────────────────
  { ticker: "NKE",   name: "Nike Inc.",              sector: "moda",        subsector: "Ropa Deportiva",    country: "USA", cedear: true,  emoji: "👟" },
  { ticker: "LULU",  name: "Lululemon Athletica",   sector: "moda",        subsector: "Ropa Deportiva",    country: "USA", cedear: true,  emoji: "🧘" },
  { ticker: "CPRI",  name: "Capri Holdings",         sector: "moda",        subsector: "Lujo Accesible",    country: "USA", cedear: true,  emoji: "👜" },

  // ─── SALUD ────────────────────────────────────────────────
  { ticker: "JNJ",   name: "Johnson & Johnson",     sector: "salud",       subsector: "Farmacéutica",      country: "USA", cedear: true,  emoji: "💊" },
  { ticker: "PFE",   name: "Pfizer Inc.",            sector: "salud",       subsector: "Farmacéutica",      country: "USA", cedear: true,  emoji: "🧬" },
  { ticker: "UNH",   name: "UnitedHealth Group",    sector: "salud",       subsector: "Salud Gestionada",  country: "USA", cedear: true,  emoji: "🏥" },
  { ticker: "ABBV",  name: "AbbVie Inc.",            sector: "salud",       subsector: "Biotecnología",     country: "USA", cedear: true,  emoji: "🔬" },
  { ticker: "MRK",   name: "Merck & Co.",            sector: "salud",       subsector: "Farmacéutica",      country: "USA", cedear: true,  emoji: "💉" },

  // ─── GAMING ───────────────────────────────────────────────
  { ticker: "EA",    name: "Electronic Arts",        sector: "gaming",      subsector: "Videojuegos",       country: "USA", cedear: true,  emoji: "🕹️" },
  { ticker: "RBLX",  name: "Roblox Corp.",           sector: "gaming",      subsector: "Metaverso",         country: "USA", cedear: true,  emoji: "🟥" },
  { ticker: "SONY",  name: "Sony Group Corp.",       sector: "gaming",      subsector: "Electrónica/Games", country: "JPN", cedear: true,  emoji: "🎮" },
  { ticker: "ATVI",  name: "Activision Blizzard",   sector: "gaming",      subsector: "Videojuegos",       country: "USA", cedear: true,  emoji: "🎯" },

  // ─── AUTOS ────────────────────────────────────────────────
  { ticker: "TSLA",  name: "Tesla Inc.",             sector: "autos",       subsector: "Autos Eléctricos",  country: "USA", cedear: true,  emoji: "⚡" },
  { ticker: "F",     name: "Ford Motor Co.",         sector: "autos",       subsector: "Autos Tradicional", country: "USA", cedear: true,  emoji: "🚙" },
  { ticker: "GM",    name: "General Motors",         sector: "autos",       subsector: "Autos Tradicional", country: "USA", cedear: true,  emoji: "🏎️" },
  { ticker: "TM",    name: "Toyota Motor Corp.",     sector: "autos",       subsector: "Autos Japonés",     country: "JPN", cedear: true,  emoji: "🚘" },
  { ticker: "RIVN",  name: "Rivian Automotive",      sector: "autos",       subsector: "Autos Eléctricos",  country: "USA", cedear: true,  emoji: "🔋" },
  { ticker: "NIO",   name: "NIO Inc.",               sector: "autos",       subsector: "Autos Eléctricos",  country: "CHN", cedear: true,  emoji: "🚗" },

  // ─── AEROLÍNEAS ───────────────────────────────────────────
  { ticker: "DAL",   name: "Delta Air Lines",        sector: "aerolineas",  subsector: "Aerolínea USA",     country: "USA", cedear: true,  emoji: "✈️" },
  { ticker: "UAL",   name: "United Airlines",        sector: "aerolineas",  subsector: "Aerolínea USA",     country: "USA", cedear: true,  emoji: "🛫" },
  { ticker: "LUV",   name: "Southwest Airlines",    sector: "aerolineas",  subsector: "Low Cost USA",      country: "USA", cedear: true,  emoji: "💛" },
  { ticker: "DESP",  name: "Despegar.com",           sector: "aerolineas",  subsector: "Turismo Online AR", country: "ARG", cedear: false, emoji: "🇦🇷" },

  // ─── TELECOM ──────────────────────────────────────────────
  { ticker: "TECO2", name: "Telecom Argentina",      sector: "telecom",     subsector: "Telecom AR",        country: "ARG", cedear: false, emoji: "🇦🇷" },
  { ticker: "T",     name: "AT&T Inc.",              sector: "telecom",     subsector: "Telecom USA",       country: "USA", cedear: true,  emoji: "📡" },
  { ticker: "VZ",    name: "Verizon Communications", sector: "telecom",     subsector: "Telecom USA",       country: "USA", cedear: true,  emoji: "📶" },

  // ─── MINERÍA / COMMODITIES ────────────────────────────────
  { ticker: "GOLD",  name: "Barrick Gold Corp.",     sector: "mineria",     subsector: "Oro",               country: "CAN", cedear: true,  emoji: "🥇" },
  { ticker: "NEM",   name: "Newmont Corporation",   sector: "mineria",     subsector: "Oro",               country: "USA", cedear: true,  emoji: "⛏️" },
  { ticker: "LOMA",  name: "Loma Negra",             sector: "mineria",     subsector: "Cemento AR",        country: "ARG", cedear: false, emoji: "🇦🇷" },
]

export const SECTORES = [
  { id: "todos",      label: "Todos",       emoji: "🌐" },
  { id: "tecnologia", label: "Tecnología",  emoji: "💻" },
  { id: "finanzas",   label: "Finanzas",    emoji: "🏦" },
  { id: "energia",    label: "Energía",     emoji: "⚡" },
  { id: "consumo",    label: "Consumo",     emoji: "🛍️" },
  { id: "alimentos",  label: "Alimentos",   emoji: "🍔" },
  { id: "moda",       label: "Moda",        emoji: "👗" },
  { id: "salud",      label: "Salud",       emoji: "🏥" },
  { id: "gaming",     label: "Gaming",      emoji: "🎮" },
  { id: "autos",      label: "Autos",       emoji: "🚗" },
  { id: "aerolineas", label: "Aerolíneas",  emoji: "✈️" },
  { id: "telecom",    label: "Telecom",     emoji: "📡" },
  { id: "mineria",    label: "Minería",     emoji: "⛏️" },
]
