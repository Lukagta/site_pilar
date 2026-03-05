import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Autenticação simples conforme solicitado para esta fase
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Credenciais inválidas. Tente admin / admin123');
        }
    };

    return (
        <div className="min-h-screen bg-champagne flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(11,42,74,0.1)] p-12 border border-deep-blue/5 relative overflow-hidden"
            >
                {/* Aesthetic background flourish */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-deep-blue p-4 rounded-2xl mb-6 shadow-lg shadow-deep-blue/20">
                            <Stethoscope className="w-8 h-8 text-primary" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-3xl font-black text-deep-blue tracking-tighter">ÁREA RESTRITA</h1>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Pilar Medicina Integrada</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Usuário</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-med-blue/30" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Seu usuário"
                                    className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-med-blue/30" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-xs font-bold text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-deep-blue/10 group"
                        >
                            Acessar Painel
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-med-blue/5 text-center">
                        <a href="/" className="text-[10px] font-bold text-med-blue/40 uppercase tracking-widest hover:text-primary transition-colors">
                            Voltar para o site institucional
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
