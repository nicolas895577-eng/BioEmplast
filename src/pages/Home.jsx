import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {
  ArrowRight,
  Award,
  Camera,
  CheckCircle2,
  Headphones,
  Link2,
  MessageCircle,
  Recycle,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { Button } from "../components/ui/Button"
import { AnimatedSection } from "../components/AnimatedSection"
import { ProductCarousel } from "../components/ProductCarousel"
import { ProcessVideos } from "../components/ProcessVideos"
import { whatsappUrl } from "../components/SiteShell"

const razones = [
  { icon: Recycle, titulo: "Enfoque ecológico", texto: "Materiales y procesos orientados a reducir el impacto ambiental de tu operación." },
  { icon: ShieldCheck, titulo: "Calidad garantizada", texto: "Control de espesor, resistencia y sellado en cada lote que sale de nuestra planta." },
  { icon: Truck, titulo: "Entrega puntual", texto: "Programamos despachos para que tu producción nunca se detenga por falta de material." },
  { icon: Headphones, titulo: "Atención personalizada", texto: "Un asesor te acompaña desde la cotización hasta la entrega de tu pedido." },
]

const estadisticas = [
  { valor: "5+", etiqueta: "Años de experiencia" },
  { valor: "150+", etiqueta: "Clientes atendidos" },
  { valor: "100%", etiqueta: "Materiales responsables" },
  { valor: "24h", etiqueta: "Tiempo de respuesta" },
]

const redes = [
  { nombre: "Instagram", usuario: "@bioemplast", icon: Camera, gradiente: "from-orange-400 to-pink-600", url: "https://instagram.com" },
  { nombre: "Facebook", usuario: "Bio Emplast", icon: Link2, gradiente: "from-blue-500 to-blue-700", url: "https://facebook.com" },
]

const preguntas = [
  { q: "¿Cómo cotizo un producto?", a: "Encuentra el producto en la sección Productos y da clic en \"Cotizar por WhatsApp\", o escríbenos directamente contándonos qué necesitas." },
  { q: "¿Puedo visitar el local?", a: "Sí, puedes visitarnos en nuestro local en Bogotá. Encuentra la dirección exacta y fotos en la sección de Contacto." },
  { q: "¿Qué tipos de empaque manejan?", a: "Manejamos stretch film, bolsas, vinipel, precortes, elementos de bioseguridad y más. Puedes ver el catálogo completo en la sección Productos." },
  { q: "¿Qué hago si no encuentro lo que necesito en el catálogo?", a: "Escríbenos por WhatsApp contándonos qué necesitas, y te confirmamos disponibilidad." },
]

const checklistProceso = [
  "Maquinaria industrial en cada etapa del proceso",
  "Control de calidad y trazabilidad en la producción",
  "Bodega organizada y lista para despacho",
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Bio Emplast | Empaque industrial con enfoque ecológico</title>
        <meta name="description" content="Bio Emplast S.A.S.: stretch film, bolsas, vinipel, precortes y bioseguridad para la industria alimenticia y agropecuaria. Cotiza por WhatsApp." />
      </Helmet>

      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img src="/productos/rollos--57.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="site-container relative py-24 text-white">
          <AnimatedSection className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-yellow">Empaque industrial · Colombia</p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Expertos en <span className="text-brand-green">empaque industrial</span> con enfoque ecológico
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Producimos stretch film, bolsas especializadas, vinipel y servicios de precorte con trazabilidad. Protegemos tu producto y cuidamos el planeta.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar por WhatsApp</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white bg-white text-brand-ink hover:bg-white/90">
                <Link to="/productos">Ver productos</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="site-container py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Catálogo</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Productos más relevantes</h2>
          <p className="max-w-sm text-sm text-muted-foreground">Explora algunas de nuestras líneas más solicitadas.</p>
        </div>
        <div className="mt-10">
          <ProductCarousel />
        </div>
      </AnimatedSection>

      <section className="bg-secondary/60 py-20 lg:py-28">
        <AnimatedSection className="site-container">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Por qué elegirnos</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Ventajas que hacen la diferencia</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {razones.map((r, i) => (
              <AnimatedSection key={r.titulo} as="div" delay={i * 0.08} className="card-shadow p-6">
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand-green/15">
                  <r.icon className="size-5 text-brand-green-dark" />
                </div>
                <h3 className="mt-5 font-bold">{r.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.texto}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection className="site-container grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Nosotros</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Comprometidos con un empaque más responsable</h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-7">
            En Bio Emplast combinamos experiencia industrial con un enfoque ecológico, para que protejas tu producto sin perder de vista el impacto ambiental de tu operación.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            {estadisticas.map((e) => (
              <div key={e.etiqueta} className="stat-card">
                <p className="text-2xl font-extrabold text-brand-green-dark">{e.valor}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.etiqueta}</p>
              </div>
            ))}
          </div>
          <Link to="/nosotros" className="mt-8 inline-flex items-center gap-2 font-bold text-brand-green-dark hover:text-brand-green">
            Conocer más sobre nosotros <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="card-shadow overflow-hidden">
            <img src="/productos/empaque-vacio-2.jpg" alt="Empaque al vacío Bio Emplast" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-lg bg-brand-green-dark px-4 py-3 text-white shadow-lg">
            <Award className="size-5 text-brand-yellow" />
            <span className="text-sm font-bold">Empaque responsable</span>
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-secondary/60 py-20 lg:py-28">
        <AnimatedSection className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-green-dark">
              Nuestro proceso
            </span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Así trabajamos, de principio a fin</h2>
            <p className="mt-5 text-muted-foreground leading-7">
              Cada pedido pasa por un proceso controlado, desde la selección de materia
              prima hasta el empaque final, respaldado por maquinaria industrial y
              personal capacitado en cada etapa de la producción.
            </p>
            <ul className="mt-6 space-y-3">
              {checklistProceso.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ProcessVideos />
        </AnimatedSection>
      </section>

      <AnimatedSection className="site-container text-center py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Redes sociales</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Síguenos para más contenido</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Novedades de producto, tips de empaque y lo que hacemos día a día en planta.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-xl mx-auto">
          {redes.map((r, i) => (
            <AnimatedSection key={r.nombre} as="a" delay={i * 0.1} className={`social-card bg-gradient-to-br ${r.gradiente}`}>
              <a href={r.url} target="_blank" rel="noreferrer" className="block">
                <r.icon className="mx-auto size-9" />
                <p className="mt-4 font-bold">{r.nombre}</p>
                <p className="text-sm text-white/80">{r.usuario}</p>
                <span className="mt-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">Seguir →</span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-container py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Preguntas frecuentes</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">¿Tienes dudas?</h2>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {preguntas.map((p) => (
            <details key={p.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                {p.q}
                <span className="ml-4 text-brand-green-dark transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{p.a}</p>
            </details>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-container pb-20 lg:pb-28">
        <div className="card-shadow flex flex-col items-start gap-6 bg-brand-green-dark p-10 text-white sm:flex-row sm:items-center sm:justify-between lg:p-14">
          <h2 className="max-w-lg text-2xl font-extrabold sm:text-3xl">¿Listo para tu próximo pedido de empaque?</h2>
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Escríbenos ahora</a>
          </Button>
        </div>
      </AnimatedSection>
    </>
  )
}