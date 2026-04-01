import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Estados do Esqueci a Senha
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMessage, setForgotMessage] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3015';
            const res = await fetch(`${apiBaseURL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Credenciais inválidas.');
            }
        } catch (err) {
            setError('Falha ao conectar no servidor.');
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotLoading(true);
        setForgotMessage('');
        try {
            const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3015';
            const res = await fetch(`${apiBaseURL}/api/admin/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setForgotMessage(data.message || 'Senha provisória enviada para o seu e-mail.');
            } else {
                setForgotMessage(data.error || 'Erro ao redefinir a senha.');
            }
        } catch (err) {
            setForgotMessage('Falha de conexão com o servidor.');
        } finally {
            setForgotLoading(false);
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

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(true)}
                                className="text-[10px] font-bold text-primary hover:text-deep-blue transition-colors uppercase tracking-widest"
                            >
                                Esqueci a senha
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-deep-blue/10 group"
                        >
                            Acessar Painel
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Modal/Overlay de Esqueci a Senha */}
                    {isForgotPassword && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-white z-20 p-12 form flex flex-col justify-center rounded-[2.5rem]"
                        >
                            <button 
                                onClick={() => setIsForgotPassword(false)}
                                className="absolute top-6 left-6 text-med-blue/40 hover:text-deep-blue"
                            >
                                <ArrowRight className="w-6 h-6 rotate-180" />
                            </button>
                            <h2 className="font-display text-2xl font-black text-deep-blue tracking-tighter mb-2">RECUPERAR SENHA</h2>
                            <p className="text-xs text-med-blue/60 mb-6 font-medium leading-relaxed">
                                Informe o endereço de e-mail cadastrado. Se ele constar na base, enviaremos uma senha provisória.
                            </p>

                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-med-blue/30" />
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            placeholder="admin@dominio.com"
                                            className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {forgotMessage && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`text-xs font-bold text-center ${forgotMessage.includes('Erro') || forgotMessage.includes('Falha') ? 'text-red-500' : 'text-green-500'}`}
                                    >
                                        {forgotMessage}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={forgotLoading}
                                    className="w-full bg-primary hover:bg-deep-blue text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {forgotLoading ? 'Enviando...' : 'Enviar Nova Senha'}
                                </button>
                            </form>
                        </motion.div>
                    )}

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
