import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Button } from "./ui/Button"
import { linkWhatsApp } from "../data/productos"

// Selección curada de productos representativos para el carrusel de inicio
// (una foto real por línea de producto, tomadas del catálogo verdadero).
const destacados = [
  {
    nombre: "Stretch Negro",
    imagen: "/productos/strech-negro-6x300mt-6.jpg",
  },
  {
    nombre: "Precorte Colores",
    imagen: "/productos/rollos--57.jpg",
  },
  {
    nombre: "Bolsa Manija",
    imagen: "/productos/bolsa-manija-colores-negra-blanca-naranj-bolsa-20klx100-48.jpg",
  },
  {
    nombre: "Empaque al Vacío",
    imagen: "/productos/empaque-vacio-2.jpg",
  },
  {
    nombre: "Rollos de Precorte Tripa",
    imagen: "/productos/rollos-precorte-tripa-59.jpg",
  },
]

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    onSelect()
    emblaApi.on("select", onSelect)
    return () => emblaApi.off("select", onSelect)
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {destacados.map((item) => (
            <div
              key={item.nombre}
              className="min-w-[80%] sm:min-w-[45%] lg:min-w-[24%] shrink-0"
            >
              <div className="card-shadow overflow-hidden">
                <div className="aspect-[4/3] bg-secondary">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground">{item.nombre}</h3>
                  <a
                    href={linkWhatsApp(`Hola Bio Emplast, quisiera cotizar: ${item.nombre}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green px-4 py-2.5 text-sm font-bold text-brand-ink hover:bg-brand-green/85 transition-colors"
                  >
                    <MessageCircle className="size-4" /> Contacto por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!canPrev}
        aria-label="Anterior"
        className="absolute left-0 top-1/3 -translate-x-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-md disabled:opacity-30"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canNext}
        aria-label="Siguiente"
        className="absolute right-0 top-1/3 translate-x-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-md disabled:opacity-30"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}
