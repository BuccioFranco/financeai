// ============================================================
// INSTRUMENTOS DE INVERSIÓN — mercado argentino completo
// ============================================================

export const explicaciones = {

  // ── RENTA FIJA EN PESOS ──────────────────────────────────

  "Plazo fijo tradicional": {
    emoji: "🏦",
    categoria: "Renta fija ARS",
    tagline: "El clásico. Guardás plata en el banco y te pagan un interés fijo.",
    como_funciona: `Depositás tu plata en el banco por un plazo mínimo de 30 días. Al vencimiento te devuelven el capital más un interés pactado desde el inicio. La tasa la fija el banco y no cambia durante el plazo.`,
    ejemplo: `Ponés $100.000 a 30 días con TNA 40% (TEM 3,33%). Al mes recibís $103.333. Si la inflación ese mes fue 4%, perdiste 0,67% de poder adquisitivo en términos reales.`,
    ventajas: [
      "Muy seguro: el Estado garantiza hasta $6.000.000 (SEDESA)",
      "Fácil de hacer desde cualquier app bancaria",
      "No necesitás saber nada de inversiones",
      "Tasa conocida desde el inicio",
    ],
    desventajas: [
      "Casi nunca le gana a la inflación",
      "No podés sacar la plata antes del plazo",
      "El rendimiento real suele ser negativo",
    ],
    para_quien: "Para alguien que quiere empezar sin riesgo y ya tiene cuenta bancaria.",
    minimo: "Desde $1.000 en la mayoría de los bancos.",
    donde: "App de tu banco. No necesitás nada especial.",
    pasos: ["Tener cuenta bancaria", "Ingresar al home banking", "Ir a 'Inversiones' → 'Plazo Fijo'", "Elegir el monto y confirmar"],
  },

  "Plazo fijo UVA": {
    emoji: "🛡️",
    categoria: "Renta fija ARS",
    tagline: "Como el plazo fijo clásico, pero te protege de la inflación.",
    como_funciona: `UVA (Unidad de Valor Adquisitivo) ajusta tu depósito diariamente según el CER (Coeficiente de Estabilización de Referencia), que sigue la inflación oficial del INDEC. Además del ajuste inflacionario, pagás un +1% real anual.`,
    ejemplo: `Ponés $100.000 y la inflación en 90 días fue 15%. Recibís $115.000 + 1% extra = ~$116.150. Tu dinero mantiene poder adquisitivo.`,
    ventajas: [
      "Protege tu capital de la inflación (ajusta por CER)",
      "Garantía SEDESA igual que el plazo fijo clásico",
      "Rendimiento real siempre positivo (~+1% real)",
    ],
    desventajas: [
      "Mínimo 90 días (penalidad si retirás antes)",
      "Si la inflación cae mucho, el clásico puede rendir más",
      "No disponible en todos los bancos",
    ],
    para_quien: "Para quien quiere preservar el poder adquisitivo sin riesgo de mercado.",
    minimo: "Desde $1.000. Consultá con tu banco.",
    donde: "App de tu banco. Buscá 'Plazo fijo UVA' en inversiones.",
    pasos: ["Tener cuenta bancaria", "Ingresar al home banking", "Buscar 'Plazo Fijo UVA'", "Elegir monto (mínimo 90 días) y confirmar"],
  },

  "FCI Money Market": {
    emoji: "💼",
    categoria: "Renta fija ARS",
    tagline: "Como un plazo fijo pero podés sacar la plata cuando querés.",
    como_funciona: `Un Fondo Común de Inversión (FCI) money market invierte en plazos fijos, letras del Tesoro y depósitos de muy corto plazo. La rentabilidad es diaria y acumulativa. Rescate en 24hs hábiles.`,
    ejemplo: `Ponés $50.000 en Mercado Pago. Rinde ~TNA 35% (similar al PF pero con liquidez inmediata). Si necesitás la plata mañana, está disponible.`,
    ventajas: [
      "Liquidez inmediata (rescate en 24hs)",
      "Rinde similar al plazo fijo",
      "Muy bajo riesgo",
      "Disponible desde $100 en apps como Mercado Pago",
    ],
    desventajas: [
      "Rinde un poco menos que el plazo fijo clásico",
      "La tasa varía día a día (no es fija)",
    ],
    para_quien: "Para tener el 'colchón' de emergencia trabajando.",
    minimo: "Desde $100 en Mercado Pago.",
    donde: "Mercado Pago, Naranja X, Ualá, IOL, PPI, Balanz.",
    pasos: ["Descargar Mercado Pago o Naranja X", "Crear cuenta con DNI", "Ir a 'Inversiones'", "Depositar el monto y listo"],
  },

  "LECAP": {
    emoji: "📋",
    categoria: "Renta fija ARS",
    tagline: "Letras del Tesoro: prestale plata al Estado y recibí interés mensual capitalizado.",
    como_funciona: `Las LECAP (Letras del Tesoro Capitalizables en Pesos) son instrumentos de deuda emitidos por el Estado Nacional a corto plazo (menos de 1 año). Pagan una tasa mensual que se capitaliza (se suma al capital) hasta el vencimiento. Se compran con descuento y cobrás el valor nominal al vencimiento.`,
    ejemplo: `Comprás una LECAP con vencimiento en 6 meses a una TNA de 36% (TEM 3%). Si invertís $100.000, al vencimiento recibís aproximadamente $119.400. Si la inflación en ese período fue 18%, tu rendimiento real fue ~+1,2%.`,
    ventajas: [
      "Emitidas por el Estado Nacional (bajo riesgo de crédito soberano)",
      "Tasa conocida desde el inicio — sin sorpresas",
      "Plazos cortos (1 a 12 meses) — podés planificar",
      "Se puede invertir desde $10.000",
      "Liquidez: podés venderlas en el mercado secundario antes del vencimiento",
    ],
    desventajas: [
      "Riesgo soberano: si el Estado reestructura deuda, puede haber pérdidas",
      "Si la inflación supera la TNA, el rendimiento real es negativo",
      "Necesitás cuenta en broker (no disponible en bancos tradicionales)",
    ],
    para_quien: "Para alguien con cuenta en broker que quiere un plazo fijo mejor que el bancario.",
    minimo: "Desde ~$10.000 en el mercado secundario.",
    donde: "IOL (invertironline.com), PPI, Balanz, Cocos, Bull Market. Buscá 'LECAP' o 'letras'.",
    pasos: ["Abrir cuenta en broker (gratis)", "Transferir pesos desde tu banco", "Buscar 'LECAP' en el buscador de instrumentos", "Elegir el vencimiento que querés y comprar"],
  },

  "BONCAP": {
    emoji: "📑",
    categoria: "Renta fija ARS",
    tagline: "Como una LECAP pero de más de un año. Para quien quiere 'lockear' una tasa más tiempo.",
    como_funciona: `Los BONCAP son Bonos del Tesoro Capitalizables en Pesos, idénticos a las LECAPs en su mecánica, pero con vencimientos mayores a 1 año. Capitalizan intereses mensualmente y pagan todo al vencimiento. La diferencia con la LECAP es solo el plazo.`,
    ejemplo: `Comprás un BONCAP a 2 años con TNA 38%. Invertís $100.000 y al vencimiento recibís aproximadamente $207.000. Si la inflación anual promedio fue del 30%, tu capital creció en términos reales.`,
    ventajas: [
      "Tasa fija por más tiempo (protección ante baja de tasas futuras)",
      "Rendimientos superiores a plazos fijos bancarios",
      "Liquidez en mercado secundario",
    ],
    desventajas: [
      "Mayor plazo implica mayor exposición al riesgo soberano",
      "Si las tasas suben, el precio del bono en el mercado secundario baja",
      "Necesitás cuenta en broker",
    ],
    para_quien: "Para quien quiere asegurar una tasa en pesos por más de 1 año.",
    minimo: "Desde ~$10.000.",
    donde: "IOL, PPI, Balanz, Cocos. Buscá 'BONCAP'.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar 'BONCAP' en instrumentos", "Elegir el vencimiento y comprar"],
  },

  "LECER / Bono CER": {
    emoji: "📊",
    categoria: "Renta fija ARS",
    tagline: "Bonos ajustados por inflación oficial. Protección real garantizada.",
    como_funciona: `Los instrumentos CER (Coeficiente de Estabilización de Referencia) ajustan el capital diariamente según la inflación oficial del INDEC. Las LECER son letras cortas (<1 año), los bonos CER (TX28, DICP) son de mayor plazo. Rinden inflación + una tasa real positiva.`,
    ejemplo: `Invertís $100.000 en una LECER. Si la inflación en 6 meses fue 40%, tu capital se ajusta a $140.000 + un spread adicional del 2% real. Total: ~$142.800.`,
    ventajas: [
      "Protección total contra la inflación (ajuste diario por CER)",
      "Rendimiento real positivo garantizado",
      "Instrumentos soberanos con respaldo del Estado",
    ],
    desventajas: [
      "Riesgo de manipulación del IPC oficial del INDEC",
      "En escenarios de desinflación, puede rendir menos que una LECAP fija",
      "Requiere cuenta en broker",
    ],
    para_quien: "Para quien quiere inflación +X% y no confía en que una tasa fija le gane a la inflación.",
    minimo: "Desde ~$10.000.",
    donde: "IOL, PPI, Balanz, Cocos. Buscá 'LECER', 'TX28', 'DICP'.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar LECER o bonos CER", "Comprar el instrumento"],
  },

  "Caución bursátil": {
    emoji: "⏱️",
    categoria: "Renta fija ARS",
    tagline: "Prestás plata por días y cobrás interés. Como un plazo fijo de 1 a 7 días.",
    como_funciona: `La caución bursátil es un préstamo de muy corto plazo entre inversores operado en BYMA (la bolsa). Prestás tu dinero por 1 a 120 días y el tomador deja activos en garantía. La operación es garantizada por la bolsa, por lo que el riesgo de default es prácticamente nulo.`,
    ejemplo: `Ponés $100.000 en una caución a 7 días con TNA 25%. Ganás $100.000 × 0,25 × 7/365 = ~$479 en una semana. Anualizado sería un rendimiento del 25%, aunque la tasa varía día a día.`,
    ventajas: [
      "Plazo muy corto (desde 1 día) — liquidez casi inmediata",
      "Garantizado por BYMA — riesgo de crédito mínimo",
      "Suele rendir igual o mejor que el plazo fijo",
      "Ideal para manejar liquidez de corto plazo",
    ],
    desventajas: [
      "La tasa varía todos los días (no podés planificar rendimiento exacto)",
      "Requiere cuenta en broker",
      "No es apta para inversores que no monitorean",
    ],
    para_quien: "Para inversores con broker que quieren que su liquidez genere rendimiento mientras esperan una oportunidad.",
    minimo: "Varía según el broker. IOL y PPI desde $1.000.",
    donde: "IOL, PPI, Balanz, Cocos, Bull Market. Sección 'Cauciones'.",
    pasos: ["Tener cuenta en broker con pesos disponibles", "Ir a la sección 'Cauciones'", "Elegir el plazo (1, 7, 30 días)", "Colocar el monto y confirmar"],
  },

  "FCI Renta Fija": {
    emoji: "📈",
    categoria: "Renta fija ARS",
    tagline: "Un gestor profesional invierte en bonos y letras por vos.",
    como_funciona: `Los FCI de renta fija invierten en bonos del Estado y corporativos, letras (LECAP, LECER), y otros instrumentos de renta fija. Un equipo profesional los gestiona. Tu dinero se diversifica automáticamente entre muchos activos.`,
    ejemplo: `Invertís $200.000 en un FCI de renta fija. El fondo tiene bonos CER, LECAP y ONs corporativas. En un año el fondo rindió 45% nominal, mientras que la inflación fue 30%. Tu rendimiento real fue +11,5%.`,
    ventajas: [
      "Gestión profesional — no necesitás elegir bonos vos",
      "Diversificación automática",
      "Acceso a instrumentos que de otro modo requerirían más capital",
      "Rescate en 48-72hs hábiles generalmente",
    ],
    desventajas: [
      "Comisión de administración (fee anual del fondo)",
      "Rendimiento variable — no conocés el retorno de antemano",
      "Menor liquidez que un money market",
    ],
    para_quien: "Para inversores que quieren más que un plazo fijo pero sin gestionar bonos individualmente.",
    minimo: "Desde $1.000 en la mayoría de los brokers.",
    donde: "IOL, PPI, Balanz, Cocos, Banco Galicia, BBVA. Sección 'Fondos' → 'Renta Fija'.",
    pasos: ["Abrir cuenta en broker o ir al banco", "Buscar fondos de renta fija", "Elegir el fondo por rendimiento histórico y fee", "Suscribir el monto deseado"],
  },

  "FCI Renta Mixta": {
    emoji: "⚖️",
    categoria: "Renta variable ARS",
    tagline: "Mitad bonos, mitad acciones. Equilibrio entre rendimiento y riesgo.",
    como_funciona: `Los FCI de renta mixta combinan inversiones en instrumentos de renta fija (bonos, letras) y renta variable (acciones). El porcentaje varía según el fondo, pero típicamente es 40-60% entre ambos. Un gestor ajusta la combinación según el mercado.`,
    ejemplo: `Invertís $300.000 en un FCI mixto. El 50% está en bonos CER y el 50% en acciones del Merval. En un año bueno para el mercado, el fondo rindió 80% nominal vs 30% de inflación → +38% real.`,
    ventajas: [
      "Diversificación entre bonos y acciones",
      "Acceso a potencial de renta variable con amortiguador de renta fija",
      "Gestión profesional",
    ],
    desventajas: [
      "Mayor volatilidad que los fondos de renta fija",
      "Comisiones más altas",
      "Rendimiento impredecible",
    ],
    para_quien: "Para horizonte de 1-3 años con algo más de tolerancia al riesgo.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Balanz, BBVA, Banco Galicia.",
    pasos: ["Abrir cuenta en broker o banco", "Buscar 'FCI renta mixta'", "Comparar rendimientos históricos a 1 y 3 años", "Suscribir"],
  },

  // ── DOLARIZACIÓN ─────────────────────────────────────────

  "Dólar MEP": {
    emoji: "💵",
    categoria: "Dolarización",
    tagline: "Comprar dólares de forma legal, sin límite, a través de la bolsa.",
    como_funciona: `MEP = Mercado Electrónico de Pagos. Comprás un bono (como el AL30) en pesos, lo "parqueás" 24hs (parking obligatorio) y luego lo vendés en dólares. Tus dólares quedan en tu cuenta bancaria local. 100% legal, sin límite de monto.`,
    ejemplo: `Con $1.200.000 al tipo MEP de $1.200 comprás USD 1.000. Al otro día tenés los dólares en tu cuenta bancaria en Argentina.`,
    ventajas: [
      "100% legal — dentro del sistema bancario",
      "Sin límite de monto (a diferencia del dólar ahorro)",
      "Precio más bajo que el blue",
      "Dólares en cuenta bancaria — seguros",
    ],
    desventajas: [
      "Parking de 24-48hs antes de poder operar nuevamente",
      "Necesitás cuenta en broker",
      "No genera rendimiento (es dolarización, no inversión)",
      "Comisión del broker (~0,5%)",
    ],
    para_quien: "Para dolarizarse de forma segura y legal.",
    minimo: "Desde ~USD 10. Práctico desde USD 100.",
    donde: "IOL, PPI, Balanz, Bull Market, Cocos.",
    pasos: ["Abrir cuenta en broker (gratis, lleva 1-2 días)", "Transferir pesos al broker", "Comprar el bono (AL30) en pesos", "Esperar 24hs y venderlo en dólares"],
  },

  "Dólar CCL": {
    emoji: "🌐",
    categoria: "Dolarización",
    tagline: "Como el MEP pero los dólares salen al exterior. Para dolarización offshore.",
    como_funciona: `CCL = Contado con Liquidación. Similar al MEP pero los dólares se acreditan en una cuenta en el exterior (como Schwab, Interactive Brokers). La diferencia es que los fondos 'liquidan' fuera de Argentina. El CCL suele cotizar ligeramente más alto que el MEP.`,
    ejemplo: `Vendés el AL30 en el exterior (en USD) en lugar de en Argentina. Tus dólares quedan en una cuenta fuera del país. Cotización en mayo 2026: ~$1.495 vs MEP ~$1.443.`,
    ventajas: [
      "Dólares fuera del sistema financiero argentino",
      "Acceso a cuentas y brokers internacionales",
      "100% legal",
    ],
    desventajas: [
      "Requiere cuenta bancaria en el exterior",
      "Más complejo que el MEP",
      "Cotización un poco más alta que el MEP",
    ],
    para_quien: "Para quien quiere sus dólares fuera del alcance del sistema argentino.",
    minimo: "Desde USD 100. Requiere cuenta en banco/broker del exterior.",
    donde: "IOL, PPI, Balanz. Necesitás cuenta exterior activa.",
    pasos: ["Tener cuenta en banco exterior (Schwab, Interactive Brokers)", "Abrir cuenta en broker local", "Comprar bono en pesos", "Venderlo en el exterior contra dólares"],
  },

  // ── RENTA FIJA USD ────────────────────────────────────────

  "ON dolarizada (corp.)": {
    emoji: "📄",
    categoria: "Renta fija USD",
    tagline: "Prestale plata a una empresa grande y cobrá cupones en dólares.",
    como_funciona: `Una Obligación Negociable (ON) es deuda corporativa. La empresa emite el bono, vos comprás, ella te paga intereses semestrales en USD y al vencimiento te devuelve el capital. Empresas como YPF, Pampa Energía, Telecom las emiten regularmente.`,
    ejemplo: `Comprás una ON de YPF por USD 1.000 con TNA 8%. Cada 6 meses recibís USD 40. En 3 años recibiste USD 240 de intereses + tus USD 1.000 de vuelta. Rendimiento total en USD: 24%.`,
    ventajas: [
      "Rendimiento en dólares (7-10% anual)",
      "Empresas grandes con historial de pagos",
      "Cupones regulares de interés en USD",
      "Mercado secundario disponible",
    ],
    desventajas: [
      "Riesgo crediticio (si la empresa no puede pagar)",
      "Necesitás cuenta en broker",
      "Mínimo de inversión más alto (~USD 100-1.000)",
    ],
    para_quien: "Para quien tiene dólares y quiere rendimiento en USD con riesgo moderado.",
    minimo: "Desde ~USD 100 en mercado secundario.",
    donde: "IOL, PPI, Balanz. Buscá 'ONs dolarizadas'.",
    pasos: ["Abrir cuenta en broker", "Tener o comprar dólares MEP", "Buscar ONs corporativas disponibles", "Comprar y esperar los cupones semestrales"],
  },

  "Bono soberano USD (AL30/GD30)": {
    emoji: "🇦🇷",
    categoria: "Renta fija USD",
    tagline: "Bonos del Estado argentino en dólares. Alto riesgo, alto rendimiento potencial.",
    como_funciona: `AL30 y GD30 son bonos soberanos surgidos de la reestructuración de deuda de 2020. Ambos vencen en 2030 y pagan cupones semestrales en dólares (enero y julio). La diferencia: AL30 es bajo ley argentina, GD30 bajo ley extranjera (Nueva York). El GD30 ofrece más protección legal al inversor.`,
    ejemplo: `Comprás USD 1.000 en AL30 que cotiza a 60 centavos por dólar nominal. Pagás USD 600. A lo largo de su vida recibís cupones y amortizaciones en USD. Si el riesgo país baja y el bono sube a 80 centavos, tu inversión subió a USD 800 (+33%).`,
    ventajas: [
      "Alta liquidez — se opera diariamente en grandes volúmenes",
      "Potencial de ganancia de capital si el riesgo país baja",
      "Pago de cupones semestrales en dólares",
      "GD30 con legislación extranjera (mayor protección)",
    ],
    desventajas: [
      "Riesgo soberano elevado (Argentina tiene historial de defaults)",
      "Alta volatilidad en el precio",
      "No recomendado para inversor conservador",
    ],
    para_quien: "Para inversores que apuestan a la mejora macro de Argentina con horizonte 2-5 años.",
    minimo: "Desde USD 50-100.",
    donde: "IOL, PPI, Balanz, Bull Market. Buscá 'AL30', 'GD30', 'AL35', 'GD35'.",
    pasos: ["Abrir cuenta en broker", "Comprar dólares MEP", "Buscar el bono (AL30 o GD30)", "Comprar y monitorear el riesgo país"],
  },

  "Bono dollar-linked": {
    emoji: "🔗",
    categoria: "Renta fija USD",
    tagline: "Invertís en pesos pero el capital sigue al tipo de cambio oficial.",
    como_funciona: `Los bonos dollar-linked se emiten en pesos pero su capital se ajusta por la variación del tipo de cambio oficial. Si el dólar oficial sube 30%, tu capital sube 30%. Son emitidos por el Estado o empresas como cobertura cambiaria. Útiles si esperás una devaluación.`,
    ejemplo: `Invertís $100.000 en un bono dollar-linked cuando el dólar oficial está en $1.000. Si en 1 año el oficial sube a $1.300, tu capital se convierte en $130.000 + el spread de tasa adicional.`,
    ventajas: [
      "Cobertura frente a devaluación del peso",
      "Se opera en pesos (sin necesidad de tener USD)",
      "Tasa adicional sobre el ajuste cambiario",
    ],
    desventajas: [
      "Ajusta por tipo de cambio OFICIAL (no MEP ni blue)",
      "Si el gobierno retrasa el tipo oficial, rendís poco",
      "Riesgo soberano o crediticio del emisor",
    ],
    para_quien: "Para quien tiene pesos y quiere cubrirse de una posible devaluación del oficial.",
    minimo: "Desde $10.000 en broker.",
    donde: "IOL, PPI, Balanz. Buscá 'TV25', 'T2V5' u otros tickers dollar-linked.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar bonos dollar-linked disponibles", "Comprar con horizonte de al menos 6 meses"],
  },

  // ── RENTA VARIABLE ────────────────────────────────────────

  "Cedears (acciones USA)": {
    emoji: "📈",
    categoria: "Renta variable USD",
    tagline: "Invertí en Apple, Google o Tesla desde Argentina, en pesos.",
    como_funciona: `Los Cedears son certificados de depósito que representan acciones de empresas extranjeras (Apple, Microsoft, Amazon, Tesla) pero cotizan en pesos en BYMA. Su precio sigue tanto la cotización del activo subyacente como el tipo de cambio implícito (CCL). Comprás en pesos, pero el valor real es en USD.`,
    ejemplo: `Comprás CEDEARs de Apple (AAPL) por $200.000. Si Apple sube 20% en USD y el CCL sube 15%, tus CEDEARs podrían valer $268.000 (+34%). Pero si Apple cae 20%, valen $160.000.`,
    ventajas: [
      "Acceso a las mejores empresas del mundo desde Argentina en pesos",
      "Dolarización indirecta (el precio sigue al CCL)",
      "Alta liquidez bursátil",
      "Diversificación global",
    ],
    desventajas: [
      "Alta volatilidad — pueden caer mucho en poco tiempo",
      "Requiere horizonte largo (2-3 años mínimo)",
      "Necesitás cuenta en broker",
    ],
    para_quien: "Para horizontes largos con plata que no necesitás en los próximos 2+ años.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Balanz, Bull Market, Banco Galicia.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar el ticker (AAPL, MSFT, AMZN, NVDA, GOOGL)", "Comprar y mantener a largo plazo"],
  },

  "CEDEARs de ETFs (SPY/QQQ)": {
    emoji: "🌍",
    categoria: "Renta variable USD",
    tagline: "Invertí en las 500 mejores empresas del mundo con un solo instrumento.",
    como_funciona: `Los CEDEARs de ETFs son certificados que replican fondos cotizados (ETFs) de Estados Unidos. SPY replica las 500 principales empresas de EEUU (S&P 500), QQQ las 100 del Nasdaq. En vez de elegir una empresa, comprás un "canasto" de cientos. El ratio del SPY es 20:1 (20 CEDEARs = 1 unidad de SPY).`,
    ejemplo: `Comprás CEDEARs de SPY por $300.000. Si el S&P500 sube 15% en USD y el CCL sube 10%, tus CEDEARs podrían valer ~$379.500. Estás invertido en empresas como Apple, Microsoft, Amazon, Google, etc. automáticamente.`,
    ventajas: [
      "Diversificación máxima — cientos de empresas en 1 instrumento",
      "Históricamente el S&P500 rinde ~10% anual en USD a largo plazo",
      "Menos riesgo que una sola empresa",
      "Sin necesidad de elegir acciones individualmente",
    ],
    desventajas: [
      "Alta volatilidad a corto plazo",
      "Si el mercado americano cae, vos caés también",
      "Requiere horizonte largo",
    ],
    para_quien: "Para quien quiere invertir a largo plazo en la economía americana sin complicaciones.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Balanz, Bull Market. Buscá 'SPY', 'QQQ', 'GLD'.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar 'SPY' o 'QQQ' en el buscador", "Comprar y dejar al menos 3-5 años"],
  },

  "Oro (GLD CEDEAR)": {
    emoji: "🥇",
    categoria: "Renta variable USD",
    tagline: "El refugio de valor histórico. Ahora disponible en pesos desde la bolsa argentina.",
    como_funciona: `Desde diciembre 2024, BYMA habilitó el CEDEAR del ETF GLD (SPDR Gold Shares), que replica el precio del oro físico guardado en bóvedas en Londres, Zurich y Nueva York. Comprás en pesos pero el valor sigue al oro en USD. Libre de impuesto a las ganancias sobre plusvalías en Argentina.`,
    ejemplo: `Comprás GLD CEDEARs por $500.000 cuando el oro está en USD 2.500/oz. Si el oro sube a USD 3.000 (+20%) y el CCL sube 10%, tus CEDEARs podrían valer ~$660.000. En 2025 el oro subió más del 18%.`,
    ventajas: [
      "Refugio de valor ante crisis, inflación y devaluaciones",
      "Sin impuesto a las ganancias en Argentina",
      "Liquidez bursátil (se vende en cualquier momento)",
      "Respaldado por oro físico real",
      "No requiere custodiar lingotes físicamente",
    ],
    desventajas: [
      "No genera intereses ni dividendos",
      "Precio puede caer si hay calma en los mercados globales",
      "Comisión del ETF (0,40% anual)",
    ],
    para_quien: "Para diversificar y tener cobertura ante crisis globales y locales.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Balanz, Rava. Buscá 'GLD'.",
    pasos: ["Abrir cuenta en broker", "Transferir pesos", "Buscar 'GLD' en el buscador de CEDEARs", "Comprar y mantener como reserva de valor"],
  },

  "Acciones Merval": {
    emoji: "🏛️",
    categoria: "Renta variable ARS",
    tagline: "Invertí en empresas argentinas como YPF, Galicia o Loma Negra.",
    como_funciona: `El Merval es el índice de las principales acciones argentinas. Comprás participación en empresas locales. Sectores: energía (YPF, Pampa), bancos (Galicia, Macro), materiales (Loma Negra, Ternium), utilities (Edenor, Transener). Alta volatilidad correlacionada con el riesgo político.`,
    ejemplo: `Comprás $100.000 en Banco Galicia (GGAL). Si el sector bancario tiene buenos resultados y el Merval sube 40% en el año, tenés $140.000. Pero si hay una crisis política, podrías tener $60.000.`,
    ventajas: [
      "Potencial de retorno muy alto en ciclos favorables",
      "Empresas líderes en sus sectores",
      "Alta liquidez en acciones del panel líder",
    ],
    desventajas: [
      "Muy volátil — riesgo político y macro de Argentina",
      "No recomendado como primera inversión",
      "Requiere seguimiento activo",
    ],
    para_quien: "Para inversores con experiencia y alta tolerancia al riesgo.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Bull Market, Balanz.",
    pasos: ["Tener experiencia previa", "Abrir cuenta en broker", "Estudiar los balances", "Invertir solo una parte pequeña del portfolio"],
  },

  "FCI Renta Variable": {
    emoji: "🚀",
    categoria: "Renta variable ARS",
    tagline: "Un fondo invierte en acciones argentinas y globales por vos.",
    como_funciona: `Los FCI de renta variable invierten principalmente en acciones (Merval, CEDEARs, y acciones extranjeras). Un equipo profesional selecciona y gestiona las empresas. Son los fondos de mayor riesgo pero también de mayor potencial de retorno a largo plazo.`,
    ejemplo: `Invertís $500.000 en un FCI de renta variable. El fondo tiene YPF, Galicia, CEDEARs de Apple y SPY. En un año excelente para el Merval, el fondo rinde 120%. En un año malo, cae 40%.`,
    ventajas: [
      "Gestión profesional de acciones",
      "Diversificación entre mercados locales e internacionales",
      "Potencial de retorno más alto que otros FCIs",
    ],
    desventajas: [
      "Alta volatilidad — puede caer mucho en el corto plazo",
      "Comisiones más altas",
      "Solo para horizontes de 3+ años",
    ],
    para_quien: "Para inversores con horizonte largo (3-5 años) y alta tolerancia al riesgo.",
    minimo: "Desde $1.000.",
    donde: "IOL, PPI, Balanz, BBVA, Banco Galicia.",
    pasos: ["Abrir cuenta en broker o banco", "Buscar 'FCI renta variable'", "Revisar rendimiento histórico a 3 y 5 años", "Suscribir y no mirar por al menos 2 años"],
  },

  // ── ALTERNATIVOS ─────────────────────────────────────────

  "Fideicomiso inmobiliario": {
    emoji: "🏗️",
    categoria: "Alternativos",
    tagline: "Invertí en real estate desde USD 100 sin comprar un departamento entero.",
    como_funciona: `Un fideicomiso inmobiliario es un vehículo legal que agrupa el capital de muchos inversores para financiar proyectos de construcción o renta de inmuebles. El fiduciario (un banco o empresa autorizada) administra el dinero y los bienes. Las FIIBRA son la versión argentina de los REITs americanos, habilitadas por la CNV.`,
    ejemplo: `Invertís USD 1.000 en un fideicomiso de construcción de departamentos en Palermo. Al finalizar el proyecto (2-3 años), recibís tu capital más la ganancia por la venta de las unidades, que históricamente es del 15-25% en USD.`,
    ventajas: [
      "Acceso al real estate desde montos pequeños (desde USD 100-1.000)",
      "Activo real que protege contra la inflación",
      "Diversificación fuera del sistema financiero",
      "Regulado por la CNV (seguridad jurídica)",
    ],
    desventajas: [
      "Baja liquidez — el dinero queda inmovilizado por 2-4 años",
      "Riesgo de construcción (delays, sobrecostos)",
      "Riesgo del desarrollador",
      "Mercado inmobiliario argentino complejo",
    ],
    para_quien: "Para quien tiene USD y quiere diversificar en real estate sin comprar una propiedad entera.",
    minimo: "Desde USD 100 en plataformas como Simplestate. Desde USD 1.000 en fideicomisos clásicos.",
    donde: "Simplestate.app, Berserkersfinance.com, brokers autorizados por la CNV.",
    pasos: ["Investigar el desarrollador y el proyecto", "Abrir cuenta en la plataforma", "Firmar el contrato de fideicomiso", "Invertir y esperar el plazo del proyecto"],
  },

  "Cheques de pago diferido (CHEPED)": {
    emoji: "📝",
    categoria: "Alternativos",
    tagline: "Comprás cheques de empresas con descuento y cobrás el valor completo al vencimiento.",
    como_funciona: `Los Cheques de Pago Diferido (CHEPED) y Echeqs son instrumentos por los que las empresas garantizan un pago futuro. En el mercado de capitales, las empresas venden estos cheques con descuento para obtener liquidez. Vos los comprás a precio reducido y cobrás el valor nominal al vencimiento (30 a 360 días).`,
    ejemplo: `Comprás un CHEPED de una empresa industrial por $90.000 que vence en 90 días y vale $100.000. Ganás $10.000 (11,1% en 90 días = ~44% TNA). La empresa obtuvo liquidez inmediata.`,
    ventajas: [
      "Tasas elevadas (similares o superiores al plazo fijo)",
      "Plazos cortos (30 a 360 días)",
      "Garantía del cheque: si la empresa no paga, podés ejecutarla judicialmente",
      "Diversificación entre múltiples empresas",
    ],
    desventajas: [
      "Riesgo de crédito de la empresa emisora",
      "Menor liquidez que otros instrumentos",
      "Más complejo de operar para principiantes",
      "Requiere cuenta en broker",
    ],
    para_quien: "Para inversores que buscan tasas más altas y entienden el riesgo crediticio.",
    minimo: "Varía. Desde $5.000-10.000 en plataformas especializadas.",
    donde: "IOL, PPI, Balanz, Criteria. Sección 'Cheques' o 'CHEPED'.",
    pasos: ["Abrir cuenta en broker habilitado", "Buscar cheques disponibles y analizar la empresa emisora", "Comprar el cheque a precio de descuento", "Cobrar al vencimiento automáticamente"],
  },
}

