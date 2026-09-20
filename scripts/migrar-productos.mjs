import { createClient } from "@supabase/supabase-js"
import { catalogo } from "../src/data/catalogo.js"

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseSecretKey) {
  console.error("Faltan variables de entorno: VITE_SUPABASE_URL y SUPABASE_SECRET_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseSecretKey)

function tarjetasDe(grupo) {
  const tarjetas = []
  if (grupo.items) {
    for (const it of grupo.items) tarjetas.push({ nombre: it.nombre, imagen: it.imagen })
  }
  if (grupo.subgrupos) {
    const multiple = grupo.subgrupos.length > 1
    for (const sg of grupo.subgrupos) {
      for (const v of sg.variantes) {
        tarjetas.push({
          nombre: multiple ? `${sg.nombre} · ${v.etiqueta}` : v.etiqueta,
          imagen: v.imagen,
        })
      }
    }
  }
  return tarjetas
}

async function migrar() {
  let orden = 0
  const filas = []
  for (const grupo of catalogo) {
    for (const t of tarjetasDe(grupo)) {
      filas.push({
        categoria: grupo.nombre,
        nombre: t.nombre,
        imagen_url: t.imagen,
        orden: orden++,
      })
    }
  }

  console.log(`Insertando ${filas.length} productos...`)
  const { error } = await supabase.from("productos").insert(filas)
  if (error) {
    console.error("Error al migrar:", error)
    process.exit(1)
  }
  console.log("¡Migración completa!")
}

migrar()