import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MapPin, MessageCircle, MousePointerClick, Truck } from "lucide-react"

import { departamentosColombia, COLOMBIA_MAP_VIEWBOX, bogotaDC } from "../data/colombiaMap"
import { linkWhatsApp } from "../data/productos"

export function ColombiaMap() {
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)

  const activo = hover ?? selected

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-green-dark">
          <Truck className="size-3.5" /> Cobertura nacional
        </span>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">¡Hacemos envíos a todo el país!</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Selecciona tu departamento y te confirmamos el tiempo de entrega por WhatsApp.</p>

        <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <MousePointerClick className="size-3.5 animate-bounce text-brand-green-dark" /> Toca cualquier departamento en el mapa
        </p>

        <AnimatePresence mode="wait">
          {activo && (
            <motion.div
              key={activo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-6 inline-flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <p className="flex items-center gap-2 font-bold">
                <MapPin className="size-4 text-brand-green-dark" /> {activo.nombre}
              </p>
              <a href={linkWhatsApp(`Hola Bio Emplast, quisiera saber el tiempo de entrega a ${activo.nombre}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-brand-green px-4 py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
                <MessageCircle className="size-3.5" /> Preguntar tiempo de entrega
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="card-shadow overflow-hidden bg-white p-4">
        <svg viewBox={COLOMBIA_MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label="Mapa de departamentos de Colombia">
          {departamentosColombia.map((dep, i) => {
            const isActive = activo?.id === dep.id
            return (
              <g key={dep.id}>
                {dep.paths.map((d, j) => (
                  <motion.path
                    key={j}
                    d={d}
                    onMouseEnter={() => setHover(dep)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelected(dep)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.015 }}
                    className={`cursor-pointer stroke-white transition-[fill,filter] duration-200 ${
                      isActive
                        ? "fill-brand-green [filter:drop-shadow(0_0_5px_rgba(56,206,10,0.65))]"
                        : "fill-brand-green-dark/25 hover:fill-brand-green-dark/55 hover:[filter:drop-shadow(0_0_3px_rgba(20,83,45,0.4))]"
                    }`}
                    strokeWidth="1"
                  />
                ))}
              </g>
            )
          })}

          <circle cx={bogotaDC.x} cy={bogotaDC.y} r={activo?.id === bogotaDC.id ? 9 : 7} className={`transition-opacity animate-ping ${activo?.id === bogotaDC.id ? "fill-brand-yellow/40" : "fill-brand-green/40"}`} />
          <circle
            cx={bogotaDC.x}
            cy={bogotaDC.y}
            r={activo?.id === bogotaDC.id ? 6 : 4}
            onMouseEnter={() => setHover(bogotaDC)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setSelected(bogotaDC)}
            className={`cursor-pointer stroke-white transition-all ${activo?.id === bogotaDC.id ? "fill-brand-yellow" : "fill-brand-green-dark"}`}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  )
}