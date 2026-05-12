import { useQuery } from '@tanstack/react-query'

const API = import.meta.env.VITE_API_URL || ''

export function useMarketData() {
  return useQuery({
    queryKey: ['market'],
    queryFn: () => fetch(`${API}/api/market/`).then((r) => r.json()),
    refetchInterval: 60_000,
  })
}

export function useComparison(monto) {
  return useQuery({
    queryKey: ['compare', monto],
    queryFn: () => fetch(`${API}/api/compare/?monto=${monto}`).then((r) => r.json()),
    enabled: monto > 0,
    staleTime: 30_000,
  })
}

export function useChatStatus() {
  return useQuery({
    queryKey: ['chatStatus'],
    queryFn: () => fetch(`${API}/api/chat/status`).then((r) => r.json()),
    refetchInterval: 30_000,
  })
}

export async function sendChat(message, history) {
  const r = await fetch(`${API}/api/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  if (!r.ok) throw new Error('Chat error')
  return r.json()
}
