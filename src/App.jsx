import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

import { SiteShell } from "./components/SiteShell"
import { RequireAuth } from "./components/RequireAuth"

const Home = lazy(() => import("./pages/Home"))
const Nosotros = lazy(() => import("./pages/Nosotros"))
const Productos = lazy(() => import("./pages/Productos"))
const Contacto = lazy(() => import("./pages/Contacto"))
const Privacidad = lazy(() => import("./pages/Privacidad"))
const NotFound = lazy(() => import("./pages/NotFound"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"))

function SitioPublico() {
  return (
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
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route path="/*" element={<SitioPublico />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App