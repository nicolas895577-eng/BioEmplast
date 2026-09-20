import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, ImagePlus, Loader2, Save } from "lucide-react"

import { supabase } from "../../lib/supabase"

export default function AdminProductoForm() {
  const { id } = useParams()
  const editando = Boolean(id)
  const navigate = useNavigate()

  const [categoria, setCategoria] = useState("")
  const [nombre, setNombre] = useState("")
  const [imagenActual, setImagenActual] = useState(null)
  const [archivo, setArchivo] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [categoriasExistentes, setCategoriasExistentes] = useState([])
  const [cargando, setCargando] = useState(editando)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function cargarDatos() {
      const { data: cats } = await supabase.from("productos").select("categoria")
      if (cats) setCategoriasExistentes([...new Set(cats.map((c) => c.categoria))])

      if (editando) {
        const { data, error: fetchError } = await supabase.from("productos").select("*").eq("id", id).single()
        if (fetchError) {
          setError(fetchError.message)
        } else if (data) {
          setCategoria(data.categoria)
          setNombre(data.nombre)
          setImagenActual(data.imagen_url)
        }
        setCargando(false)
      }
    }
    cargarDatos()
  }, [id, editando])

  useEffect(() => {
    if (!archivo) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(archivo)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [archivo])

  function handleArchivoChange(e) {
    setArchivo(e.target.files?.[0] ?? null)
  }

  async function subirFotoSiHay() {
    if (!archivo) return undefined
    const nombreArchivo = `${Date.now()}-${archivo.name}`
    const { error: uploadError } = await supabase.storage.from("productos-fotos").upload(nombreArchivo, archivo)
    if (uploadError) throw uploadError
    const { data: urlData } = supabase.storage.from("productos-fotos").getPublicUrl(nombreArchivo)
    return urlData.publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGuardando(true)
    setError("")
    try {
      const nuevaImagenUrl = await subirFotoSiHay()
      if (editando) {
        const cambios = { categoria, nombre }
        if (nuevaImagenUrl !== undefined) cambios.imagen_url = nuevaImagenUrl
        const { error: updateError } = await supabase.from("productos").update(cambios).eq("id", id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("productos").insert([{ categoria, nombre, imagen_url: nuevaImagenUrl ?? null }])
        if (insertError) throw insertError
      }
      navigate("/admin")
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-brand-green-dark" /></div>
  }

  return (
    <div className="min-h-screen bg-secondary/60">
      <Helmet>
        <title>{editando ? "Editar producto" : "Agregar producto"} | Panel Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="bg-brand-green-dark text-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-6 py-4">
          <Link to="/admin" className="rounded-full p-1.5 hover:bg-white/10"><ArrowLeft className="size-5" /></Link>
          <div>
            <p className="font-display text-sm font-extrabold leading-none">Bio Emplast</p>
            <p className="text-xs text-white/70">Panel de administración</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <form onSubmit={handleSubmit} className="card-shadow bg-card p-6 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Catálogo</p>
          <h1 className="mt-1 text-xl font-extrabold">{editando ? "Editar producto" : "Agregar producto nuevo"}</h1>

          {error && <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

          <div className="mt-6 space-y-5">
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
              <label className="text-sm font-bold">{editando ? "Cambiar foto (opcional)" : "Foto (opcional)"}</label>
              <label htmlFor="foto" className="mt-1.5 flex h-[70px] w-full cursor-pointer items-center gap-3 rounded-md border border-dashed border-input bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-brand-green hover:text-brand-green-dark">
                {previewUrl ? (
                  <img src={previewUrl} alt="" className="size-12 rounded object-cover" />
                ) : editando && imagenActual ? (
                  <img src={imagenActual} alt="" className="size-12 rounded object-cover" />
                ) : (
                  <ImagePlus className="size-5" />
                )}
                <span className="truncate">{archivo ? archivo.name : editando ? "Foto actual (sin cambios)" : "Elegir imagen..."}</span>
              </label>
              <input id="foto" type="file" accept="image/*" onChange={handleArchivoChange} className="hidden" />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button type="submit" disabled={guardando} className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-green/85 disabled:opacity-60">
              {guardando ? <><Loader2 className="size-4 animate-spin" /> Guardando...</> : <><Save className="size-4" /> {editando ? "Guardar cambios" : "Agregar producto"}</>}
            </button>
            <Link to="/admin" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-muted-foreground hover:bg-secondary/70">
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}