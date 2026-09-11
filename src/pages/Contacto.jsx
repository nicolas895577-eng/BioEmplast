import { ExternalLink, Link2, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Button } from "../components/ui/Button"
import { ContactForm } from "../components/ContactForm"
import { AnimatedSection } from "../components/AnimatedSection"
import { whatsappUrl } from "../components/SiteShell"

// Link real de ubicación que compartió la clienta
const GOOGLE_MAPS_URL = "https://goo.gl/maps/icrowjepP9zUoeUz9?g_st=aw"

export default function Contacto() {
  return (
    <>
      <AnimatedSection className="site-container py-16 text-center lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">
          Contacto
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          ¿Listo para tu próximo pedido?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Escríbenos por WhatsApp para una respuesta inmediata, o completa el formulario y
          te contactamos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> Escribir por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Link2 /> Ver Facebook <ExternalLink />
            </a>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-container grid gap-8 pb-16 lg:grid-cols-[1fr_1.2fr] lg:pb-20">
        {/* Información de contacto */}
        <div className="card-shadow p-6 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">
            Información de contacto
          </p>
          <dl className="mt-8 space-y-7">
            <div>
              <dt className="flex items-center gap-3 text-sm font-bold">
                <Phone className="size-4 text-brand-green-dark" /> Teléfono / WhatsApp
              </dt>
              <dd className="mt-2 text-muted-foreground">
                +57 301 533 0596
                <br />
                +57 311 822 1246
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-sm font-bold">
                <Mail className="size-4 text-brand-green-dark" /> Correo
              </dt>
              {/* TODO: reemplazar con el correo real cuando la clienta lo confirme */}
              <dd className="mt-2 text-muted-foreground">ventas@bioemplast.co</dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-sm font-bold">
                <MapPin className="size-4 text-brand-green-dark" /> Ubicación
              </dt>
              <dd className="mt-2 text-muted-foreground">
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand-green-dark hover:text-brand-green">
                  Ver ubicación en Google Maps <ExternalLink className="size-3.5" />
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold">Horario de atención</dt>
              {/* TODO: confirmar horario real con la clienta */}
              <dd className="mt-2 leading-7 text-muted-foreground">
                Lunes a viernes · 8:00 a.m. – 5:30 p.m.
                <br />
                Sábados · 8:00 a.m. – 12:00 m.
              </dd>
            </div>
          </dl>
        </div>

        {/* Formulario funcional */}
        <ContactForm />
      </AnimatedSection>

      {/* Fotos reales de la fachada, para que el cliente reconozca el local */}
      <AnimatedSection className="site-container pb-20 lg:pb-28">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">
          Así nos vas a encontrar
        </p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
          Nuestro local en fotos
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card-shadow overflow-hidden">
            <img
              src="/ubicacion-1.jpg"
              alt="Fachada del local de Bio Emplast"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="card-shadow overflow-hidden">
            <img
              src="/ubicacion-2.jpg"
              alt="Vista de la entrada de Bio Emplast"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}