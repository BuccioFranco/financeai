from fastapi import APIRouter
from services.market_data import fetch_all_market_data

router = APIRouter(prefix="/api/market", tags=["market"])


@router.get("/")
async def get_market():
    return await fetch_all_market_data()
