import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { About } from '../components/About'
import { Footer } from '../components/Footer'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { Journey } from '../components/Journey'
import { Tributes } from '../components/Tributes'

const GrandOpening = lazy(() =>
  import('../components/GrandOpening').then((m) => ({ default: m.GrandOpening }))
)

const OPENING_KEY = 'obo-opening-seen'

export function HomePage() {
  const [openingDone, setOpeningDone] = useState(() => {
    try {
      return sessionStorage.getItem(OPENING_KEY) === '1'
    } catch {
      return false
    }
  })

  const handleOpeningComplete = useCallback(() => {
    try {
      sessionStorage.setItem(OPENING_KEY, '1')
    } catch {
      /* ignore */
    }
    setOpeningDone(true)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('opening-active', !openingDone)
    return () => document.body.classList.remove('opening-active')
  }, [openingDone])

  return (
    <>
      {!openingDone ? (
        <Suspense fallback={null}>
          <GrandOpening onComplete={handleOpeningComplete} />
        </Suspense>
      ) : null}
      <main>
        <Hero ready={openingDone} />
        <About preview />
        <Journey preview />
        <Gallery preview />
        <Tributes preview />
      </main>
      <Footer />
    </>
  )
}
