import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

import { supabase } from "../lib/supabase"

export function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-brand-green-dark" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}