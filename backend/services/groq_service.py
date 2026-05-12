import httpx
import os
from prompts.system_prompt import SYSTEM_PROMPT

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


class GroqService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY", "")
        self.model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    async def chat(self, message: str, history: list[dict] = []) -> str:
        if not self.api_key:
            return "⚠️ Groq API key no configurada. Agregá GROQ_API_KEY en el .env (es gratuita en console.groq.com)."

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend(history)
        messages.append({"role": "user", "content": message})

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model,
            "messages": messages,
            "max_tokens": 1024,
            "temperature": 0.3,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            r = await client.post(GROQ_API_URL, headers=headers, json=payload)
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"]

    def is_configured(self) -> bool:
        return bool(self.api_key)
