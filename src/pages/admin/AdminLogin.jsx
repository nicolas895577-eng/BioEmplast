import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Loader2, Lock } from "lucide-react"

import { supabase } from "../../lib/supabase"

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
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <Helmet>
        <title>Iniciar sesión | Panel Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <form onSubmit={handleSubmit} className="card-shadow w-full max-w-sm bg-card p-8">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-green/15">
            <Lock className="size-5 text-brand-green-dark" />
          </div>
          <div>
            <p className="font-bold">Panel de administración</p>
            <p className="text-xs text-muted-foreground">Bio Emplast</p>
          </div>
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

        <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-dark py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green-dark/90 disabled:opacity-60">
          {loading ? <><Loader2 className="size-4 animate-spin" /> Ingresando...</> : "Ingresar"}
        </button>
      </form>
    </div>
  )
}