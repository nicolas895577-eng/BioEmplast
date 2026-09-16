import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, MessageCircle } from "lucide-react"

import { Button } from "../components/ui/Button"
import { whatsappUrl } from "../components/SiteShell"

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="site-container flex min-h-[70vh] flex-col items-center justify-center text-center py-20">
        <p className="text-sm font-bold uppercase tracking-[.14em] text-brand-green-dark">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Esta página no existe</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o escríbenos si necesitas ayuda.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild variant="whatsapp" size="lg">
            <Link to="/"><ArrowLeft /> Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Escríbenos</a>
          </Button>
        </div>
      </section>
    </>
  )
}