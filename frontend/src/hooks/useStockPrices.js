import { useQuery } from '@tanstack/react-query'

const API = import.meta.env.VITE_API_URL || ''

export function useStockPrices(tickers = []) {
  return useQuery({
    queryKey: ['stock-prices', tickers.join(',')],
    queryFn: async () => {
      if (tickers.length === 0) return {}
      const r = await fetch(`${API}/api/stocks/prices?tickers=${tickers.join(',')}`)
      if (!r.ok) throw new Error('Stock prices fetch failed')
      const data = await r.json()
      return data.prices
    },
    enabled: tickers.length > 0,
    refetchInterval: 60_000,
    staleTime: 30_000,
  })
}

export function useStockHistory(ticker) {
  return useQuery({
    queryKey: ['stock-history', ticker],
    queryFn: async () => {
      const r = await fetch(`${API}/api/stocks/history/${ticker}`)
      if (!r.ok) throw new Error('History fetch failed')
      return r.json()
    },
    enabled: !!ticker,
    staleTime: 300_000,
  })
}
