import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage    from './pages/LandingPage.jsx'
import BussolePage    from './pages/BussolePage.jsx'
import LabPage        from './pages/LabPage.jsx'
import StocksPage     from './pages/StocksPage.jsx'
import ComparatorPage from './pages/ComparatorPage.jsx'
import ChatPage       from './pages/ChatPage.jsx'
import Navbar         from './components/layout/Navbar.jsx'

function AppWithNav() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Routes>
        <Route path="/brujula"     element={<BussolePage />} />
        <Route path="/laboratorio" element={<LabPage />} />
        <Route path="/acciones"    element={<StocksPage />} />
        <Route path="/comparar"    element={<ComparatorPage />} />
        <Route path="/asistente"   element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AppWithNav />} />
      </Routes>
    </BrowserRouter>
  )
}
