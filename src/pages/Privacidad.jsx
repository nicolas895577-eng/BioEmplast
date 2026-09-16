import { Helmet } from "react-helmet-async"

export default function Privacidad() {
  return (
    <>
      <Helmet>
        <title>Política de Tratamiento de Datos | Bio Emplast</title>
        <meta name="description" content="Política de tratamiento de datos personales de Bio Emplast S.A.S., conforme a la Ley 1581 de 2012." />
      </Helmet>
      <section className="site-container max-w-3xl py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-green-dark">Legal</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Política de Tratamiento de Datos Personales</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última actualización: 2026</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-7">
          <div>
            <h2 className="text-lg font-bold text-foreground">1. Responsable del tratamiento</h2>
            <p className="mt-2">
              Bio Emplast S.A.S., con domicilio en Bogotá, Colombia, es responsable del tratamiento
              de los datos personales que usted suministre a través de este sitio web, en particular
              mediante el formulario de contacto.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">2. Datos que recopilamos</h2>
            <p className="mt-2">
              A través del formulario de contacto podemos recopilar: nombre, correo electrónico,
              número de teléfono (opcional) y el contenido del mensaje que usted escriba.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">3. Finalidad del tratamiento</h2>
            <p className="mt-2">
              Los datos suministrados se usan exclusivamente para responder su solicitud de
              cotización o información, y para contactarlo en relación con los productos y
              servicios de Bio Emplast. No compartimos sus datos con terceros para fines
              comerciales distintos a este.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">4. Derechos del titular</h2>
            <p className="mt-2">
              De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted tiene derecho a
              conocer, actualizar, rectificar y solicitar la supresión de sus datos personales, así
              como a revocar la autorización otorgada para su tratamiento, escribiendo a{" "}
              <a href="mailto:ventas@bioemplast.co" className="font-semibold text-brand-green-dark hover:text-brand-green">
                ventas@bioemplast.co
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">5. Almacenamiento y seguridad</h2>
            <p className="mt-2">
              Los datos del formulario se almacenan de forma segura en la infraestructura de
              nuestro proveedor tecnológico (Supabase), aplicando controles de acceso para proteger
              su información.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">6. Contacto</h2>
            <p className="mt-2">
              Para consultas relacionadas con el tratamiento de sus datos personales, puede
              escribirnos a{" "}
              <a href="mailto:ventas@bioemplast.co" className="font-semibold text-brand-green-dark hover:text-brand-green">
                ventas@bioemplast.co
              </a>{" "}
              o comunicarse por WhatsApp a los números publicados en la página de Contacto.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}