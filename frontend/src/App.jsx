import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage.jsx'
import OnboardingModal from './components/onboarding/OnboardingModal.jsx'

export default function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem('financeai_onboarding_done')
    if (!done) {
      setOnboardingOpen(true)
    }
  }, [])

  return (
    <>
      <HomePage onOpenOnboarding={() => setOnboardingOpen(true)} />
      {onboardingOpen && (
        <OnboardingModal onClose={() => setOnboardingOpen(false)} />
      )}
    </>
  )
}
