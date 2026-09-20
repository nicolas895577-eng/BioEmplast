import {
  Boxes,
  ImageOff,
  Layers,
  Link2,
  Loader2,
  MessageCircle,
  Package2,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react"
import { Helmet } from "react-helmet-async"
import { useDeferredValue, useEffect, useMemo, useState } from "react"

import { AnimatedSection } from "../components/AnimatedSection"
import { NewProductSection } from "../components/NewProductSection"
import { supabase } from "../lib/supabase"
import { linkWhatsApp } from "../data/productos"

const iconosCategoria = {
  "Empaques y Bolsas Básicas": Boxes,
  "Stretch Film": Layers,
  "Vinipel": Layers,
  "Bolsa Manija": ShoppingBag,
  "Rollos de Precorte": Scissors,
  "Elementos de Bioseguridad": ShieldCheck,
  "Zunchos Plásticos y Grapas": Link2,
}

function resaltar(texto, termino) {
  if (!termino) return texto
  const idx = texto.toLowerCase().indexOf(termino.toLowerCase())
  if (idx === -1) return texto
  return (
    <>
      {texto.slice(0, idx)}
      <mark className="rounded-sm bg-brand-yellow/50 text-inherit">{texto.slice(idx, idx + termino.length)}</mark>
      {texto.slice(idx + termino.length)}
    </>
  )
}

function ImagenProducto({ src, alt }) {
  const [estado, setEstado] = useState(src ? "cargando" : "error")

  if (estado === "error") {
    return <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-secondary text-muted-foreground"><ImageOff className="size-5" strokeWidth={1.5} /><span className="text-[11px] font-medium">Foto próximamente</span></div>
  }

  return (
    <>
      {estado === "cargando" && <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden="true" />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setEstado("lista")} onError={() => setEstado("error")} className={`h-full w-full object-contain p-3 transition-all duration-300 group-hover:scale-[1.03] ${estado === "cargando" ? "opacity-0" : "opacity-100"}`} />
    </>
  )
}

function ProductoTarjeta({ label, imagen, categoria, termino }) {
  return (
    <div className="group card-shadow overflow-hidden bg-card transition-shadow duration-200 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-white">
        <ImagenProducto src={imagen} alt={`${label}${categoria ? ` — ${categoria}` : ""}, empaque industrial Bio Emplast`} />
      </div>
      <div className="p-4">
        {categoria && <p className="text-[11px] font-bold uppercase tracking-wide text-brand-green-dark">{categoria}</p>}
        <p className="text-sm font-semibold leading-snug text-foreground">{resaltar(label, termino)}</p>
        <a href={linkWhatsApp(`Hola Bio Emplast, quisiera cotizar: ${label}`)} target="_blank" rel="noreferrer" aria-label={`Cotizar ${label} por WhatsApp`} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-green py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-dark">
          <MessageCircle className="size-3.5" /> Cotizar por WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState("")
  const [active, setActive] = useState(0)
  const [search, setSearch] = useState("")
  const terminoBusqueda = useDeferredValue(search.trim())

  useEffect(() => {
    async function cargar() {
      if (!supabase) {
        setErrorCarga("El catálogo no está disponible en este momento.")
        setCargando(false)
        return
      }
      const { data, error } = await supabase.from("productos").select("*").order("orden")
      if (error) {
        setErrorCarga(error.message)
      } else {
        setProductos(data ?? [])
      }
      setCargando(false)
    }
    cargar()
  }, [])

  const categorias = useMemo(() => {
    const vistas = []
    for (const p of productos) {
      if (!vistas.includes(p.categoria)) vistas.push(p.categoria)
    }
    return vistas
  }, [productos])

  const tarjetasPorCategoria = useMemo(() => {
    const mapa = {}
    for (const p of productos) {
      if (!mapa[p.categoria]) mapa[p.categoria] = []
      mapa[p.categoria].push({ label: p.nombre, imagen: p.imagen_url })
    }
    return mapa
  }, [productos])

  const searching = terminoBusqueda.length > 0
  const resultados = useMemo(() => {
    if (!searching) return []
    const term = terminoBusqueda.toLowerCase()
    return productos.filter((p) => p.nombre.toLowerCase().includes(term)).map((p) => ({ label: p.nombre, imagen: p.imagen_url, categoria: p.categoria }))
  }, [searching, terminoBusqueda, productos])

  const categoriaActiva = categorias[active]
  const tarjetas = categoriaActiva ? tarjetasPorCategoria[categoriaActiva] ?? [] : []

  return (
    <>
      <Helmet>
        <title>Productos | Catálogo Bio Emplast</title>
        <meta name="description" content="Catálogo de stretch film, bolsas, vinipel, precortes, bioseguridad y zunchos. Cotiza cada producto directo por WhatsApp." />
      </Helmet>

      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
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

      <NewProductSection />

      <div className="site-container pt-14">
        <div className="relative max-w-md" role="search">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o medida..." aria-label="Buscar producto por nombre o medida" className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none transition-colors focus:border-brand-green" />
          {search.length > 0 && (
            <button onClick={() => setSearch("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {cargando ? (
        <div className="site-container flex justify-center py-24"><Loader2 className="size-6 animate-spin text-brand-green-dark" /></div>
      ) : errorCarga ? (
        <div className="site-container py-14"><p className="text-muted-foreground">{errorCarga}</p></div>
      ) : searching ? (
        <AnimatedSection className="site-container py-14 lg:py-20">
          <h2 className="text-2xl font-extrabold sm:text-3xl" role="status" aria-live="polite">
            {resultados.length > 0 ? `${resultados.length} resultado${resultados.length === 1 ? "" : "s"} para "${terminoBusqueda}"` : `Sin resultados para "${terminoBusqueda}"`}
          </h2>

          {resultados.length === 0 ? (
            <div className="mt-4 flex flex-col items-start gap-4">
              <p className="text-muted-foreground">Prueba con otra palabra, o escríbenos por WhatsApp y te confirmamos disponibilidad.</p>
              <a href={linkWhatsApp(`Hola Bio Emplast, busco: ${terminoBusqueda}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-brand-green px-4 py-2 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
                <MessageCircle className="size-4" /> Preguntar por "{terminoBusqueda}"
              </a>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {resultados.map((t) => (
                <ProductoTarjeta key={`${t.categoria}-${t.label}`} label={t.label} imagen={t.imagen} categoria={t.categoria} termino={terminoBusqueda} />
              ))}
            </div>
          )}
        </AnimatedSection>
      ) : (
        <>
          <nav aria-label="Líneas de producto" className="sticky top-16 z-10 border-b border-border bg-background/95 backdrop-blur">
            <div className="site-container">
              <div className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categorias.map((nombreCategoria, i) => {
                  const Icono = iconosCategoria[nombreCategoria] ?? Package2
                  const esActivo = active === i
                  return (
                    <button key={nombreCategoria} onClick={() => setActive(i)} aria-pressed={esActivo} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-dark ${esActivo ? "bg-brand-green-dark text-white" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
                      <Icono className="size-4" strokeWidth={2} />
                      {nombreCategoria}
                    </button>
                  )
                })}
              </div>
            </div>
          </nav>

          <AnimatedSection key={categoriaActiva} className="site-container py-14 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{categoriaActiva}</h2>
              <span className="text-sm text-muted-foreground">{tarjetas.length} referencia{tarjetas.length === 1 ? "" : "s"}</span>
            </div>

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