import { BrowserRouter, Routes, Route } from "react-router-dom"

import { SiteShell } from "./components/SiteShell"
import Home from "./pages/Home"
import Nosotros from "./pages/Nosotros"
import Productos from "./pages/Productos"
import Contacto from "./pages/Contacto"

function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  )
}

export default App
