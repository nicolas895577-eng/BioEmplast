import { MessageCircle, Sparkles } from "lucide-react"

import { linkWhatsApp } from "../data/productos"

const presentaciones = [
  {
    nombre: "Industrial",
    imagen: "/nuevo-producto/una-industrial.jpg",
    detalles: ["Medidas: 65 x 90 cm", "6 unidades"],
  },
  {
    nombre: "Cocina y Tienda",
    imagen: "/nuevo-producto/una-cocina-tienda.jpg",
    detalles: ["Medidas: 60 x 80 cm", "Calibre: 1.2", "20 unidades", "Ideal para cocina pequeña y tiendas"],
  },
  {
    nombre: "Papelera",
    imagen: "/nuevo-producto/una-papelera.jpg",
    detalles: ["Medidas: 40 x 55 cm", "20 unidades"],
  },
]

export function NewProductSection() {
  return (
    <section className="bg-secondary/60 py-16 lg:py-20">
      <div className="site-container">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-green-dark">
          <Sparkles className="size-3.5" /> Nuevo producto
        </span>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Una a Una</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Bolsa por bolsa, sin desorden. Dispensador práctico e higiénico, sin necesidad de tocar el resto del rollo.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          <div className="card-shadow overflow-hidden">
            <img src="/nuevo-producto/una-lifestyle.jpg" alt="Bolsas Una a Una en uso" className="aspect-[3/2] w-full object-cover lg:h-full lg:aspect-auto" />
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-3">
            {presentaciones.map((p) => (
              <div key={p.nombre} className="card-shadow flex h-full flex-col overflow-hidden">
                <div className="aspect-square bg-white">
                  <img src={p.imagen} alt={`Una a Una ${p.nombre}`} className="h-full w-full object-contain p-2" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-bold">{p.nombre}</p>
                  <ul className="mt-1.5 flex-1 space-y-0.5 text-xs text-muted-foreground">
                    {p.detalles.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <a href={linkWhatsApp(`Hola Bio Emplast, quisiera cotizar: Una a Una - ${p.nombre}`)} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-green py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
                    <MessageCircle className="size-3.5" /> Cotizar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}