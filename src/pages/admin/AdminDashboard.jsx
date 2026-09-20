import { Helmet } from "react-helmet-async"
import { LogOut } from "lucide-react"

import { supabase } from "../../lib/supabase"

export default function AdminDashboard() {
  async function handleLogout() {
    if (supabase) await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen bg-secondary/60">
      <Helmet>
        <title>Panel de administración | Bio Emplast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <p className="font-bold">Panel de administración — Bio Emplast</p>
          <button onClick={handleLogout} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" /> Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="card-shadow bg-card p-8 text-center">
          <p className="font-bold">¡Sesión iniciada correctamente!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Aquí va el listado de productos, con opción de agregar y eliminar. Lo construimos en el siguiente paso.
          </p>
        </div>
      </main>
    </div>
  )
}