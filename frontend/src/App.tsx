import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import DoctorDetails from "./pages/DoctorDetails"

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

function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    async function loadConfig() {
      const data = await getSiteConfig();
      setConfig(data);
    }
    loadConfig();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Header config={config} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage config={config} />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/medico/novo" element={<DoctorForm />} />
            <Route path="/medico/:id" element={<DoctorDetails />} />
          </Routes>
        </main>
        <Footer config={config} />
      </div>
    </Router>
  )
}

export default App