// ============================================================
// GLOSARIO FINANCIERO
// ============================================================

export const glosario = [
  {
    termino: "TNA",
    nombre_completo: "Tasa Nominal Anual",
    definicion: "La tasa de interés expresada en términos anuales sin incluir la capitalización. Es la que aparece en los anuncios de plazo fijo. Ejemplo: TNA 40% significa que nominalmente ganás 40% en un año, pero la tasa mensual real es 40%/12 = 3,33% mensual.",
    ejemplo: "Un plazo fijo con TNA 40% a 30 días paga: $100.000 × 40% × 30/365 = $3.288.",
  },
  {
    termino: "TEA",
    nombre_completo: "Tasa Efectiva Anual",
    definicion: "La tasa de interés real que ganás en un año considerando la capitalización compuesta. Siempre es mayor que la TNA (excepto si se capitaliza anualmente). Si colocás y renovás mensualmente con TNA 40%, la TEA es aproximadamente 49,4%.",
    ejemplo: "TNA 40% capitalizada mensualmente → TEA = (1 + 0,40/12)^12 - 1 = 49,4%.",
  },
  {
    termino: "TEM",
    nombre_completo: "Tasa Efectiva Mensual",
    definicion: "La tasa de interés que corresponde a un mes. Se calcula como TNA/12 para tasas simples, o (1+TEA)^(1/12)-1 para tasas compuestas. Es útil para comparar instrumentos de corto plazo.",
    ejemplo: "Con TNA 36%: TEM = 36%/12 = 3% mensual. Con $100.000 ganás $3.000 en 30 días.",
  },
  {
    termino: "CER",
    nombre_completo: "Coeficiente de Estabilización de Referencia",
    definicion: "Índice del BCRA que refleja la inflación diaria basado en el IPC del INDEC. Los instrumentos CER ajustan su capital por este coeficiente. Si el CER sube 5% en un mes, el capital de tu bono CER también sube 5%.",
    ejemplo: "Tenés $100.000 en un bono CER. Si la inflación en 3 meses fue 15%, tu capital se convierte en $115.000 automáticamente.",
  },
  {
    termino: "UVA",
    nombre_completo: "Unidad de Valor Adquisitivo",
    definicion: "Unidad de medida creada por el BCRA que representa el costo de 1/1000 de un metro cuadrado de construcción estándar. Ajusta por inflación (CER). Los plazos fijos UVA y los créditos hipotecarios UVA usan esta unidad. 1 UVA arrancó en $14,05 en 2016 y hoy supera los $700.",
    ejemplo: "Un plazo fijo UVA de $100.000 equivale a X UVAs. Al vencimiento recibís esas mismas UVAs valoradas al precio actual, que incluye la inflación del período.",
  },
  {
    termino: "MEP",
    nombre_completo: "Mercado Electrónico de Pagos",
    definicion: "Tipo de cambio implícito que surge de comprar un bono en pesos y venderlo en dólares dentro del sistema bursátil argentino. Los dólares quedan en una cuenta bancaria local. Es legal y sin límite de compra.",
    ejemplo: "Si un bono vale $1.200 en pesos y USD 1 en dólares, el tipo de cambio MEP implícito es $1.200/USD.",
  },
  {
    termino: "CCL",
    nombre_completo: "Contado con Liquidación",
    definicion: "Similar al MEP pero los dólares se acreditan en una cuenta bancaria fuera de Argentina. Suele cotizar 3-5% más alto que el MEP porque implica la salida efectiva de divisas del país.",
    ejemplo: "MEP ~$1.443, CCL ~$1.496 (mayo 2026). La diferencia es la prima por sacar dólares al exterior.",
  },
  {
    termino: "Riesgo País / EMBI",
    nombre_completo: "Emerging Markets Bond Index",
    definicion: "Indicador de JP Morgan que mide el sobrecosto que paga Argentina para endeudarse en dólares respecto a los bonos del Tesoro de EEUU. Se expresa en puntos básicos. 100 puntos = 1% extra de tasa. Cuanto más bajo, mejor para el país y para los bonos argentinos.",
    ejemplo: "Si los bonos de EEUU rinden 4% y Argentina paga 9%, el riesgo país es 500 puntos. En mayo 2026 ronda los 539 puntos.",
  },
  {
    termino: "SEDESA",
    nombre_completo: "Seguro de Depósitos S.A.",
    definicion: "Fondo estatal que garantiza los depósitos bancarios en Argentina hasta $6.000.000 por persona por entidad. Cubre plazos fijos, cuentas corrientes y cajas de ahorro ante quiebra del banco.",
    ejemplo: "Si el banco donde tenés tu plazo fijo quiebra, el Estado te devuelve hasta $6.000.000 a través de SEDESA.",
  },
  {
    termino: "BYMA",
    nombre_completo: "Bolsas y Mercados Argentinos",
    definicion: "La principal bolsa de valores de Argentina, formada por la fusión del MERVAL y el BCBA. Aquí se operan acciones, bonos, CEDEARs, cauciones y derivados.",
    ejemplo: "Cuando comprás una acción de YPF o un CEDEAR de Apple, la operación se realiza a través de BYMA.",
  },
  {
    termino: "ALyC / Broker",
    nombre_completo: "Agente de Liquidación y Compensación",
    definicion: "Las entidades autorizadas por la CNV para operar en el mercado de capitales. Son los 'brokers' argentinos. Ejemplos: IOL, PPI, Balanz, Cocos, Bull Market, Rava. Necesitás cuenta en uno para operar bonos, acciones o CEDEARs.",
    ejemplo: "Para comprar CEDEARs de Apple necesitás abrir una cuenta comitente en un ALyC como IOL o PPI (es gratis y lleva 1-2 días).",
  },
  {
    termino: "CNV",
    nombre_completo: "Comisión Nacional de Valores",
    definicion: "El regulador del mercado de capitales argentino. Supervisa brokers, fondos de inversión, fideicomisos financieros y todo lo que opera en bolsa. Si un instrumento o broker está regulado por la CNV, tiene cierto nivel de supervisión formal.",
    ejemplo: "Antes de invertir en un fondo o broker, verificá que estén registrados en la CNV en cnv.gob.ar.",
  },
  {
    termino: "BCRA",
    nombre_completo: "Banco Central de la República Argentina",
    definicion: "La autoridad monetaria de Argentina. Fija la tasa de política monetaria, regula el tipo de cambio oficial, administra las reservas y supervisa el sistema bancario. Sus decisiones afectan directamente las tasas de los plazos fijos y la inflación.",
    ejemplo: "Cuando el BCRA sube o baja la tasa de política monetaria, los bancos ajustan las tasas de plazo fijo en la misma dirección.",
  },
  {
    termino: "Rendimiento real",
    nombre_completo: "Rendimiento real (descontando inflación)",
    definicion: "El rendimiento verdadero de una inversión una vez descontada la inflación. Fórmula simplificada: Rendimiento real ≈ Rendimiento nominal - Inflación. Si ganás 40% pero la inflación fue 45%, perdiste 5% de poder adquisitivo.",
    ejemplo: "Plazo fijo TNA 38%, inflación anual 42% → Rendimiento real ≈ -4%. Perdiste poder adquisitivo.",
  },
  {
    termino: "Duration",
    nombre_completo: "Duración de un bono",
    definicion: "Mide la sensibilidad del precio de un bono ante cambios en la tasa de interés. A mayor duration, más cae el precio del bono si suben las tasas. Un bono con duration 3 cae aproximadamente 3% si las tasas suben 1%.",
    ejemplo: "Si tenés un bono con duration 5 y las tasas suben 2%, el precio del bono cae ~10%. Por eso los bonos largos son más riesgosos ante subas de tasas.",
  },
  {
    termino: "Carry trade",
    nombre_completo: "Carry trade (estrategia de tasa)",
    definicion: "Estrategia de inversión que consiste en endeudarse (o vender) en una moneda de baja tasa para invertir en una de alta tasa. En Argentina, es común el 'carry en pesos': mantener inversiones en pesos para aprovechar altas tasas nominales mientras el tipo de cambio está relativamente estable.",
    ejemplo: "Invertís en LECAPs al 40% TNA y el dólar no se mueve. Si el dólar sube menos del 40%, ganás en términos de dólares. Si sube más, perdés.",
  },
  {
    termino: "Parking",
    nombre_completo: "Período de parking (inmovilización)",
    definicion: "La espera obligatoria de 24-48 horas entre la compra de un bono en pesos y su venta en dólares (operaciones MEP/CCL). Es una regulación del BCRA para evitar el arbitraje inmediato.",
    ejemplo: "Comprás AL30 en pesos el lunes. Tenés que esperar hasta el miércoles para poder venderlos en dólares y concretar el MEP.",
  },
  {
    termino: "Cuenta comitente",
    nombre_completo: "Cuenta comitente",
    definicion: "La cuenta que abrís en un broker (ALyC) para operar en el mercado de capitales. Es gratuita y diferente de tu cuenta bancaria. Desde ella podés comprar acciones, bonos, CEDEARs, cauciones, etc.",
    ejemplo: "Abrís una cuenta comitente en IOL, transferís pesos desde tu banco, y ya podés comprar CEDEARs de Apple.",
  },
  {
    termino: "Licitación primaria",
    nombre_completo: "Licitación primaria del Tesoro",
    definicion: "Proceso por el cual el Estado emite nuevas letras o bonos directamente al mercado. Los brokers participan en la licitación y los inversores pueden acceder a los instrumentos recién emitidos, a veces con mejores precios que en el mercado secundario.",
    ejemplo: "El Tesoro licita LECAPs el primer miércoles de cada mes. Tu broker puede anotarte para recibir las letras al precio de corte de la licitación.",
  },
]

