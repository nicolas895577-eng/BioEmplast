import { useState } from "react"

const procesos = [
  { titulo: "Proceso 1", video: "/videos/proceso-1.mp4", poster: "/videos/proceso-1.jpg" },
  { titulo: "Proceso 2", video: "/videos/proceso-2.mp4", poster: "/videos/proceso-2.jpg" },
  { titulo: "Proceso 3", video: "/videos/proceso-3.mp4", poster: "/videos/proceso-3.jpg" },
  { titulo: "Proceso 4", video: "/videos/proceso-4.mp4", poster: "/videos/proceso-4.jpg" },
]

export function ProcessVideos() {
  const [active, setActive] = useState(0)
  const current = procesos[active]

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="card-shadow overflow-hidden">
        <video key={current.video} controls preload="none" poster={current.poster} className="aspect-[9/16] w-full bg-black object-cover">
          <source src={current.video} type="video/mp4" />
        </video>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {procesos.map((p, i) => (
          <button
            key={p.titulo}
            onClick={() => setActive(i)}
            aria-label={p.titulo}
            className={`overflow-hidden rounded-lg border-2 transition-colors ${i === active ? "border-brand-green" : "border-transparent hover:border-border"}`}
          >
            <img src={p.poster} alt={p.titulo} className="aspect-[9/16] w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}