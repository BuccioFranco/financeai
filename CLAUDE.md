# FinanceAI — Asistente financiero personal AR

## Stack de IA (100% gratuito)
- Ollama local (qwen2.5:7b) → consultas simples
- Groq free tier (llama-3.3-70b-versatile) → análisis complejos
- SIN Anthropic API. SIN costos de runtime.

## Setup inicial

### 1. Descargar modelo Ollama
ollama pull qwen2.5:7b
ollama serve   # debe quedar corriendo en puerto 11434

### 2. Levantar backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

### 3. Levantar frontend
cd frontend
npm install
npm run dev   # http://localhost:5173

## Comandos útiles
uvicorn main:app --reload           # backend con hot reload
npm run dev                         # frontend con hot reload
ollama list                         # ver modelos instalados

## APIs externas (todas gratuitas, sin key)
- Dólar:     https://dolarito.ar/api/informal
- Inflación: https://apis.datos.gob.ar/series/api/series/
- BCRA:      https://api.bcra.gob.ar/estadisticas/v3.0/
- Crypto:    https://api.coingecko.com/api/v3/simple/price

## Convenciones
- Python: snake_case, type hints, sin SDK de Anthropic
- React: componentes funcionales, Tailwind para todo
- Moneda: float con 2 decimales
- Porcentajes: float con 2 decimales
- Conversiones: siempre usar dólar MEP (no oficial)
- Rendimiento real: siempre mostrar (puede ser negativo)
