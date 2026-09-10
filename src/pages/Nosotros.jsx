import { ArrowRight, MessageCircle, Target, TrendingUp, Leaf } from "lucide-react"

import { Button } from "../components/ui/Button"
import { AnimatedSection } from "../components/AnimatedSection"
import { whatsappUrl } from "../components/SiteShell"

// TODO: reemplazar con cifras reales de Bio Emplast cuando la clienta las confirme
const estadisticas = [
  { valor: "5+", etiqueta: "Años de experiencia" },
  { valor: "150+", etiqueta: "Clientes atendidos" },
  { valor: "100%", etiqueta: "Materiales responsables" },
  { valor: "24h", etiqueta: "Tiempo de respuesta" },
]

const principios = [
  {
    icon: Target,
    titulo: "Misión",
    texto:
      "Ofrecer soluciones de empaque industrial que respondan con precisión a las necesidades de cada cliente, combinando calidad, disponibilidad y una atención cercana.",
  },
  {
    icon: Leaf,
    titulo: "Visión",
    texto:
      "Ser un aliado reconocido en Colombia por hacer que los procesos de empaque sean más eficientes, confiables y responsables con los recursos.",
  },
  {
    icon: TrendingUp,
    titulo: "Objetivos",
    texto:
      "Ampliar continuamente nuestro portafolio, acompañar a cada empresa con asesoría útil y promover alternativas que reduzcan el impacto del empaque sin comprometer su desempeño.",
  },
]

export default function Nosotros() {
  return (
    <>
      {/* ENCABEZADO + ESTADÍSTICAS */}
      <AnimatedSection className="site-container grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">
            Nosotros
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Trayectoria construida con responsabilidad
          </h1>
          {/* TODO: confirmar años reales de operación y ajustar el titular si aplica */}
          <p className="mt-6 max-w-lg text-muted-foreground leading-7">
            En Bio Emplast combinamos experiencia industrial con un enfoque ecológico, para
            que protejas tu producto sin perder de vista el impacto ambiental de tu
            operación. Acompañamos procesos comerciales e industriales con un portafolio
            versátil y asesoría directa.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            {estadisticas.map((e) => (
              <div key={e.etiqueta} className="stat-card">
                <p className="text-2xl font-extrabold text-brand-green-dark">{e.valor}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="card-shadow overflow-hidden">
            <img
              src="/productos/bolsa-manija-colores-negra-blanca-naranj-bolsa-20klx100-48.jpg"
              alt="Bolsas Bio Emplast"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-lg bg-brand-green-dark px-4 py-3 text-white shadow-lg">
            <p className="text-sm font-bold">Empaque responsable</p>
          </div>
        </div>
      </AnimatedSection>

      {/* MISIÓN / VISIÓN / OBJETIVOS */}
      <section className="bg-secondary/60 py-20 lg:py-28">
        <AnimatedSection className="site-container">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">
            Propósito
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Propósito claro, operación limpia
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principios.map((p, i) => (
              <AnimatedSection key={p.titulo} as="div" delay={i * 0.1} className="card-shadow p-7">
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand-green/15">
                  <p.icon className="size-5 text-brand-green-dark" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{p.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.texto}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA FINAL */}
      <AnimatedSection className="site-container py-20 lg:py-28">
        <div className="card-shadow flex flex-col items-start gap-6 bg-brand-green-dark p-10 text-white sm:flex-row sm:items-center sm:justify-between lg:p-14">
          <h2 className="max-w-lg text-2xl font-extrabold sm:text-3xl">
            ¿Tiene un reto de empaque?
          </h2>
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> Conversemos <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </AnimatedSection>
    </>
  )
}
