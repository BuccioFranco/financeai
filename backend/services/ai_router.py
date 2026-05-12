import re
from enum import Enum
from services.ollama_service import OllamaService
from services.groq_service import GroqService


class AIModel(Enum):
    OLLAMA = "ollama"
    GROQ = "groq"


COMPLEX_KEYWORDS = [
    r"conviene|deber[ií]a|recomend[áa]s|qu[eé] hago|estrategia",
    r"portafolio|cartera|diversific",
    r"inflaci[oó]n.*proyecci[oó]n|proyecci[oó]n.*inflaci[oó]n",
    r"cedear|merval|bono|on dolarizada|obligaci[oó]n",
    r"comparar|versus|vs\.?",
    r"cu[aá]nto pierdo|cu[aá]nto gano|rendimiento real",
    r"largo plazo|mediano plazo",
    r"riesgo|volatilidad",
    r"comprar.*dólar|vender.*pesos|pasarme a",
]


def classify(query: str) -> AIModel:
    q = query.lower()
    for pattern in COMPLEX_KEYWORDS:
        if re.search(pattern, q):
            return AIModel.GROQ
    return AIModel.OLLAMA


async def route(
    query: str,
    market_context: dict,
    history: list[dict],
    ollama: OllamaService,
    groq: GroqService,
) -> tuple[str, AIModel]:
    model = classify(query)

    enriched = f"""
Datos de mercado en tiempo real:
- Dólar blue: ${market_context.get('blue_venta', 'N/D')}
- Dólar MEP: ${market_context.get('mep_venta', 'N/D')}
- Dólar CCL: ${market_context.get('ccl', 'N/D')}
- Dólar oficial: ${market_context.get('oficial', 'N/D')}
- Inflación mensual (último dato INDEC): {market_context.get('ipc_mensual', 'N/D')}%
- Inflación acumulada 12m: {market_context.get('ipc_acumulada_12m', 'N/D')}%
- Tasa plazo fijo (TNA estimada): {market_context.get('tasa_pf_estimada', 'N/D')}%
- BTC: USD {market_context.get('btc_usd', 'N/D')}

Consulta: {query}
"""

    if model == AIModel.GROQ:
        if groq.is_configured():
            try:
                resp = await groq.chat(enriched, history)
                return resp, AIModel.GROQ
            except Exception:
                pass
        ollama_ok = await ollama.is_available()
        if ollama_ok:
            resp = await ollama.chat(enriched, history)
            return resp, AIModel.OLLAMA
        return "⚠️ Ningún servicio de IA disponible. Verificá que Ollama esté corriendo.", AIModel.OLLAMA

    else:
        ollama_ok = await ollama.is_available()
        if ollama_ok:
            resp = await ollama.chat(enriched, history)
            return resp, AIModel.OLLAMA
        if groq.is_configured():
            resp = await groq.chat(enriched, history)
            return resp, AIModel.GROQ
        return "⚠️ Ollama no está corriendo. Inicialo con: ollama serve", AIModel.OLLAMA
