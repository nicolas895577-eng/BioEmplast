import { ArrowRight, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Target } from "lucide-react"
import { Helmet } from "react-helmet-async"

import { Button } from "../components/ui/Button"
import { AnimatedSection } from "../components/AnimatedSection"
import { whatsappUrl } from "../components/SiteShell"

const valores = [
  { icon: Sparkles, titulo: "Responsabilidad Social", texto: "Promovemos el uso eficiente de los recursos y la evolución hacia materiales plásticos con menor impacto ambiental." },
  { icon: ShieldCheck, titulo: "Confiabilidad", texto: "Cumplimos con precisión en los tiempos de entrega y mantenemos un suministro estable, asegurando que los procesos de empaque de nuestros clientes nunca se detengan." },
  { icon: Target, titulo: "Calidad Técnica", texto: "Nos autoexigimos la máxima precisión en cada producto, garantizando la protección total del producto final." },
  { icon: HeartHandshake, titulo: "Orientación al Cliente", texto: "Diseñamos y adaptamos nuestros productos a las necesidades específicas de cada industria, convirtiéndonos en un socio estratégico para el crecimiento de sus marcas." },
]

export default function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Nosotros | Bio Emplast</title>
        <meta name="description" content="Conoce la misión, visión y valores de Bio Emplast S.A.S., empresa colombiana de empaques plásticos flexibles." />
      </Helmet>

      <AnimatedSection className="site-container py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Nosotros</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Empaques plásticos flexibles de alta calidad</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          En Bioemplast S.A.S. nos dedicamos a la fabricación y comercialización de empaques plásticos flexibles de alta calidad. Integramos tecnología avanzada de impresión flexográfica y soluciones de empaque al vacío, asegurando la máxima protección de sus productos y un servicio eficiente para la industria alimenticia y agropecuaria.
        </p>
      </AnimatedSection>

      <section className="bg-secondary/60 py-20 lg:py-28">
        <AnimatedSection className="site-container grid gap-8 md:grid-cols-2">
          <div className="card-shadow p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Misión</p>
            <p className="mt-5 text-lg leading-8">
              Fabricar y comercializar empaques plásticos flexibles de alta calidad, integrando tecnología avanzada de impresión flexográfica y soluciones de empaque al vacío, para garantizar un suministro confiable y la máxima protección de los productos de nuestros clientes en la industria alimenticia y agropecuaria.
            </p>
          </div>
          <div className="card-shadow p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Visión 2036</p>
            <p className="mt-5 text-lg leading-8">
              Ser una empresa líder a nivel nacional en la producción de empaques flexibles. Nos proyectamos como el aliado estratégico ideal mediante la calidad superior, el suministro puntual y soluciones innovadoras que impulsan el desarrollo sostenible y el cuidado del medio ambiente.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection className="site-container py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Nuestros valores</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Lo que guía cada decisión</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v, i) => (
            <AnimatedSection key={v.titulo} as="div" delay={i * 0.08} className="card-shadow p-7">
              <div className="flex size-11 items-center justify-center rounded-lg bg-brand-green/15">
                <v.icon className="size-5 text-brand-green-dark" />
              </div>
              <h3 className="mt-5 font-bold">{v.titulo}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{v.texto}</p>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection as="section" className="bg-brand-green-dark py-20 text-center text-white lg:py-28">
        <div className="site-container">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">¿Tiene un reto de empaque?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Cuéntanos qué necesitas y te ayudamos a encontrar la solución de empaque correcta.</p>
          <div className="mt-8">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Conversemos <ArrowRight className="size-4" /></a>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}