const procesos = [
  { titulo: "Proceso 1", video: "/videos/proceso-1.mp4", poster: "/videos/proceso-1.jpg" },
  { titulo: "Proceso 2", video: "/videos/proceso-2.mp4", poster: "/videos/proceso-2.jpg" },
  { titulo: "Proceso 3", video: "/videos/proceso-3.mp4", poster: "/videos/proceso-3.jpg" },
  { titulo: "Proceso 4", video: "/videos/proceso-4.mp4", poster: "/videos/proceso-4.jpg" },
]

export function ProcessVideos() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {procesos.map((p) => (
        <div key={p.titulo} className="card-shadow overflow-hidden">
          <video controls preload="none" poster={p.poster} className="aspect-video w-full bg-black">
            <source src={p.video} type="video/mp4" />
          </video>
          <div className="p-4">
            <p className="text-sm font-semibold">{p.titulo}</p>
          </div>
        </div>
      ))}
    </div>
  )
}