import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Eye,
    EyeOff,
    Edit2,
    Trash2,
    Stethoscope,
    LogOut,
    LayoutDashboard,
    Users,
    Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: string;
    isActive: boolean;
    imagePath: string;
}

const Dashboard = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check auth
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin/login');
            return;
        }
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('http://localhost:3002/api/admin/doctors');
            const data = await res.json();
            setDoctors(data);
        } catch (error) {
            console.error('Erro ao buscar médicos');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: number, currentStatus: boolean) => {
        try {
            await fetch(`http://localhost:3002/api/admin/doctors/${id}/toggle`, {
                method: 'PATCH'
            });
            setDoctors(doctors.map(d => d.id === id ? { ...d, isActive: !currentStatus } : d));
        } catch (error) {
            console.error('Erro ao alternar status');
        }
    };

    const deleteDoctor = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja remover este profissional? Esta ação é irreversível.')) return;

        try {
            await fetch(`http://localhost:3002/api/admin/doctors/${id}`, {
                method: 'DELETE'
            });
            setDoctors(doctors.filter(d => d.id !== id));
        } catch (error) {
            console.error('Erro ao excluir médico');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-champagne flex">

            {/* Sidebar Luxo */}
            <aside className="w-72 bg-deep-blue text-white flex flex-col p-8 fixed h-full z-20 shadow-2xl">
                <div className="flex items-center gap-3 mb-16">
                    <div className="bg-primary p-2 rounded-lg">
                        <Stethoscope className="w-6 h-6 text-deep-blue" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-xl font-black leading-none tracking-tighter">PILAR</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Management</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full flex items-center gap-4 bg-white/10 p-4 rounded-2xl text-primary font-bold transition-all"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full flex items-center gap-4 text-white/50 p-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all"
                    >
                        <Users className="w-5 h-5" />
                        Médicos
                    </button>
                    <button
                        onClick={() => navigate('/admin/config')}
                        className="w-full flex items-center gap-4 text-white/50 p-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all"
                    >
                        <Settings className="w-5 h-5" />
                        Configurações
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-white/40 p-4 rounded-2xl hover:text-red-400 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Sair do Sistema
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="font-display text-4xl font-extrabold text-deep-blue tracking-tighter">Gerenciar Profissionais</h1>
                        <p className="text-med-blue/40 text-sm font-medium mt-2">Controle de visibilidade e dados do corpo clínico.</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/medico/novo')}
                        className="bg-primary hover:bg-deep-blue text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Cadastrar Médico
                    </button>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[2rem] border border-deep-blue/5 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-med-blue/40 mb-2">Total de Médicos</p>
                        <p className="text-4xl font-display font-black text-deep-blue">{doctors.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-deep-blue/5 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-med-blue/40 mb-2">Ativos no Site</p>
                        <p className="text-4xl font-display font-black text-green-500">{doctors.filter(d => d.isActive).length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-deep-blue/5 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-med-blue/40 mb-2">Inativos</p>
                        <p className="text-4xl font-display font-black text-med-blue/20">{doctors.filter(d => !d.isActive).length}</p>
                    </div>
                </div>

                {/* Search & Table */}
                <div className="bg-white rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(11,42,74,0.05)] border border-deep-blue/5">
                    <div className="p-6 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-med-blue/20" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou especialidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-med-blue/5">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-deep-blue/40">Profissional</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-deep-blue/40">CRM / Especialidade</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-deep-blue/40 text-center">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-deep-blue/40 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-med-blue/5">
                                <AnimatePresence>
                                    {filteredDoctors.map((doctor) => (
                                        <motion.tr
                                            key={doctor.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-champagne/30 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-sand">
                                                        <img
                                                            src={`http://localhost:3002${doctor.imagePath}`}
                                                            alt={doctor.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-display font-bold text-deep-blue">{doctor.name}</p>
                                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Inscrito recentemente</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-med-blue/60">{doctor.crm}</p>
                                                <p className="text-xs font-medium text-med-blue/40">{doctor.specialty}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => toggleStatus(doctor.id, doctor.isActive)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${doctor.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-400'
                                                            }`}
                                                    >
                                                        {doctor.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                        {doctor.isActive ? 'Ativo' : 'Inativo'}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="p-3 bg-champagne hover:bg-deep-blue hover:text-white rounded-xl transition-all text-med-blue/40"
                                                        title="Editar Dados"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDoctor(doctor.id)}
                                                        className="p-3 bg-champagne hover:bg-red-500 hover:text-white rounded-xl transition-all text-med-blue/40"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
