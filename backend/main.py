import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import market, compare, chat, stocks

app = FastAPI(title="FinanceAI API", version="2.0.0")

_cors_origins = os.getenv("CORS_ORIGINS", "").split(",")
_cors_origins = [o.strip() for o in _cors_origins if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins or ["*"],
    allow_origin_regex=r"http://localhost:\d+",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market.router)
app.include_router(compare.router)
app.include_router(chat.router)
app.include_router(stocks.router)


@app.get("/health")
async def health():
    return {"status": "ok", "ai_stack": "ollama + groq (free tier)"}
