import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ImageOff, Loader2, LogOut, Pencil, Plus, Trash2 } from "lucide-react"

import { supabase } from "../../lib/supabase"

export default function AdminDashboard() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function cargarProductos() {
    setLoading(true)
    const { data, error: fetchError } = await supabase.from("productos").select("*").order("categoria").order("orden")
    if (fetchError) {
      setError(fetchError.message)
    } else {
      setProductos(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  async function handleEliminar(id, nombreProducto) {
    if (!window.confirm(`¿Seguro que quieres eliminar "${nombreProducto}"?`)) return
    const { error: deleteError } = await supabase.from("productos").delete().eq("id", id)
    if (deleteError) {
      setError(deleteError.message)
    } else {
      setProductos((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-secondary/60">
      <Helmet>
        <title>Panel de administración | Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="bg-brand-green-dark text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img src="/logo-icono.png" alt="" className="h-7 w-auto sm:h-8" />
            <div>
              <p className="font-display text-sm font-extrabold leading-none">Bio Emplast</p>
              <p className="hidden text-xs text-white/70 sm:block">Panel de administración</p>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold transition-colors hover:bg-white/20">
            <LogOut className="size-3.5" /> <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {error && <p className="mb-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">
            {productos.length} producto{productos.length === 1 ? "" : "s"} en el catálogo
          </p>
          <Link to="/admin/productos/nuevo" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-green/85">
            <Plus className="size-4" /> Agregar producto
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-brand-green-dark" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => (
              <div key={p.id} className="card-shadow flex items-center gap-3 bg-card p-3 transition-shadow hover:shadow-lg">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
                  {p.imagen_url ? (
                    <img src={p.imagen_url} alt={p.nombre} className="h-full w-full object-cover" />
                  ) : (
                    <ImageOff className="size-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold uppercase tracking-wide text-brand-green-dark">{p.categoria}</p>
                  <p className="truncate text-sm font-semibold">{p.nombre}</p>
                </div>
                <Link to={`/admin/productos/${p.id}/editar`} aria-label={`Editar ${p.nombre}`} className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-brand-green/15 hover:text-brand-green-dark">
                  <Pencil className="size-4" />
                </Link>
                <button onClick={() => handleEliminar(p.id, p.nombre)} aria-label={`Eliminar ${p.nombre}`} className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}