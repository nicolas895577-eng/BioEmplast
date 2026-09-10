import { createClient } from '@supabase/supabase-js'

// Estas variables se configuran en un archivo .env (no se sube a git)
// VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
// VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Mientras Supabase no esté configurado, exportamos null en vez de crear el
// cliente (createClient revienta si faltan las credenciales). El formulario
// de contacto revisa esto antes de intentar usarlo.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null