import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Upload,
    Save,
    Stethoscope,
    FileText,
    Award,
    Hash,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        crm: '',
        specialty: '',
        description: '',
        fullDescription: '',
        order: '0'
    });
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert('A imagem do profissional é obrigatória.');
            return;
        }

        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append('image', image);

        try {
            const res = await fetch('http://localhost:3002/api/admin/doctors', {
                method: 'POST',
                body: data
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/admin/dashboard'), 2000);
            } else {
                alert('Erro ao salvar profissional.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-champagne p-12">
            <div className="max-w-4xl mx-auto">

                {/* Header de Ação */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-med-blue/40 hover:text-deep-blue font-bold text-sm transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="bg-deep-blue p-2 rounded-lg">
                            <Stethoscope className="w-5 h-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase">Novo Profissional</h1>
                    </div>
                </div>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-20 flex flex-col items-center text-center shadow-xl border border-green-100"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="font-display text-3xl font-bold text-deep-blue mb-2">Sucesso!</h2>
                        <p className="text-med-blue/60 font-medium">O profissional foi cadastrado e já está visível na Landing Page.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8">

                        {/* Foto Upload Col */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 block mb-4">Retrato do Profissional</label>

                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-sand flex flex-col items-center justify-center border-2 border-dashed border-med-blue/10 hover:border-primary/40 transition-all cursor-pointer group">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-6">
                                            <Upload className="w-10 h-10 text-med-blue/20 mb-4 group-hover:text-primary transition-colors" />
                                            <p className="text-xs font-bold text-med-blue/40 leading-relaxed">Clique para fazer upload <br /> (JPEG, PNG ou WebP)</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                </div>

                                <p className="mt-4 text-[10px] text-med-blue/40 font-medium leading-relaxed italic">
                                    * A imagem será automaticamente redimensionada para 600x800 e otimizada.
                                </p>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 block mb-4">Ordem de Exibição</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                        className="w-full bg-champagne/30 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-deep-blue"
                                    />
                                </div>
                                <p className="mt-2 text-[9px] text-med-blue/30 uppercase font-black tracking-widest">Quanto menor, mais à esquerda</p>
                            </div>
                        </div>

                        {/* Dados Col */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-deep-blue/5 space-y-8">

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Nome Completo</label>
                                        <div className="relative">
                                            <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Ex: Dr. Juliano Oliveira"
                                                className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">CRM + Estado</label>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.crm}
                                                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                                                placeholder="Ex: CRM/RJ 123.456"
                                                className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Especialidade / Título</label>
                                    <div className="relative">
                                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.specialty}
                                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                            placeholder="Ex: Médico Nutrologista & Medicina Integrativa"
                                            className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Descrição Curta (Landing Page)</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Uma frase impactante que aparecerá sobre a imagem..."
                                        className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Biografia Completa (Página de Detalhes)</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.fullDescription}
                                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                        placeholder="Descreva a formação, experiência e abordagem do profissional em detalhes..."
                                        className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-deep-blue/10 disabled:opacity-50"
                                >
                                    {loading ? 'Salvando...' : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Finalizar Cadastro do Profissional
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
};

export default DoctorForm;
