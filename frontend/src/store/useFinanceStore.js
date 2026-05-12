import { create } from 'zustand'

export const useFinanceStore = create((set, get) => ({
  monto: 100000,
  setMonto: (monto) => set({ monto }),

  chatOpen: true,
  setChatOpen: (open) => set({ chatOpen: open }),

  chatHistory: [],
  addMessage: (msg) => set((s) => ({ chatHistory: [...s.chatHistory, msg] })),
  clearHistory: () => set({ chatHistory: [] }),

  pendingPrompt: null,
  sendPrompt: (text) => set({ pendingPrompt: text }),
  clearPendingPrompt: () => set({ pendingPrompt: null }),
}))
