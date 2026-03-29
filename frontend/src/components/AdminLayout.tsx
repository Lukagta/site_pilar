import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Stethoscope,
    LayoutDashboard,
    Users,
    Award,
    PenTool,
    Settings,
    LogOut,
    Layout,
    Menu,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Autenticação básica
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Fechar menu ao mudar de rota no mobile
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/medicos', label: 'Médicos', icon: Users, hidden: true },
        { path: '/admin/especialidades', icon: Award, label: 'Especialidades' },
        { path: '/admin/blog', icon: PenTool, label: 'Blog' },
        { path: '/admin/widget', icon: Layout, label: 'Widgets' },
        { path: '/admin/config', icon: Settings, label: 'Configurações' },
    ];

    return (
        <div className="min-h-screen bg-sand/30 flex flex-col lg:flex-row">
            {/* Header Mobile */}
            <header className="lg:hidden bg-deep-blue p-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-deep-blue" strokeWidth={2.5} />
                    </div>
                    <span className="font-display text-lg font-black text-white tracking-tighter uppercase">Pilar Admin</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Overlay Mobile */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Luxo */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-deep-blue text-white flex flex-col p-8 
                transform transition-transform duration-300 ease-in-out shadow-2xl
                lg:translate-x-0 lg:static lg:h-screen
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="hidden lg:flex items-center gap-3 mb-16">
                    <div className="bg-primary p-2 rounded-lg cursor-pointer" onClick={() => navigate('/')}>
                        <Stethoscope className="w-6 h-6 text-deep-blue" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-xl font-black leading-none tracking-tighter">PILAR</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Management</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-4">
                    {menuItems.filter(item => !item.hidden).map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname.includes('/admin/medico'));
                        
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                                    isActive 
                                    ? 'bg-white/10 text-primary font-bold shadow-lg shadow-black/20' 
                                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-white/40 p-4 rounded-2xl hover:text-red-400 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Sair do Sistema
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
