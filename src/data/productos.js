// Número de WhatsApp de la empresa (formato internacional, sin +, sin espacios)
// TODO: reemplazar con el número real de Bio Emplast
export const WHATSAPP_NUMERO = "573001234567"

export function linkWhatsApp(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}

export const productos = [
  {
    id: "stretch-film",
    nombre: "Stretch Film",
    descripcion: "Película estirable para paletizado seguro y cargas estables en transporte.",
    color: "green",
  },
  {
    id: "bolsatina",
    nombre: "Bolsatina",
    descripcion: "Bolsas de alta transparencia y sellado firme para empaque de consumo y retail.",
    color: "cyan",
  },
  {
    id: "bolsa-manija-impresa",
    nombre: "Bolsa Manija Impresa",
    descripcion: "Bolsas con manija e impresión personalizada para fortalecer tu marca.",
    color: "yellow",
  },
  {
    id: "bolsa-basura-termoencogible",
    nombre: "Bolsa Basura Termoencogible",
    descripcion: "Resistencia y ajuste perfecto para recolección de residuos en comercios e industria.",
    color: "green",
  },
  {
    id: "bolsa-vacio",
    nombre: "Bolsa al Vacío",
    descripcion: "Protección extendida para alimentos y productos que requieren conservación óptima.",
    color: "cyan",
  },
  {
    id: "trazabilidad",
    nombre: "Trazabilidad",
    descripcion: "Control por lote y seguimiento de origen para cumplir con auditorías y regulación.",
    color: "yellow",
  },
  {
    id: "vinipel",
    nombre: "Vinipel",
    descripcion: "Láminas transparentes versátiles para separación, protección y acabado de empaques.",
    color: "green",
  },
  {
    id: "precorte",
    nombre: "Precorte",
    descripcion: "Servicio de corte a medida que reduce desperdicio y ajusta el material a tu línea.",
    color: "cyan",
  },
]
