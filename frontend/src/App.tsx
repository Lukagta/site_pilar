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
import ProfessionalDashboard from "./pages/ProfessionalDashboard"
import SpecialtiesManager from "./pages/admin/SpecialtiesManager"
import BlogManager from "./pages/admin/BlogManager"
import BlogPostForm from "./pages/admin/BlogPostForm"
import PostDetails from "./pages/PostDetails"
import { AdminLayout } from "./components/AdminLayout"
import WidgetConfig from "./pages/admin/WidgetConfig"

const HomePage = ({ config }: { config: SiteConfig | null }) => (
  <>
    <Hero />
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
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  useEffect(() => {
    async function loadConfig() {
      const data = await getSiteConfig();
      setConfig(data);
    }
    loadConfig();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {!isAdminPath && location.pathname !== '/admin/login' && <Header config={config} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage config={config} />} />
          <Route path="/especialidades" element={<Services />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* Dashboard Administrativo com Layout Persistente */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/medico/novo" element={<DoctorForm />} />
            <Route path="/admin/medico/editar/:id" element={<DoctorForm />} />
            <Route path="/admin/config" element={<ClinicConfig />} />
            <Route path="/admin/widget" element={<WidgetConfig />} />
            <Route path="/admin/especialidades" element={<SpecialtiesManager />} />
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/blog/novo" element={<BlogPostForm />} />
            <Route path="/admin/blog/editar/:id" element={<BlogPostForm />} />
          </Route>

          {/* Rotas Profissional */}
          <Route path="/profissional/login" element={<ProfessionalLogin />} />
          <Route path="/profissional/painel" element={<ProfessionalDashboard />} />
          <Route path="/profissional/editar" element={<DoctorForm isProfessional={true} />} />
          <Route path="/profissional/blog" element={<BlogManager isProfessional={true} />} />
          <Route path="/profissional/blog/novo" element={<BlogPostForm isProfessional={true} />} />
          <Route path="/profissional/blog/editar/:id" element={<BlogPostForm isProfessional={true} />} />

          <Route path="/medico/:id" element={<DoctorDetails />} />
          <Route path="/blog/:id" element={<PostDetails />} />
        </Routes>
      </main>
      {!isAdminPath && location.pathname !== '/admin/login' && <Footer config={config} />}
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
