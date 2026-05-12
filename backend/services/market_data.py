import httpx
import asyncio
from datetime import datetime, timedelta

_cache: dict = {}
_cache_time: dict = {}
CACHE_TTL_SECONDS = 120


async def fetch_all_market_data() -> dict:
    now = datetime.now().timestamp()
    if _cache and (now - _cache_time.get("last", 0)) < CACHE_TTL_SECONDS:
        return _cache

    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        results = await asyncio.gather(
            _fetch_dolar(client),
            _fetch_inflacion(client),
            _fetch_tasas_plazo_fijo(client),
            _fetch_riesgo_pais(client),
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
    """
    Fuente: dolarapi.com — devuelve todos los tipos de cambio.
    Tipos: oficial, blue, bolsa (MEP), contadoconliqui (CCL), mayorista, cripto, tarjeta.
    """
    try:
        r = await client.get(
            "https://dolarapi.com/v1/dolares",
            headers={"User-Agent": "FinanceAI/1.0"},
        )
        r.raise_for_status()
        tipos = {item["casa"]: item for item in r.json()}

        return {
            # Blue
            "blue_compra":      tipos.get("blue", {}).get("compra"),
            "blue_venta":       tipos.get("blue", {}).get("venta"),
            # MEP / Bolsa
            "mep_compra":       tipos.get("bolsa", {}).get("compra"),
            "mep_venta":        tipos.get("bolsa", {}).get("venta"),
            # CCL
            "ccl_compra":       tipos.get("contadoconliqui", {}).get("compra"),
            "ccl":              tipos.get("contadoconliqui", {}).get("venta"),
            # Oficial
            "oficial_compra":   tipos.get("oficial", {}).get("compra"),
            "oficial":          tipos.get("oficial", {}).get("venta"),
            # Extras
            "mayorista":        tipos.get("mayorista", {}).get("venta"),
            "cripto":           tipos.get("cripto", {}).get("venta"),
            "tarjeta":          tipos.get("tarjeta", {}).get("venta"),
            # Última actualización del blue
            "dolar_updated":    tipos.get("blue", {}).get("fechaActualizacion"),
        }
    except Exception as e:
        return {
            "blue_venta": None, "mep_venta": None, "ccl": None,
            "oficial": None, "mayorista": None, "tarjeta": None, "cripto": None,
        }


async def _fetch_inflacion(client: httpx.AsyncClient) -> dict:
    """
    Fuente: datos.gob.ar (INDEC) — serie IPC mensual nivel general.
    """
    try:
        url = (
            "https://apis.datos.gob.ar/series/api/series/"
            "?ids=148.3_INIVELNAL_DICI_M_26&limit=13&sort=desc&format=json"
        )
        r = await client.get(url)
        r.raise_for_status()
        series = r.json().get("data", [])
        mensual = None
        acumulada = None
        if len(series) >= 2:
            mensual = round(((series[0][1] / series[1][1]) - 1) * 100, 2)
        if len(series) >= 13:
            acumulada = round(((series[0][1] / series[12][1]) - 1) * 100, 1)
        historico = [
            {"fecha": series[i][0], "valor": round(((series[i][1] / series[i + 1][1]) - 1) * 100, 2)}
            for i in range(len(series) - 1)
        ] if len(series) > 1 else []
        return {
            "ipc_mensual": mensual,
            "ipc_acumulada_12m": acumulada,
            "ipc_historico": historico,
            "ipc_ultimo_dato": series[0][0] if series else None,
        }
    except Exception:
        return {"ipc_mensual": None, "ipc_acumulada_12m": None, "ipc_historico": [], "ipc_ultimo_dato": None}


async def _fetch_tasas_plazo_fijo(client: httpx.AsyncClient) -> dict:
    """
    Fuente: argentinadatos.com — TNA de plazo fijo por banco.
    Calculamos el promedio de los principales bancos.
    """
    try:
        r = await client.get(
            "https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo",
            headers={"User-Agent": "FinanceAI/1.0"},
        )
        r.raise_for_status()
        bancos = r.json()

        # Filtrar bancos con TNA > 0 y calcular promedio
        tasas = [b["tnaClientes"] * 100 for b in bancos if b.get("tnaClientes", 0) > 0]
        tasa_promedio = round(sum(tasas) / len(tasas), 2) if tasas else None

        # Bancos principales para referencia
        bancos_principales = {b["entidad"].upper(): round(b["tnaClientes"] * 100, 2) for b in bancos}
        tna_bna = bancos_principales.get("BANCO DE LA NACION ARGENTINA")
        tna_galicia = bancos_principales.get("BANCO DE GALICIA Y BUENOS AIRES S.A.U.")

        return {
            "tasa_pf_promedio": tasa_promedio,
            "tasa_pf_estimada": tasa_promedio,
            "tasa_pf_bna": tna_bna,
            "tasa_pf_galicia": tna_galicia,
        }
    except Exception:
        return {"tasa_pf_promedio": None, "tasa_pf_estimada": None, "tasa_pf_bna": None}


async def _fetch_riesgo_pais(client: httpx.AsyncClient) -> dict:
    """
    Fuente: argentinadatos.com — EMBI+ Argentina (riesgo país en puntos básicos).
    """
    try:
        r = await client.get(
            "https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais",
            headers={"User-Agent": "FinanceAI/1.0"},
        )
        r.raise_for_status()
        data = r.json()
        ultimo = data[-1] if isinstance(data, list) and data else {}
        return {
            "riesgo_pais": ultimo.get("valor"),
            "riesgo_pais_fecha": ultimo.get("fecha"),
        }
    except Exception:
        return {"riesgo_pais": None, "riesgo_pais_fecha": None}


async def _fetch_crypto(client: httpx.AsyncClient) -> dict:
    """
    Fuente: CoinGecko API pública — precios BTC y ETH en USD.
    """
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        r = await client.get(url, headers={"User-Agent": "FinanceAI/1.0"})
        r.raise_for_status()
        d = r.json()
        return {
            "btc_usd": d.get("bitcoin", {}).get("usd"),
            "eth_usd": d.get("ethereum", {}).get("usd"),
        }
    except Exception:
        return {"btc_usd": None, "eth_usd": None}