// ============================================================
// RECOMENDACIONES POR OBJETIVO
// ============================================================

export const recomendaciones = {
  proteger: ["Plazo fijo UVA", "LECER / Bono CER", "FCI Money Market", "Dólar MEP"],
  crecer: ["CEDEARs de ETFs (SPY/QQQ)", "Cedears (acciones USA)", "LECAP", "ON dolarizada (corp.)"],
  dolarizar: ["Dólar MEP", "ON dolarizada (corp.)", "Bono soberano USD (AL30/GD30)", "Dólar CCL"],
  aprender: [
    "FCI Money Market",
    "Plazo fijo tradicional",
    "Plazo fijo UVA",
    "LECAP",
    "Caución bursátil",
    "Dólar MEP",
    "FCI Renta Fija",
    "ON dolarizada (corp.)",
    "CEDEARs de ETFs (SPY/QQQ)",
    "Cedears (acciones USA)",
    "Acciones Merval",
  ],
}

// ============================================================
// OBJETIVOS DEL ONBOARDING
// ============================================================

export const objetivos = [
  { id: "proteger", emoji: "🛡️", titulo: "Proteger mis ahorros de la inflación", descripcion: "No quiero perder poder adquisitivo" },
  { id: "crecer", emoji: "📈", titulo: "Hacer crecer mi dinero", descripcion: "Quiero ganar más de lo que rinde un plazo fijo" },
  { id: "dolarizar", emoji: "💵", titulo: "Dolarizarme", descripcion: "Quiero tener mis ahorros en dólares fuera del sistema" },
  { id: "aprender", emoji: "🎓", titulo: "Aprender antes de decidir", descripcion: "Todavía no sé qué me conviene" },
]

// ============================================================
// CATEGORÍAS PARA FILTRADO
// ============================================================

export const categorias = [
  { id: "todas", label: "Todos", emoji: "📦" },
  { id: "Renta fija ARS", label: "Renta fija $", emoji: "🏦" },
  { id: "Dolarización", label: "Dolarización", emoji: "💵" },
  { id: "Renta fija USD", label: "Renta fija USD", emoji: "📄" },
  { id: "Renta variable USD", label: "Renta variable USD", emoji: "📈" },
  { id: "Renta variable ARS", label: "Renta variable $", emoji: "🏛️" },
  { id: "Alternativos", label: "Alternativos", emoji: "🏗️" },
]
