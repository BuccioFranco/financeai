import httpx
import asyncio
from datetime import datetime

_cache: dict = {}
_cache_time: dict = {}
CACHE_TTL_SECONDS = 120


async def fetch_all_market_data() -> dict:
    now = datetime.now().timestamp()
    if _cache and (now - _cache_time.get("last", 0)) < CACHE_TTL_SECONDS:
        return _cache

    async with httpx.AsyncClient(timeout=10.0) as client:
        results = await asyncio.gather(
            _fetch_dolar(client),
            _fetch_inflacion(client),
            _fetch_tasas_bcra(client),
            _fetch_crypto(client),
            return_exceptions=True,
        )

    data = {}
    for r in results:
        if isinstance(r, dict):
            data.update(r)

    _cache.update(data)
    _cache_time["last"] = now
    return data


async def _fetch_dolar(client: httpx.AsyncClient) -> dict:
    try:
        r = await client.get("https://dolarito.ar/api/informal")
        d = r.json()
        return {
            "blue_compra": d.get("blue", {}).get("buy"),
            "blue_venta": d.get("blue", {}).get("sell"),
            "mep_compra": d.get("mep", {}).get("buy"),
            "mep_venta": d.get("mep", {}).get("sell"),
            "ccl": d.get("ccl", {}).get("sell"),
            "oficial": d.get("oficial", {}).get("sell"),
        }
    except Exception:
        return {"blue_venta": None, "mep_venta": None, "ccl": None, "oficial": None}


async def _fetch_inflacion(client: httpx.AsyncClient) -> dict:
    try:
        url = (
            "https://apis.datos.gob.ar/series/api/series/"
            "?ids=148.3_INIVELNAL_DICI_M_26&limit=13&sort=desc&format=json"
        )
        r = await client.get(url)
        series = r.json().get("data", [])
        mensual = None
        acumulada = None
        if len(series) >= 2:
            mensual = round(((series[0][1] / series[1][1]) - 1) * 100, 2)
        if len(series) >= 13:
            acumulada = round(((series[0][1] / series[12][1]) - 1) * 100, 1)
        historico = [
            {"fecha": s[0], "valor": round(((series[i][1] / series[i + 1][1]) - 1) * 100, 2)}
            for i, s in enumerate(series[:-1])
        ] if len(series) > 1 else []
        return {
            "ipc_mensual": mensual,
            "ipc_acumulada_12m": acumulada,
            "ipc_historico": historico,
        }
    except Exception:
        return {"ipc_mensual": None, "ipc_acumulada_12m": None, "ipc_historico": []}


async def _fetch_tasas_bcra(client: httpx.AsyncClient) -> dict:
    try:
        url = "https://api.bcra.gob.ar/estadisticas/v3.0/datosvariable/7/1/1"
        r = await client.get(url, verify=False)
        tasa = r.json().get("results", [{}])[0].get("valor")
        return {
            "tasa_politica_monetaria": tasa,
            "tasa_pf_estimada": round(float(tasa) * 0.85, 2) if tasa else None,
        }
    except Exception:
        return {"tasa_politica_monetaria": None, "tasa_pf_estimada": None}


async def _fetch_crypto(client: httpx.AsyncClient) -> dict:
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        r = await client.get(url)
        d = r.json()
        return {
            "btc_usd": d.get("bitcoin", {}).get("usd"),
            "eth_usd": d.get("ethereum", {}).get("usd"),
        }
    except Exception:
        return {"btc_usd": None, "eth_usd": None}
