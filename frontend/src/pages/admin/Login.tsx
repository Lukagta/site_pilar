import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Autenticação simples conforme solicitado (JR660309 ou 'senha')
        if (password === 'jr660309' || password === 'senha') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Senha incorreta');
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-light/30 px-6">
            <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl shadow-deep-blue/5 border border-med-blue/5">
                <div className="text-center mb-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                        <span className="material-symbols-outlined text-3xl font-bold">lock</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-deep-blue">Acesso Restrito</h1>
                    <p className="text-med-blue/60 font-medium text-sm mt-2">Painel Administrativo Pilar</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-deep-blue mb-2 ml-1">Senha de Acesso</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-4 text-deep-blue placeholder:text-med-blue/30 focus:border-primary focus:outline-none transition-all"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold ml-1">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-deep-blue text-white font-bold hover:bg-med-blue transition-all shadow-lg shadow-deep-blue/20"
                    >
                        Entrar no Painel
                    </button>
                </form>
            </div>
        </div>
    );
}
