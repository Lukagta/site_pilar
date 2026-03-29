import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserRound, Stethoscope, ArrowLeft, Search, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const navigate = useNavigate();
    const [view, setView] = useState<'selection' | 'patient'>('selection');
    const [examCode, setExamCode] = useState('');

    // Reset view when modal closes
    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setView('selection');
            setExamCode('');
        }, 300); // delay to let animation finish before resetting state
    };

    const handleSearchExam = (e: React.FormEvent) => {
        e.preventDefault();
        if (examCode.trim()) {
            window.location.href = `/code.html?code=${encodeURIComponent(examCode)}`;
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-deep-blue/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-2xl shadow-deep-blue/20"
                >
                    {/* Estética de Fundo */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-champagne rounded-full blur-3xl opacity-50 pointer-events-none" />

                    <button
                        onClick={handleClose}
                        className="absolute right-6 top-6 w-10 h-10 rounded-full bg-sand flex items-center justify-center text-deep-blue hover:bg-primary hover:text-white transition-all z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {view === 'patient' && (
                        <button
                            onClick={() => setView('selection')}
                            className="absolute left-6 top-6 w-10 h-10 rounded-full flex items-center justify-center text-med-blue/60 hover:text-primary transition-colors z-10"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div className="relative z-10">
                        {view === 'selection' ? (
                            <motion.div
                                key="selection-view"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <div className="flex flex-col items-center text-center mb-10">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">Bem-vindo</span>
                                    <h2 className="font-display text-4xl font-extrabold text-deep-blue leading-tight mb-2">
                                        Acesse sua <span className="italic font-light text-primary">Conta.</span>
                                    </h2>
                                    <p className="text-sm font-medium text-med-blue/60 max-w-[250px]">
                                        Selecione o seu perfil para entrar na plataforma.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Card Paciente */}
                                    <button
                                        onClick={() => setView('patient')}
                                        className="flex-1 flex flex-col items-center justify-center p-8 rounded-3xl border border-med-blue/10 bg-white hover:border-primary/30 hover:bg-champagne/30 transition-all group cursor-pointer focus:outline-none"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <UserRound className="w-8 h-8 text-deep-blue group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="font-bold text-deep-blue mb-1">Sou Paciente</h3>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-med-blue/40 text-center">Resultados de Exames</p>
                                    </button>

                                    {/* Card Profissional */}
                                    <button
                                        onClick={() => {
                                            handleClose();
                                            navigate('/profissional/login');
                                        }}
                                        className="flex-1 flex flex-col items-center justify-center p-8 rounded-3xl border border-med-blue/10 bg-white hover:border-primary/30 hover:bg-champagne/30 transition-all group cursor-pointer text-left focus:outline-none"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <Stethoscope className="w-8 h-8 text-deep-blue group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="font-bold text-deep-blue mb-1">Sou Profissional</h3>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-med-blue/40 text-center">Acesso Restrito</p>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="patient-view"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="pt-2"
                            >
                                <div className="flex flex-col items-center text-center mx-auto mb-8">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <h2 className="font-display text-3xl font-extrabold text-deep-blue leading-tight mb-2">
                                        Resultados de <span className="text-primary italic font-light">Exames.</span>
                                    </h2>
                                    <p className="text-sm font-medium text-med-blue/60 max-w-[280px]">
                                        Insira o código impresso no seu protocolo para visualizar o laudo.
                                    </p>
                                </div>

                                <form onSubmit={handleSearchExam} className="flex flex-col gap-4">
                                    <div className="relative group">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 mb-2 block">
                                            Código do Exame
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={examCode}
                                                onChange={(e) => setExamCode(e.target.value)}
                                                placeholder="Ex: PILAR-784A-91"
                                                className="w-full bg-champagne/30 border border-transparent rounded-2xl px-6 py-4 text-lg text-deep-blue font-bold tracking-wider placeholder:font-medium placeholder:text-med-blue/20 placeholder:tracking-normal focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!examCode.trim()}
                                        className="w-full mt-2 bg-deep-blue text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-deep-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                    >
                                        Buscar Resultados
                                        <Search className="w-5 h-5" />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
