import { motion } from 'framer-motion';
import { Stethoscope, LogOut, Edit2, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfessionalDashboard = () => {
    const navigate = useNavigate();
    const doctorName = localStorage.getItem('doctorName');

    const handleLogout = () => {
        localStorage.removeItem('doctorId');
        localStorage.removeItem('doctorName');
        navigate('/profissional/login');
    };

    return (
        <div className="min-h-screen bg-champagne flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(11,42,74,0.1)] border border-deep-blue/5"
            >
                <div className="flex justify-between items-start mb-16 border-b border-med-blue/10 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20">
                            <Stethoscope className="w-8 h-8 text-deep-blue" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="font-display text-3xl font-black text-deep-blue tracking-tighter">Painel do Médico</h1>
                            <p className="text-med-blue/40 font-bold uppercase tracking-widest text-xs mt-1">Bem-vindo(a), {doctorName}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors bg-red-50 p-3 rounded-xl"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <button
                        onClick={() => navigate('/profissional/editar')}
                        className="group bg-sand hover:bg-white border-2 border-transparent hover:border-primary/20 p-8 rounded-[2rem] text-left transition-all hover:shadow-xl hover:-translate-y-2"
                    >
                        <div className="bg-white group-hover:bg-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 transition-colors">
                            <Edit2 className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-deep-blue mb-2">Editar Perfil</h2>
                        <p className="text-med-blue/60 text-sm leading-relaxed">Atualize sua biografia, CRM e especialidade principal para apresentação no site.</p>
                    </button>

                    <button
                        onClick={() => navigate('/profissional/blog')}
                        className="group bg-sand hover:bg-white border-2 border-transparent hover:border-primary/20 p-8 rounded-[2rem] text-left transition-all hover:shadow-xl hover:-translate-y-2"
                    >
                        <div className="bg-white group-hover:bg-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 transition-colors">
                            <PenTool className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-deep-blue mb-2">Gerenciar Blog</h2>
                        <p className="text-med-blue/60 text-sm leading-relaxed">Crie, edite e acompanhe suas postagens exibidas na seção de novidades.</p>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfessionalDashboard;
