from fastapi import APIRouter, Query
from services.calculator import comparar_inversiones
from services.market_data import fetch_all_market_data

router = APIRouter(prefix="/api/compare", tags=["compare"])


@router.get("/")
async def get_comparison(monto: float = Query(default=100000, gt=0)):
    market = await fetch_all_market_data()
    dolar_mep = market.get("mep_venta") or 1200
    tna_pf = market.get("tasa_pf_estimada") or 40
    ipc = market.get("ipc_mensual") or 5.0

    return {
        "monto_ars": monto,
        "monto_usd": round(monto / dolar_mep, 2),
        "dolar_mep": dolar_mep,
        "inflacion_mensual": ipc,
        "tna_pf": tna_pf,
        "inversiones": comparar_inversiones(monto, dolar_mep, tna_pf, ipc),
    }
