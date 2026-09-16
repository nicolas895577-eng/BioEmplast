import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

import { SiteShell } from "./components/SiteShell"

const Home = lazy(() => import("./pages/Home"))
const Nosotros = lazy(() => import("./pages/Nosotros"))
const Productos = lazy(() => import("./pages/Productos"))
const Contacto = lazy(() => import("./pages/Contacto"))
const Privacidad = lazy(() => import("./pages/Privacidad"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SiteShell>
          <Suspense fallback={<div className="site-container py-20" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SiteShell>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App