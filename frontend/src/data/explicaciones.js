export const explicaciones = {
  "Plazo fijo tradicional": {
    emoji: "🏦",
    tagline: "El clásico. Guardás plata en el banco y te pagan un interés.",
    como_funciona: `Vas al banco (o lo hacés por la app del banco), depositás tu plata por un plazo mínimo de 30 días, y al vencimiento te devuelven lo que pusiste más un interés. La tasa la fija el banco y es fija desde el momento en que lo abrís.`,
    ejemplo: `Si ponés $100.000 a 30 días con una tasa del 4% mensual, al mes tenés $104.000. Pero si la inflación fue 5% ese mes, tu dinero en realidad vale menos que antes.`,
    ventajas: [
      "Muy seguro: el Estado garantiza hasta $6.000.000 (SEDESA)",
      "Fácil de hacer desde cualquier app bancaria",
      "No necesitás saber nada de inversiones",
    ],
    desventajas: [
      "Casi nunca le gana a la inflación",
      "No podés sacar la plata antes del plazo",
      "El rendimiento real suele ser negativo",
    ],
    para_quien: "Para alguien que quiere empezar sin riesgo y ya tiene cuenta bancaria.",
    minimo: "Desde $1.000 en la mayoría de los bancos.",
    donde: "App de tu banco. No necesitás nada especial.",
    pasos: [
      "Tener cuenta bancaria (ya tenés)",
      "Ingresar al home banking o app del banco",
      "Ir a 'Inversiones' → 'Plazo Fijo'",
      "Elegir el monto y confirmar",
    ],
  },

  "Plazo fijo UVA": {
    emoji: "🛡️",
    tagline: "Como el plazo fijo clásico, pero te protege de la inflación.",
    como_funciona: `UVA son Unidades de Valor Adquisitivo. Tu depósito se ajusta todos los días según la inflación oficial (CER/INDEC), más un pequeño interés extra del 1%. Esto significa que al menos no perdés poder de compra.`,
    ejemplo: `Si ponés $100.000 hoy y la inflación en 90 días fue 15%, al vencimiento recibís $115.000 + el 1% extra = $116.150. Tu dinero mantiene lo que podía comprar antes.`,
    ventajas: [
      "Protege tu capital de la inflación",
      "Garantía SEDESA igual que el plazo fijo clásico",
      "Rendimiento real siempre positivo (aunque sea poco)",
    ],
    desventajas: [
      "Mínimo 90 días (no podés sacar antes sin penalidad)",
      "Si la inflación baja mucho, rinde menos que el plazo fijo clásico",
      "No disponible en todos los bancos",
    ],
    para_quien: "Para alguien que quiere preservar sus ahorros sin arriesgar nada.",
    minimo: "Desde $1.000. Consultá con tu banco.",
    donde: "App de tu banco. Buscá 'Plazo fijo UVA' en la sección de inversiones.",
    pasos: [
      "Tener cuenta bancaria (ya tenés)",
      "Ingresar al home banking",
      "Ir a 'Inversiones' o 'Plazo Fijo UVA'",
      "Elegir el monto y confirmar",
    ],
  },

  "FCI Money Market": {
    emoji: "💼",
    tagline: "Como un plazo fijo pero podés sacar la plata cuando querés.",
    como_funciona: `Un Fondo Común de Inversión (FCI) money market es un fondo administrado por una empresa que junta la plata de muchos inversores y la pone en plazos fijos, letras del Tesoro y otros instrumentos seguros. Podés rescatar tu dinero en el mismo día (24 horas hábiles).`,
    ejemplo: `Ponés $50.000 en el fondo. Rinde aproximadamente lo mismo que un plazo fijo (un poco menos). Pero si necesitás la plata mañana, la tenés mañana. No hay plazo mínimo.`,
    ventajas: [
      "Liquidez inmediata — rescatás cuando quieras",
      "Rinde similar al plazo fijo",
      "Muy bajo riesgo",
      "Disponible en apps como Mercado Pago, Naranja X, IOL",
    ],
    desventajas: [
      "Rinde un poco menos que el plazo fijo clásico",
      "La tasa varía día a día (no es fija)",
    ],
    para_quien: "Para tener el 'colchón' de emergencia trabajando en vez de parado.",
    minimo: "Desde $100 en Mercado Pago (Cuenta Remunerada).",
    donde: "Mercado Pago, Naranja X, Ualá, IOL, PPI, Balanz.",
    pasos: [
      "Descargar Mercado Pago o Naranja X",
      "Crear cuenta (gratis, solo DNI)",
      "Ir a 'Inversiones' o 'Cuenta Remunerada'",
      "Ingresar el monto y confirmar",
    ],
  },

  "Dólar MEP": {
    emoji: "💵",
    tagline: "Comprar dólares de forma legal, sin límite, a través de la bolsa.",
    como_funciona: `MEP significa Mercado Electrónico de Pagos. Es una operación bursátil donde comprás un bono en pesos (AL30), lo vendés en dólares, y listo: tenés dólares en tu cuenta bancaria. Es 100% legal, sin límite de compra, y no necesitás ir a ninguna cueva.`,
    ejemplo: `Si el dólar MEP está a $1.200 y tenés $120.000, podés comprar USD 100 que quedan en tu cuenta bancaria en dólares. Tu dinero quedó dolarizado.`,
    ventajas: [
      "100% legal y dentro del sistema bancario",
      "Sin límite de monto (a diferencia del dólar ahorro)",
      "Precio más barato que el dólar blue",
      "Tus dólares quedan en el banco, no debajo del colchón",
    ],
    desventajas: [
      "Necesitás cuenta en un broker (Mercado Pago no alcanza)",
      "Hay un 'parking' de 24-48hs antes de poder vender",
      "No genera rendimiento por sí solo",
      "Comisión del broker (~0.5%)",
    ],
    para_quien: "Para alguien que quiere dolarizarse de forma segura y legal.",
    minimo: "Desde ~USD 10. Práctico desde USD 100.",
    donde: "IOL (invertironline.com), PPI, Balanz, Bull Market. Necesitás abrir cuenta.",
    pasos: [
      "Abrir cuenta en un broker (IOL, PPI o Balanz — gratis)",
      "Transferir pesos desde tu banco al broker",
      "Buscar 'Dólar MEP' o 'AL30'",
      "Comprar el bono en pesos y venderlo en dólares",
    ],
  },

  "ON dolarizada (corp.)": {
    emoji: "📄",
    tagline: "Prestale plata a una empresa grande y que te la devuelvan en dólares con intereses.",
    como_funciona: `Una Obligación Negociable (ON) es como un préstamo que le hacés a una empresa. Vos comprás el bono, la empresa te paga intereses cada 6 meses (en dólares), y al vencimiento te devuelve el capital.`,
    ejemplo: `Comprás una ON de YPF por USD 1.000 con tasa del 8% anual. Cada 6 meses recibís USD 40 de interés. Al vencimiento (3 años) recibís tus USD 1.000 de vuelta. Total ganado: USD 240.`,
    ventajas: [
      "Rendimiento en dólares (7-10% anual)",
      "Empresas grandes con bajo riesgo (YPF, Pampa, Telecom)",
      "Cupones regulares de interés",
      "Podés venderlas antes del vencimiento",
    ],
    desventajas: [
      "Riesgo de crédito (si la empresa quiebra, podés perder)",
      "Necesitás cuenta en broker",
      "Mínimo de inversión más alto (~USD 100-1000)",
      "Requiere entender algo de bonos",
    ],
    para_quien: "Para quien ya tiene dólares y quiere que rindan más que debajo del colchón.",
    minimo: "Desde ~USD 100 en el mercado secundario.",
    donde: "IOL, PPI, Balanz. Buscá 'ONs dolarizadas' en el buscador de instrumentos.",
    pasos: [
      "Abrir cuenta en broker (IOL, PPI, Balanz)",
      "Tener dólares en la cuenta del broker",
      "Buscar ONs en el buscador de instrumentos",
      "Comprar el bono y esperar los cupones",
    ],
  },

  "Cedears (acciones USA)": {
    emoji: "📈",
    tagline: "Invertí en Apple, Google o Tesla desde Argentina, en pesos.",
    como_funciona: `Los Cedears son certificados que representan acciones de empresas del exterior (Apple, Microsoft, Amazon, Tesla) pero que cotizan en pesos en la bolsa argentina. Su precio sube si sube la acción en el exterior O si sube el dólar.`,
    ejemplo: `Comprás Cedears de Apple (AAPL) por $100.000. Si Apple sube 20% en dólares y el dólar también sube 10%, tus Cedears podrían valer el equivalente a 30% más en pesos. Pero si Apple baja, tus Cedears también bajan.`,
    ventajas: [
      "Acceso a las mejores empresas del mundo desde Argentina",
      "Dolarización indirecta (su precio sigue al dólar)",
      "Alta liquidez — podés comprar y vender cualquier día",
      "Diversificación fácil",
    ],
    desventajas: [
      "Alta volatilidad — pueden bajar mucho en poco tiempo",
      "Requiere horizonte largo (mínimo 2-3 años)",
      "Necesitás cuenta en broker",
      "No recomendado si podés necesitar la plata pronto",
    ],
    para_quien: "Para horizonte largo, con plata que no necesitás en los próximos 2+ años.",
    minimo: "Desde $1.000 en la mayoría de los brokers.",
    donde: "IOL, PPI, Bull Market, Balanz. Buscá el ticker (AAPL, MSFT, AMZN).",
    pasos: [
      "Abrir cuenta en broker (IOL, PPI, Balanz)",
      "Transferir pesos desde tu banco",
      "Buscar el ticker de la empresa (ej: AAPL para Apple)",
      "Comprar y dejar a largo plazo",
    ],
  },

  "Acciones Merval": {
    emoji: "🏛️",
    tagline: "Invertí en empresas argentinas como YPF, Galicia o Loma Negra.",
    como_funciona: `El Merval es el índice de las principales acciones de Argentina. Comprás una fracción de una empresa local. Si la empresa le va bien, tu inversión sube. Si le va mal, baja.`,
    ejemplo: `Comprás acciones de Banco Galicia por $50.000. Si el banco tiene buenos resultados y el mercado sube, tus acciones pueden valer $70.000 en 6 meses. Pero también podrían valer $35.000 si hay una crisis.`,
    ventajas: [
      "Potencial de retorno muy alto",
      "Mercado local — más fácil de seguir las noticias",
      "Alta liquidez en las empresas principales",
    ],
    desventajas: [
      "Muy volátil — riesgo político y económico de Argentina",
      "No recomendado para principiantes como primera inversión",
      "Requiere seguimiento activo",
    ],
    para_quien: "Para inversores con experiencia previa y alta tolerancia al riesgo.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Bull Market, Balanz.",
    pasos: [
      "Tener experiencia previa en inversiones",
      "Abrir cuenta en broker",
      "Estudiar los balances y noticias de la empresa",
      "Invertir solo una parte pequeña del portfolio",
    ],
  },

  "Bitcoin": {
    emoji: "₿",
    tagline: "La criptomoneda más conocida del mundo. Alto riesgo, alto potencial.",
    como_funciona: `Bitcoin es una moneda digital descentralizada, sin banco central ni gobierno detrás. Su precio lo determina la oferta y la demanda global. En Argentina es popular como protección tanto de la inflación como de la devaluación.`,
    ejemplo: `Comprás USD 100 en Bitcoin. Si Bitcoin sube 50% en un año, tenés USD 150. Pero si baja 40%, tenés USD 60. La volatilidad es real: en 2022 bajó 65%, en 2023 subió 150%.`,
    ventajas: [
      "Sin intermediarios ni bancos",
      "Accesible 24/7, desde cualquier lugar",
      "Históricamente sube mucho en ciclos de 4 años",
      "Descentralizado — no puede ser confiscado fácilmente",
    ],
    desventajas: [
      "Volatilidad extrema — puede bajar 50% en meses",
      "Sin respaldo de ningún gobierno o empresa",
      "Regulación incierta en Argentina",
      "Solo para capital que podés permitirte perder",
    ],
    para_quien: "Solo para una pequeña parte del portfolio (5-10% máximo). Nunca toda la plata.",
    minimo: "Desde $100 en Lemon, Belo, Binance, Ripio.",
    donde: "Lemon App, Belo, Ripio, Binance, Bitso.",
    pasos: [
      "Descargar Lemon App o Belo (las más simples)",
      "Crear cuenta con DNI (gratis)",
      "Comprar la cantidad que querés",
      "Nunca invertir más del 10% de tus ahorros",
    ],
  },
}

