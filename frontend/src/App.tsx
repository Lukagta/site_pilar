import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Services } from "./components/Services"
import { About } from "./components/About"
import { Pillars } from "./components/Pillars"
import { Doctors } from "./components/Doctors"
import { Blog } from "./components/Blog"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { getSiteConfig } from "./services/api"
import type { SiteConfig } from "./services/api"

import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"
import DoctorForm from "./pages/admin/DoctorForm"
import ClinicConfig from "./pages/admin/ClinicConfig"
import DoctorDetails from "./pages/DoctorDetails"
import ProfessionalLogin from "./pages/ProfessionalLogin"

const HomePage = ({ config }: { config: SiteConfig | null }) => (
  <>
    <Hero />
    <Services />
    <About />
    <Doctors />
    <Blog />
    <Pillars />
    <Contact config={config} />
  </>
);

function AppContent() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    async function loadConfig() {
      const data = await getSiteConfig();
      setConfig(data);
    }
    loadConfig();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {!isAdminPath && <Header config={config} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage config={config} />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/medico/novo" element={<DoctorForm />} />
          <Route path="/admin/medico/editar/:id" element={<DoctorForm />} />
          <Route path="/admin/config" element={<ClinicConfig />} />

          {/* Rotas Profissional */}
          <Route path="/profissional/login" element={<ProfessionalLogin />} />
          <Route path="/profissional/editar" element={<DoctorForm isProfessional={true} />} />

          <Route path="/medico/:id" element={<DoctorDetails />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer config={config} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
