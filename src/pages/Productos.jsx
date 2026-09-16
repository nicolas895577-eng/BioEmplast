import { MessageCircle, Search, X } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { useMemo, useState } from "react"

import { AnimatedSection } from "../components/AnimatedSection"
import { catalogo } from "../data/catalogo"
import { linkWhatsApp } from "../data/productos"

const notas = {
  "empaques-basicos": "Soluciones esenciales",
  "stretch-film": "14 medidas",
  vinipel: "22 medidas",
  "bolsa-manija": "9 tamaños · 7 colores",
  "rollos-precorte": "10 tipos",
  bioseguridad: "4 referencias",
  zunchos: "Sujeción industrial",
}

function tarjetasDe(grupo) {
  const tarjetas = []
  if (grupo.items) {
    for (const it of grupo.items) tarjetas.push({ label: it.nombre, imagen: it.imagen })
  }
  if (grupo.subgrupos) {
    const multiple = grupo.subgrupos.length > 1
    for (const sg of grupo.subgrupos) {
      for (const v of sg.variantes) {
        tarjetas.push({
          label: multiple ? `${sg.nombre} · ${v.etiqueta}` : v.etiqueta,
          imagen: v.imagen,
        })
      }
    }
  }
  return tarjetas
}

function ImgOrPlaceholder({ src, alt }) {
  const [failed, setFailed] = useState(!src)
  if (failed) {
    return <div className="flex h-full w-full items-center justify-center bg-secondary text-xs text-muted-foreground">Foto pendiente</div>
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
}

function ProductoTarjeta({ label, imagen, categoria }) {
  return (
    <div className="group card-shadow overflow-hidden">
      <div className="aspect-square overflow-hidden bg-secondary">
        <ImgOrPlaceholder src={imagen} alt={label} />
      </div>
      <div className="p-4">
        {categoria && <p className="text-[11px] font-bold uppercase tracking-wide text-brand-green-dark">{categoria}</p>}
        <p className="text-sm font-semibold leading-snug text-foreground">{label}</p>
        <a href={linkWhatsApp(`Hola Bio Emplast, quisiera cotizar: ${label}`)} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-green py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
          <MessageCircle className="size-3.5" /> Cotizar por WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function Productos() {
  const [active, setActive] = useState(0)
  const [search, setSearch] = useState("")

  const allTarjetas = useMemo(
    () => catalogo.flatMap((g) => tarjetasDe(g).map((t) => ({ ...t, categoria: g.nombre }))),
    []
  )

  const searching = search.trim().length > 0
  const resultados = useMemo(() => {
    if (!searching) return []
    const term = search.trim().toLowerCase()
    return allTarjetas.filter((t) => t.label.toLowerCase().includes(term))
  }, [search, searching, allTarjetas])

  const grupo = catalogo[active]
  const tarjetas = tarjetasDe(grupo)

  return (
    <>
      <Helmet>
        <title>Productos | Catálogo Bio Emplast</title>
        <meta name="description" content="Catálogo de stretch film, bolsas, vinipel, precortes, bioseguridad y zunchos. Cotiza cada producto directo por WhatsApp." />
      </Helmet>

      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <img src="/productos/bolsa-manija-colores-negra-blanca-naranj-bolsa-20klx100-48.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="site-container relative py-20 text-white">
          <AnimatedSection className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-yellow">Catálogo</p>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Una solución para cada forma de empacar</h1>
            <p className="mt-4 max-w-xl text-white/85">Selecciona una línea de producto para ver las medidas y colores disponibles.</p>
          </AnimatedSection>
        </div>
      </section>

      <div className="site-container pt-14">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o medida..."
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none focus:border-brand-green"
          />
          {searching && (
            <button onClick={() => setSearch("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {searching ? (
        <AnimatedSection className="site-container py-14 lg:py-20">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {resultados.length > 0 ? `${resultados.length} resultado${resultados.length === 1 ? "" : "s"} para "${search}"` : `Sin resultados para "${search}"`}
          </h2>
          {resultados.length === 0 && (
            <p className="mt-3 text-muted-foreground">Prueba con otra palabra, o escríbenos por WhatsApp y te confirmamos disponibilidad.</p>
          )}
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {resultados.map((t) => (
              <ProductoTarjeta key={`${t.categoria}-${t.label}`} label={t.label} imagen={t.imagen} categoria={t.categoria} />
            ))}
          </div>
        </AnimatedSection>
      ) : (
        <>
          <div className="site-container pt-8">
            <div className="flex flex-wrap gap-3 border-b border-border pb-8">
              {catalogo.map((g, i) => (
                <button key={g.id} onClick={() => setActive(i)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${active === i ? "bg-brand-green-dark text-white" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
                  {g.nombre}
                </button>
              ))}
            </div>
          </div>

          <AnimatedSection key={grupo.id} className="site-container py-14 lg:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{grupo.nombre}</h2>
              <span className="hidden text-sm text-muted-foreground sm:block">{notas[grupo.id]}</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{grupo.descripcion}</p>

            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {tarjetas.map((t) => (
                <ProductoTarjeta key={t.label} label={t.label} imagen={t.imagen} />
              ))}
            </div>
          </AnimatedSection>
        </>
      )}
    </>
  )
}