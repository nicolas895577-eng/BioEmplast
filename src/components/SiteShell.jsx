import { Link, NavLink } from "react-router-dom"
import { Menu, MessageCircle, X } from "lucide-react"
import { useState } from "react"

import { Button } from "./ui/Button"
import { WHATSAPP_NUMERO } from "../data/productos"

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}`

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Productos", to: "/productos" },
  { label: "Contacto", to: "/contacto" },
]

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Bio Emplast, inicio">
      <img src="/logo-icono.png" alt="" aria-hidden="true" className="h-9 w-auto" />
      <span className="font-display text-lg font-extrabold leading-none">Bio Emplast</span>
    </Link>
  )
}

export function SiteShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="site-container flex h-20 items-center justify-between gap-5">
          <Brand />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
          <Button
            variant="icon"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav md:hidden" aria-label="Navegación móvil">
            <div className="site-container flex flex-col py-5">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-border py-4 text-2xl font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="whatsapp" size="lg" className="mt-6 self-start">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-border lg:mt-40">
        <div className="site-container grid gap-12 py-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-16">
          <div>
            <Brand />
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Soluciones de empaque industrial para proteger, conservar y mover mejor cada
              producto.
            </p>
          </div>
          <div>
            <p className="footer-label">Navegación</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">Contacto</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>+57 301 533 0596 · +57 311 822 1246</p>
              {/* TODO: reemplazar con el correo real cuando la clienta lo confirme */}
              <p>ventas@bioemplast.co</p>
              <a className="footer-link block" href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook ↗
              </a>
            </div>
          </div>
        </div>
        <div className="site-container flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© 2026 Bio Emplast. Todos los derechos reservados.</p>
          <p>Empaque responsable · Colombia</p>
        </div>
      </footer>
    </div>
  )
}