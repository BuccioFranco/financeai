# 💰 FinanceAI — Asistente financiero personal para Argentina

> Tomá mejores decisiones con tu plata. Gratis, open source y sin conocimientos previos.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://react.dev)
[![Ollama](https://img.shields.io/badge/AI-Ollama%20%2B%20Groq-black)](https://ollama.ai)

## 🎯 ¿Qué es esto?

FinanceAI es un asistente financiero personal diseñado especialmente para el mercado argentino.
Te ayuda a comparar opciones de inversión (plazo fijo, dólar MEP, Cedears, crypto y más),
calcula el rendimiento real descontando inflación, y te explica todo en lenguaje simple.

**100% gratuito. Sin suscripciones. Sin datos personales.**

## ✨ Funcionalidades

- 📊 **Cotizaciones en tiempo real** — Dólar blue, MEP, CCL, IPC, BTC
- 🔄 **Comparador ARS vs USD** — todas las opciones ordenadas por riesgo y rendimiento real
- 🎓 **Onboarding educativo** — flujo guiado para quienes no saben de finanzas
- 📖 **Explicaciones simples** — cada instrumento explicado sin tecnicismos
- 🤖 **Chat con IA** — preguntale lo que quieras, responde con datos de mercado actuales
- 📈 **Gráfico histórico** — inflación vs rendimiento de plazo fijo, últimos 12 meses

## 🤖 Stack de IA (100% gratuito)

| Modelo | Uso | Costo |
|--------|-----|-------|
| **Ollama + Qwen2.5:7b** (local) | Consultas rápidas | $0 siempre |
| **Groq + Llama 3.3 70B** (cloud) | Análisis complejos | $0 (free tier) |

No se usa ninguna API de pago. No se necesita tarjeta de crédito.

## 🚀 Instalación rápida

### Requisitos
- Python 3.11+
- Node.js 18+
- [Ollama](https://ollama.ai) instalado
- Cuenta en [Groq](https://console.groq.com) (gratis, sin tarjeta)

```bash
# 1. Clonar el repositorio
git clone https://github.com/franbuccio/financeai.git
cd financeai

# 2. Instalar Ollama y descargar el modelo
ollama pull qwen2.5:7b
ollama serve

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu GROQ_API_KEY (gratis en console.groq.com)

# 4. Levantar el backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

# 5. Levantar el frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

Abrí `http://localhost:5173` 🎉

## 📡 APIs utilizadas (todas gratuitas)

| API | Datos | Documentación |
|-----|-------|---------------|
| dolarito.ar | Dólar blue, MEP, CCL, oficial | [dolarito.ar](https://dolarito.ar) |
| datos.gob.ar | IPC inflación INDEC | [apis.datos.gob.ar](https://apis.datos.gob.ar) |
| bcra.gob.ar | Tasas de interés | [api.bcra.gob.ar](https://api.bcra.gob.ar) |
| CoinGecko | Bitcoin, Ethereum | [coingecko.com/api](https://www.coingecko.com/api) |

## 🌐 Deploy en producción

### Frontend → Netlify
1. Ir a [netlify.com](https://netlify.com) → New site from Git
2. Conectar el repo de GitHub
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Variables de entorno: `VITE_API_URL=https://tu-backend.onrender.com`
5. Deploy 🚀

### Backend → Render
1. Ir a [render.com](https://render.com) → New Web Service
2. Conectar el repo de GitHub
3. Root directory: `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Variables de entorno: agregar `GROQ_API_KEY` y `CORS_ORIGINS`
7. Deploy 🚀

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si encontrás un bug, tenés una idea o querés
agregar un instrumento financiero, abrí un Issue o un Pull Request.

```bash
git checkout -b feature/mi-mejora
git commit -m "feat: descripcion de mi mejora"
git push origin feature/mi-mejora
# Abrir Pull Request en GitHub
```

## ⚠️ Aviso legal

Esta app es solo con fines educativos e informativos.
No constituye asesoramiento financiero. Antes de invertir, consultá con un asesor certificado.
Los rendimientos pasados no garantizan rendimientos futuros.

## 📄 Licencia

MIT — libre para usar, modificar y distribuir.
