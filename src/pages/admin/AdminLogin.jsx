import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Loader2, ShieldCheck, Truck, Package } from "lucide-react"

import { supabase } from "../../lib/supabase"

const puntos = [
  { icon: Package, texto: "Administra el catálogo de productos" },
  { icon: ShieldCheck, texto: "Acceso protegido, solo para el equipo Bio Emplast" },
  { icon: Truck, texto: "Los cambios se reflejan al instante en el sitio público" },
]

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!supabase) {
      setError("Supabase no está configurado. Revisa el archivo .env.")
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      console.error("Error de autenticación:", authError)
      setError(`${authError.message} (código: ${authError.status || "sin código"})`)
      return
    }

    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-brand-green-dark">
      <Helmet>
        <title>Iniciar sesión | Panel Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto grid min-h-screen max-w-5xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center">
        <div className="hidden text-white lg:block">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo-bioemplast.png" alt="Bio Emplast" className="h-14 w-auto" />
          </Link>
          <h1 className="mt-8 text-3xl font-extrabold leading-tight">Panel de administración</h1>
          <p className="mt-4 max-w-sm text-white/80">
            Gestiona el catálogo de productos de tu sitio web sin necesidad de tocar código.
          </p>
          <ul className="mt-8 space-y-4">
            {puntos.map((p) => (
              <li key={p.texto} className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <p.icon className="size-4.5" />
                </div>
                <span className="text-sm text-white/90">{p.texto}</span>
              </li>
            ))}
          </ul>
          <Link to="/" className="mt-10 inline-block text-sm font-semibold text-white/70 hover:text-white">
            ← Volver al sitio público
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card-shadow mx-auto w-full max-w-sm bg-card p-8">
          <div className="flex items-center gap-3 lg:hidden">
            <img src="/logo-icono.png" alt="" aria-hidden="true" className="h-10 w-auto" />
            <div>
              <p className="font-bold">Bio Emplast</p>
              <p className="text-xs text-muted-foreground">Panel de administración</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-green-dark">Acceso</p>
            <h2 className="mt-1 text-xl font-extrabold">Inicia sesión</h2>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-bold">Correo</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold">Contraseña</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green" />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green-dark py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green-dark/90 disabled:opacity-60">
            {loading ? <><Loader2 className="size-4 animate-spin" /> Ingresando...</> : "Ingresar"}
          </button>

          <Link to="/" className="mt-5 block text-center text-xs font-semibold text-muted-foreground hover:text-foreground lg:hidden">
            ← Volver al sitio público
          </Link>
        </form>
      </div>
    </div>
  )
}