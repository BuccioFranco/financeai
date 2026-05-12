from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


class InvestmentOption(BaseModel):
    nombre: str
    tipo: str
    riesgo: int
    riesgo_label: str
    liquidez: str
    tna_nominal: float
    rendimiento_real: float
    monto_final_ars: Optional[float]
    monto_final_usd: Optional[float]
    descripcion: str
    icono: str


class CompareResponse(BaseModel):
    monto_ars: float
    monto_usd: float
    dolar_mep: float
    inflacion_mensual: float
    tna_pf: float
    inversiones: list[InvestmentOption]
