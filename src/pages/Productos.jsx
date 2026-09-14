import { MessageCircle } from "lucide-react"
import { useState } from "react"

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
    return (
      <div className="flex h-full w-full items-center justify-center bg-secondary text-xs text-muted-foreground">
        Foto pendiente
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  )
}

function ProductoTarjeta({ label, imagen }) {
  return (
    <div className="group card-shadow overflow-hidden">
      <div className="aspect-square overflow-hidden bg-secondary">
        <ImgOrPlaceholder src={imagen} alt={label} />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug text-foreground">{label}</p>
        <a
          href={linkWhatsApp(`Hola Bio Emplast, quisiera cotizar: ${label}`)}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-green py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85"
        >
          <MessageCircle className="size-3.5" /> Cotizar por WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function Productos() {
  const [active, setActive] = useState(0)
  const grupo = catalogo[active]
  const tarjetas = tarjetasDe(grupo)

  return (
    <>
      <AnimatedSection className="site-container py-16 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">
          Catálogo
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
          Una solución para cada forma de empacar
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Selecciona una línea de producto para ver las medidas y colores disponibles.
        </p>
      </AnimatedSection>

      <div className="site-container">
        <div className="flex flex-wrap gap-3 border-b border-border pb-8">
          {catalogo.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                active === i
                  ? "bg-brand-green-dark text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/70"
              }`}
            >
              {g.nombre}
            </button>
          ))}
        </div>
      </div>

      <AnimatedSection key={grupo.id} className="site-container py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{grupo.nombre}</h2>
          <span className="hidden text-sm text-muted-foreground sm:block">
            {notas[grupo.id]}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{grupo.descripcion}</p>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {tarjetas.map((t) => (
            <ProductoTarjeta key={t.label} label={t.label} imagen={t.imagen} />
          ))}
        </div>
      </AnimatedSection>
    </>
  )
}