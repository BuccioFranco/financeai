from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_router import route
from services.market_data import fetch_all_market_data
from services.ollama_service import OllamaService
from services.groq_service import GroqService

router = APIRouter(prefix="/api/chat", tags=["chat"])
ollama = OllamaService()
groq = GroqService()


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


@router.post("/")
async def chat(req: ChatRequest):
    market = await fetch_all_market_data()
    response, model_used = await route(req.message, market, req.history, ollama, groq)
    return {
        "response": response,
        "model": model_used.value,
        "model_label": "Análisis con Groq (Llama 70B)" if model_used.value == "groq" else "Respuesta rápida (Ollama local)",
    }


@router.get("/status")
async def status():
    return {
        "ollama_available": await ollama.is_available(),
        "groq_configured": groq.is_configured(),
    }
