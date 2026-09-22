import { useState } from "react"
import { Link } from "react-router-dom"
import { Loader2, Send } from "lucide-react"

import { supabase } from "../lib/supabase"
import { Button } from "./ui/Button"

export function ContactForm() {
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", mensaje: "" })
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false)
  const [status, setStatus] = useState("idle")

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!supabase) {
      setStatus("not-configured")
      return
    }

    setStatus("loading")
    try {
      const { error } = await supabase.from("mensajes_contacto").insert([form])
      if (error) throw error

      supabase.functions.invoke("send-contact-email", { body: form }).catch((err) => {
        console.error("No se pudo enviar la notificación por correo:", err)
      })

      setStatus("success")
      setForm({ nombre: "", correo: "", telefono: "", mensaje: "" })
      setAceptaPrivacidad(false)
    } catch (err) {
      console.error("Error al enviar el formulario:", err)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="card-shadow p-8 text-center">
        <p className="text-lg font-bold text-brand-green-dark">¡Mensaje enviado!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Te responderemos lo antes posible. También puedes escribirnos directo por
          WhatsApp si prefieres una respuesta más rápida.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-shadow space-y-4 p-6 sm:p-8">
      <div>
        <label htmlFor="nombre" className="text-sm font-bold">Nombre</label>
        <input id="nombre" name="nombre" required value={form.nombre} onChange={handleChange} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="correo" className="text-sm font-bold">Correo</label>
          <input id="correo" name="correo" type="email" required value={form.correo} onChange={handleChange} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green" />
        </div>
        <div>
          <label htmlFor="telefono" className="text-sm font-bold">Teléfono (opcional)</label>
          <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green" />
        </div>
      </div>
      <div>
        <label htmlFor="mensaje" className="text-sm font-bold">¿Qué necesitas cotizar?</label>
        <textarea id="mensaje" name="mensaje" required rows={4} value={form.mensaje} onChange={handleChange} className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-green resize-none" />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={aceptaPrivacidad}
          onChange={(e) => setAceptaPrivacidad(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-brand-green"
        />
        <span>
          He leído y acepto la{" "}
          <Link to="/privacidad" target="_blank" className="font-semibold text-brand-green-dark hover:text-brand-green underline">
            Política de Tratamiento de Datos Personales
          </Link>
          .
        </span>
      </label>

      {status === "not-configured" && (
        <p className="text-sm text-muted-foreground">
          El formulario todavía no está conectado. Mientras tanto, escríbenos directo por WhatsApp.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-destructive">
          No se pudo enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.
        </p>
      )}

      <Button type="submit" variant="whatsapp" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="animate-spin" /> Enviando...</>
        ) : (
          <><Send /> Enviar solicitud</>
        )}
      </Button>
    </form>
  )
}