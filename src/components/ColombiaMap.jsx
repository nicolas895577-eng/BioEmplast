import { useState } from "react"
import { MessageCircle, MapPin } from "lucide-react"

import { departamentosColombia, COLOMBIA_MAP_VIEWBOX, bogotaDC } from "../data/colombiaMap"
import { linkWhatsApp } from "../data/productos"

export function ColombiaMap() {
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)

  const activo = hover ?? selected

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Cobertura</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Consulta si hacemos envíos a tu departamento</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Selecciona tu departamento en el mapa y te confirmamos por WhatsApp disponibilidad y tiempos de entrega.</p>
        {activo && (
          <div className="mt-6 inline-flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4">
            <p className="flex items-center gap-2 font-bold"><MapPin className="size-4 text-brand-green-dark" /> {activo.nombre}</p>
            <a href={linkWhatsApp(`Hola Bio Emplast, quisiera saber si hacen envíos a ${activo.nombre}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-brand-green px-4 py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
              <MessageCircle className="size-3.5" /> Preguntar por WhatsApp
            </a>
          </div>
        )}
      </div>

      <div className="card-shadow overflow-hidden bg-white p-4">
        <svg viewBox={COLOMBIA_MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label="Mapa de departamentos de Colombia">
          {departamentosColombia.map((dep) => {
            const isActive = activo?.id === dep.id
            return (
              <g key={dep.id}>
                {dep.paths.map((d, i) => (
                  <path key={i} d={d} onMouseEnter={() => setHover(dep)} onMouseLeave={() => setHover(null)} onClick={() => setSelected(dep)} className={`cursor-pointer stroke-white transition-colors ${isActive ? "fill-brand-green" : "fill-brand-green-dark/25 hover:fill-brand-green-dark/50"}`} strokeWidth="1" />
                ))}
              </g>
            )
          })}
          <circle cx={bogotaDC.x} cy={bogotaDC.y} r={activo?.id === bogotaDC.id ? 6 : 4} onMouseEnter={() => setHover(bogotaDC)} onMouseLeave={() => setHover(null)} onClick={() => setSelected(bogotaDC)} className={`cursor-pointer stroke-white transition-all ${activo?.id === bogotaDC.id ? "fill-brand-yellow" : "fill-brand-green-dark"}`} strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}