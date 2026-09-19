import { Link, NavLink, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Menu, MessageCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "./ui/Button"
import { BackToTop } from "./BackToTop"
import { WHATSAPP_NUMERO } from "../data/productos"

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}`

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Productos", to: "/productos" },
  { label: "Contacto", to: "/contacto" },
]

const heroPages = ["/", "/productos", "/contacto"]

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bio Emplast S.A.S.",
  description: "Fabricación y comercialización de empaques plásticos flexibles para la industria alimenticia y agropecuaria.",
  telephone: ["+57 301 533 0596", "+57 311 822 1246"],
  email: "bioemplastsas@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Transversal 68B Nº 29-28 Sur, Barrio Alquería La Fragua",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  geo: { "@type": "GeoCoordinates", latitude: 4.608528, longitude: -74.130611 },
  areaServed: "Colombia",
  openingHours: ["Mo-Fr 08:30-17:30", "Sa 08:30-14:00"],
}

function Brand({ light }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Bio Emplast, inicio">
      <img src="/logo-icono.png" alt="" aria-hidden="true" className="h-9 w-auto" />
      <span className={`font-display text-lg font-extrabold leading-none ${light ? "text-white" : "text-foreground"}`}>Bio Emplast</span>
    </Link>
  )
}

export function SiteShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const hasHero = heroPages.includes(location.pathname)
  const transparent = !scrolled
  const lightText = hasHero && transparent

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrolled(false)
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      </Helmet>

      <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${transparent ? "bg-transparent border-b border-transparent" : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"}`}>
        <div className="site-container flex h-20 items-center justify-between gap-5">
          <Brand light={lightText} />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => `${lightText ? "nav-link-light" : "nav-link"} ${isActive && !lightText ? "nav-link-active" : ""}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
            </Button>
          </div>
          <Button variant="icon" size="icon" className={`md:hidden ${lightText ? "border-white/40 bg-white/10 text-white hover:border-white" : ""}`} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav md:hidden" aria-label="Navegación móvil">
            <div className="site-container flex flex-col py-5">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} className="border-b border-border py-4 text-2xl font-bold" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="whatsapp" size="lg" className="mt-6 self-start">
                <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
              </Button>
            </div>
          </nav>
        ) : null}
      </header>

      <main className={hasHero ? undefined : "pt-20"}>{children}</main>

      <footer className="bg-brand-green-dark text-white">
        <div className="site-container grid gap-12 py-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-16">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="Bio Emplast, inicio">
              <img src="/logo-icono.png" alt="" aria-hidden="true" className="h-9 w-auto" />
              <span className="font-display text-lg font-extrabold leading-none text-white">Bio Emplast</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Soluciones de empaque industrial para proteger, conservar y mover mejor cada producto.
            </p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-white/60">Navegación</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} className="text-white/80 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
              <Link to="/privacidad" className="text-white/80 transition-colors hover:text-white">
                Privacidad
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-white/60">Contacto</p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>+57 301 533 0596 · +57 311 822 1246</p>
              <p>bioemplastsas@gmail.com</p>
              <a className="block text-white/80 transition-colors hover:text-white" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook ↗</a>
            </div>
          </div>
        </div>
        <div className="site-container flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© 2026 Bio Emplast S.A.S. NIT 9000515066-1. Todos los derechos reservados.</p>
          <p>Empaque responsable · Colombia</p>
        </div>
      </footer>
      <BackToTop />
    </div>
  )
}