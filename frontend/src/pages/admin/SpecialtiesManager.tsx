import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Stethoscope,
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/api';

interface Specialty {
    id: number;
    name: string;
    description: string | null;
    icon: string;
}

const SpecialtiesManager = () => {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newIcon, setNewIcon] = useState('stethoscope');
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editIcon, setEditIcon] = useState('stethoscope');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchSpecialties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/specialties`);
            const data = await res.json();
            setSpecialties(data);
        } catch (err) {
            setError('Erro ao carregar especialidades.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        try {
            const res = await fetch(`${API_URL}/api/specialties`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, description: newDescription, icon: newIcon })
            });
            if (res.ok) {
                setNewName('');
                setNewDescription('');
                setNewIcon('stethoscope');
                fetchSpecialties();
                setSuccess('Especialidade criada!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                const errorData = await res.json().catch(() => null);
                setError(errorData?.error || 'Erro ao criar especialidade.');
                setTimeout(() => setError(''), 4000);
            }
        } catch (err) {
            setError('Erro de conexão.');
            setTimeout(() => setError(''), 4000);
        }
    };

    const handleUpdate = async (id: number) => {
        if (!editName.trim()) return;

        try {
            const res = await fetch(`${API_URL}/api/specialties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName, description: editDescription, icon: editIcon })
            });
            if (res.ok) {
                setEditingId(null);
                fetchSpecialties();
                setSuccess('Atualizado com sucesso!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            setError('Erro ao atualizar.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta especialidade?')) return;

        try {
            const res = await fetch(`${API_URL}/api/specialties/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchSpecialties();
                setSuccess('Excluído com sucesso!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                const data = await res.json();
                setError(data.error || 'Erro ao excluir.');
                setTimeout(() => setError(''), 4000);
            }
        } catch (err) {
            setError('Erro ao excluir.');
        }
    };

    return (
        <div className="p-4 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-med-blue/40 hover:text-deep-blue font-bold text-sm transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg">
                            <Stethoscope className="w-5 h-5 text-deep-blue" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase">Gerenciar Especialidades</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Criar Col */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5 sticky top-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 mb-6 flex items-center gap-2">
                                <Plus className="w-3 h-3 text-primary" strokeWidth={3} />
                                Nova Especialidade
                            </h3>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Nome, Ex: Cardiologia"
                                        className="w-full bg-sand/30 border-none rounded-xl px-4 py-3 text-sm font-bold text-deep-blue placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <input
                                        type="text"
                                        value={newIcon}
                                        onChange={(e) => setNewIcon(e.target.value)}
                                        placeholder="Ícone Google Icons, Ex: favorite"
                                        className="w-full bg-sand/30 border-none rounded-xl px-4 py-3 text-sm font-bold text-deep-blue placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <textarea
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Pequena descrição da especialidade..."
                                        rows={3}
                                        className="w-full bg-sand/30 border-none rounded-xl px-4 py-3 text-sm font-bold text-deep-blue placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-deep-blue/5"
                                >
                                    Adicionar
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista Col */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl md:rounded-[3rem] p-4 md:p-6 shadow-sm border border-deep-blue/5">
                            <AnimatePresence mode='wait'>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="m-4 bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-100"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="m-4 bg-green-50 text-green-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-green-100"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {success}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="divide-y divide-med-blue/5">
                                {specialties.map((specialty) => (
                                    <div key={specialty.id} className="p-6 flex items-center justify-between group">
                                        {editingId === specialty.id ? (
                                            <div className="flex-1 flex items-start gap-4 mr-4">
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        placeholder="Nome da Especialidade"
                                                        className="w-full bg-champagne/50 border-none rounded-lg px-4 py-2 text-sm font-bold text-deep-blue focus:ring-2 focus:ring-primary/20"
                                                        autoFocus
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editIcon}
                                                        onChange={(e) => setEditIcon(e.target.value)}
                                                        placeholder="Ícone (ex: stethoscope)"
                                                        className="w-full bg-champagne/50 border-none rounded-lg px-4 py-2 text-sm font-bold text-deep-blue focus:ring-2 focus:ring-primary/20"
                                                    />
                                                    <textarea
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        placeholder="Descrição..."
                                                        rows={2}
                                                        className="w-full bg-champagne/50 border-none rounded-lg px-4 py-2 text-sm font-bold text-deep-blue focus:ring-2 focus:ring-primary/20 resize-none"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2 shrink-0">
                                                    <button
                                                        onClick={() => handleUpdate(specialty.id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="bg-med-blue/10 hover:bg-med-blue/20 text-med-blue p-2 rounded-lg transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex-1 pr-6 flex items-start gap-4">
                                                    <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                                        <span className="material-symbols-outlined text-sm">{specialty.icon || 'stethoscope'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-display font-bold text-deep-blue uppercase tracking-wider block">{specialty.name}</span>
                                                        {specialty.description && (
                                                            <p className="text-sm text-med-blue/60 mt-1 line-clamp-2">{specialty.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(specialty.id);
                                                            setEditName(specialty.name);
                                                            setEditDescription(specialty.description || '');
                                                            setEditIcon(specialty.icon || 'stethoscope');
                                                        }}
                                                        className="w-9 h-9 rounded-lg bg-champagne flex items-center justify-center text-med-blue/40 hover:bg-primary hover:text-white transition-all"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(specialty.id)}
                                                        className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-300 hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {specialties.length === 0 && !loading && (
                                    <div className="p-20 text-center">
                                        <p className="text-sm font-bold text-med-blue/20 uppercase tracking-widest">Nenhuma especialidade cadastrada</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SpecialtiesManager;
