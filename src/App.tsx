import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
)
const JourneyPage = lazy(() =>
  import('./pages/JourneyPage').then((m) => ({ default: m.JourneyPage }))
)
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
)
const TributesPage = lazy(() =>
  import('./pages/TributesPage').then((m) => ({ default: m.TributesPage }))
)

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PageWithFooter({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

function RouteFallback() {
  return <div className="route-fallback" aria-hidden="true" />
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />
      <Nav ready />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <PageWithFooter>
                <AboutPage />
              </PageWithFooter>
            }
          />
          <Route
            path="/journey"
            element={
              <PageWithFooter>
                <JourneyPage />
              </PageWithFooter>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageWithFooter>
                <GalleryPage />
              </PageWithFooter>
            }
          />
          <Route
            path="/tributes"
            element={
              <PageWithFooter>
                <TributesPage />
              </PageWithFooter>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
