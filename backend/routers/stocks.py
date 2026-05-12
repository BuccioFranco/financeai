import asyncio
import time
from fastapi import APIRouter, Query
import httpx

router = APIRouter(prefix="/api/stocks", tags=["stocks"])

_price_cache: dict = {}
_cache_timestamp: float = 0
CACHE_TTL = 300  # 5 minutos


async def fetch_yahoo_price(ticker: str, client: httpx.AsyncClient) -> dict:
    try:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?interval=1d&range=1mo"
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        r = await client.get(url, headers=headers, timeout=8.0)
        data = r.json()
        result = data["chart"]["result"][0]
        meta = result["meta"]
        closes = result["indicators"]["quote"][0]["close"]
        closes_clean = [c for c in closes if c is not None]

        current = meta.get("regularMarketPrice") or (closes_clean[-1] if closes_clean else None)
        prev_close = meta.get("chartPreviousClose") or (closes_clean[-2] if len(closes_clean) > 1 else current)
        open_1m = closes_clean[0] if closes_clean else current

        change_day = round(((current / prev_close) - 1) * 100, 2) if current and prev_close else 0
        change_1m  = round(((current / open_1m)   - 1) * 100, 2) if current and open_1m   else 0

        return {
            "ticker":          ticker,
            "price":           round(current, 2) if current else None,
            "prev_close":      round(prev_close, 2) if prev_close else None,
            "change_day_pct":  change_day,
            "change_1m_pct":   change_1m,
            "high_1m":         round(max(closes_clean), 2) if closes_clean else None,
            "low_1m":          round(min(closes_clean), 2) if closes_clean else None,
            "currency":        meta.get("currency", "USD"),
            "exchange":        meta.get("exchangeName", ""),
            "closes_1m":       [round(c, 2) for c in closes_clean[-20:]],
        }
    except Exception as e:
        return {"ticker": ticker, "error": str(e), "price": None, "change_day_pct": 0, "change_1m_pct": 0, "closes_1m": []}


@router.get("/prices")
async def get_prices(tickers: str = Query(default="AAPL,MSFT,GOOGL,NVDA,TSLA")):
    global _price_cache, _cache_timestamp

    ticker_list = [t.strip().upper() for t in tickers.split(",") if t.strip()][:20]
    now = time.time()

    to_fetch = [t for t in ticker_list if t not in _price_cache or (now - _cache_timestamp) > CACHE_TTL]

    if to_fetch:
        async with httpx.AsyncClient() as client:
            results = await asyncio.gather(
                *[fetch_yahoo_price(t, client) for t in to_fetch],
                return_exceptions=True
            )
        for r in results:
            if isinstance(r, dict) and "ticker" in r:
                _price_cache[r["ticker"]] = r
        if to_fetch:
            _cache_timestamp = now

    return {"prices": {t: _price_cache.get(t, {"ticker": t, "price": None, "change_day_pct": 0, "change_1m_pct": 0, "closes_1m": []}) for t in ticker_list}}


@router.get("/history/{ticker}")
async def get_history(ticker: str):
    async with httpx.AsyncClient() as client:
        return await fetch_yahoo_price(ticker.upper(), client)
