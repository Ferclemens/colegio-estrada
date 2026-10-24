import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Levels from './components/Levels'
import Values from './components/Values'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ThankYouModal from './components/ThankYouModal'

export default function App() {
  const [showThanks, setShowThanks] = useState(false)

  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <Intro />
        <Levels />
        <Values />
        <ContactForm onSubmitted={() => setShowThanks(true)} />
      </main>
      <Footer />
      {showThanks && <ThankYouModal onClose={() => setShowThanks(false)} />}
    </>
  )
}
