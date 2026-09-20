import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { ImageOff, ImagePlus, Loader2, LogOut, Pencil, Plus, Trash2, X } from "lucide-react"

import { supabase } from "../../lib/supabase"

export default function AdminDashboard() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [editandoId, setEditandoId] = useState(null)
  const [imagenActual, setImagenActual] = useState(null)
  const [categoria, setCategoria] = useState("")
  const [nombre, setNombre] = useState("")
  const [archivo, setArchivo] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [guardando, setGuardando] = useState(false)

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

  useEffect(() => {
    if (!archivo) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(archivo)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [archivo])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  function handleArchivoChange(e) {
    setArchivo(e.target.files?.[0] ?? null)
  }

  function handleEditar(p) {
    setEditandoId(p.id)
    setCategoria(p.categoria)
    setNombre(p.nombre)
    setImagenActual(p.imagen_url)
    setArchivo(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function cancelarEdicion() {
    setEditandoId(null)
    setCategoria("")
    setNombre("")
    setImagenActual(null)
    setArchivo(null)
  }

  async function subirFotoSiHay() {
    if (!archivo) return undefined
    const nombreArchivo = `${Date.now()}-${archivo.name}`
    const { error: uploadError } = await supabase.storage.from("productos-fotos").upload(nombreArchivo, archivo)
    if (uploadError) throw uploadError
    const { data: urlData } = supabase.storage.from("productos-fotos").getPublicUrl(nombreArchivo)
    return urlData.publicUrl
  }

  async function handleGuardar(e) {
    e.preventDefault()
    setGuardando(true)
    setError("")

    try {
      const nuevaImagenUrl = await subirFotoSiHay()

      if (editandoId) {
        const cambios = { categoria, nombre }
        if (nuevaImagenUrl !== undefined) cambios.imagen_url = nuevaImagenUrl
        const { error: updateError } = await supabase.from("productos").update(cambios).eq("id", editandoId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("productos").insert([{ categoria, nombre, imagen_url: nuevaImagenUrl ?? null }])
        if (insertError) throw insertError
      }

      cancelarEdicion()
      e.target.reset()
      await cargarProductos()
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  async function handleEliminar(id, nombreProducto) {
    if (!window.confirm(`¿Seguro que quieres eliminar "${nombreProducto}"?`)) return
    const { error: deleteError } = await supabase.from("productos").delete().eq("id", id)
    if (deleteError) {
      setError(deleteError.message)
    } else {
      setProductos((prev) => prev.filter((p) => p.id !== id))
      if (editandoId === id) cancelarEdicion()
    }
  }

  const categoriasExistentes = [...new Set(productos.map((p) => p.categoria))]

  return (
    <div className="min-h-screen bg-secondary/60">
      <Helmet>
        <title>Panel de administración | Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="bg-brand-green-dark text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo-icono.png" alt="" className="h-8 w-auto" />
            <div>
              <p className="font-display text-sm font-extrabold leading-none">Bio Emplast</p>
              <p className="text-xs text-white/70">Panel de administración</p>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-bold transition-colors hover:bg-white/20">
            <LogOut className="size-3.5" /> Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {error && <p className="mb-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        <form onSubmit={handleGuardar} className="card-shadow mb-10 bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Catálogo</p>
              <h2 className="mt-1 text-xl font-extrabold">{editandoId ? "Editar producto" : "Agregar producto nuevo"}</h2>
            </div>
            {editandoId && (
              <button type="button" onClick={cancelarEdicion} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-xs font-bold text-muted-foreground hover:bg-secondary/70">
                <X className="size-3.5" /> Cancelar edición
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="text-sm font-bold">Categoría</label>
              <input list="categorias" required value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ej: Stretch Film" className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-green" />
              <datalist id="categorias">
                {categoriasExistentes.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="text-sm font-bold">Nombre del producto</label>
              <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Stretch Negro 6X300MT" className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-green" />
            </div>

            <div>
              <label className="text-sm font-bold">{editandoId ? "Cambiar foto (opcional)" : "Foto (opcional)"}</label>
              <label htmlFor="foto" className="mt-1.5 flex h-[42px] w-full min-w-[160px] cursor-pointer items-center gap-2.5 rounded-md border border-dashed border-input bg-background px-3.5 text-sm text-muted-foreground transition-colors hover:border-brand-green hover:text-brand-green-dark">
                {previewUrl ? (
                  <img src={previewUrl} alt="" className="size-6 rounded object-cover" />
                ) : editandoId && imagenActual ? (
                  <img src={imagenActual} alt="" className="size-6 rounded object-cover" />
                ) : (
                  <ImagePlus className="size-4" />
                )}
                <span className="truncate">{archivo ? archivo.name : editandoId ? "Foto actual (sin cambios)" : "Elegir imagen..."}</span>
              </label>
              <input id="foto" type="file" accept="image/*" onChange={handleArchivoChange} className="hidden" />
            </div>
          </div>

          <button type="submit" disabled={guardando} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-green/85 disabled:opacity-60">
            {guardando ? (
              <><Loader2 className="size-4 animate-spin" /> Guardando...</>
            ) : editandoId ? (
              <><Pencil className="size-4" /> Guardar cambios</>
            ) : (
              <><Plus className="size-4" /> Agregar producto</>
            )}
          </button>
        </form>

        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">
            {productos.length} producto{productos.length === 1 ? "" : "s"} en el catálogo
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-brand-green-dark" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => (
              <div key={p.id} className={`card-shadow flex items-center gap-3 bg-card p-3 transition-shadow hover:shadow-lg ${editandoId === p.id ? "ring-2 ring-brand-green" : ""}`}>
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
                <button onClick={() => handleEditar(p)} aria-label={`Editar ${p.nombre}`} className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-brand-green/15 hover:text-brand-green-dark">
                  <Pencil className="size-4" />
                </button>
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