import { ExternalLink, Link2, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Helmet } from "react-helmet-async"

import { Button } from "../components/ui/Button"
import { ContactForm } from "../components/ContactForm"
import { AnimatedSection } from "../components/AnimatedSection"
import { whatsappUrl } from "../components/SiteShell"

const DIRECCION = "Transversal 68B Nº 29-28 Sur, Barrio Alquería La Fragua, Bogotá D.C."
const GOOGLE_MAPS_URL = "https://goo.gl/maps/icrowjepP9zUoeUz9?g_st=aw"
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&output=embed`

export default function Contacto() {
  return (
    <>
      <Helmet>
        <title>Contacto | Bio Emplast</title>
        <meta name="description" content="Escríbenos por WhatsApp o completa el formulario para cotizar empaques industriales con Bio Emplast S.A.S." />
      </Helmet>

      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <img src="/ubicacion-1.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="site-container relative py-20 text-center text-white">
          <AnimatedSection className="mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-yellow">Contacto</p>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">¿Listo para tu próximo pedido?</h1>
            <p className="mx-auto mt-4 max-w-xl text-white/85">Escríbenos por WhatsApp para una respuesta inmediata, o completa el formulario y te contactamos.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Escribir por WhatsApp</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white bg-white text-brand-ink hover:bg-white/90">
                <a href="https://www.facebook.com/share/19bA83jsCd/" target="_blank" rel="noreferrer"><Link2 /> Ver Facebook <ExternalLink /></a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="site-container grid gap-8 py-16 lg:grid-cols-[1fr_1.2fr] lg:py-20">
        <div className="card-shadow p-6 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Información de contacto</p>
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
              <dd className="mt-2 text-muted-foreground">bioemplastsas@gmail.com</dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-sm font-bold">
                <MapPin className="size-4 text-brand-green-dark" /> Ubicación
              </dt>
              <dd className="mt-2 text-muted-foreground">
                {DIRECCION}
                <br />
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand-green-dark hover:text-brand-green">
                  Abrir en Google Maps <ExternalLink className="size-3.5" />
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold">Horario de atención</dt>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Lunes a viernes · 8:30 a.m. – 5:30 p.m.
                <br />
                Sábados · 8:30 a.m. – 2:00 p.m.
                <br />
                Domingos y festivos: sin servicio
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </AnimatedSection>

      <AnimatedSection className="site-container pb-16 lg:pb-20">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Cómo llegar</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Encuéntranos aquí</h2>
        <div className="card-shadow mt-8 overflow-hidden">
          <iframe
            title="Ubicación de Bio Emplast"
            src={MAP_EMBED_URL}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-container pb-20 lg:pb-28">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Así nos vas a encontrar</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Nuestro local en fotos</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card-shadow overflow-hidden">
            <img src="/ubicacion-1.jpg" alt="Fachada del local de Bio Emplast" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="card-shadow overflow-hidden">
            <img src="/ubicacion-2.jpg" alt="Vista de la entrada de Bio Emplast" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}