export const recomendaciones = {
  proteger: ["Plazo fijo UVA", "FCI Money Market", "Dólar MEP"],
  crecer: ["Cedears (acciones USA)", "ON dolarizada (corp.)", "Acciones Merval"],
  dolarizar: ["Dólar MEP", "ON dolarizada (corp.)", "Cedears (acciones USA)"],
  aprender: [
    "FCI Money Market",
    "Plazo fijo tradicional",
    "Plazo fijo UVA",
    "Dólar MEP",
    "ON dolarizada (corp.)",
    "Cedears (acciones USA)",
    "Acciones Merval",
    "Bitcoin",
  ],
}

export const objetivos = [
  {
    id: "proteger",
    emoji: "🛡️",
    titulo: "Proteger mis ahorros de la inflación",
    descripcion: "No quiero perder poder adquisitivo",
  },
  {
    id: "crecer",
    emoji: "📈",
    titulo: "Hacer crecer mi dinero",
    descripcion: "Quiero ganar más de lo que rinde un plazo fijo",
  },
  {
    id: "dolarizar",
    emoji: "💵",
    titulo: "Dolarizarme",
    descripcion: "Quiero tener mis ahorros en dólares fuera del sistema",
  },
  {
    id: "aprender",
    emoji: "🎓",
    titulo: "Aprender antes de decidir",
    descripcion: "Todavía no sé qué me conviene",
  },
]
