import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save, FileText, CheckCircle2, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../services/api';

const BlogPostForm = ({ isProfessional = false }: { isProfessional?: boolean }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [doctors, setDoctors] = useState<{ id: number, name: string }[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        authorId: isProfessional ? localStorage.getItem('doctorId') || '' : ''
    });
    const [image, setImage] = useState<File | null>(null);

    const basePath = isProfessional ? '/profissional' : '/admin';

    useEffect(() => {
        const loadDoctors = async () => {
            if (!isProfessional) {
                try {
                    const res = await fetch(`${API_URL}/api/admin/doctors`);
                    const data = await res.json();
                    setDoctors(data);
                } catch (err) {
                    console.error("Erro ao carregar médicos");
                }
            }
        };

        const loadPostData = async () => {
            if (isEdit) {
                try {
                    const res = await fetch(`${API_URL}/api/posts/${id}`);
                    const data = await res.json();
                    if (data && !data.error) {
                        setFormData({
                            title: data.title,
                            content: data.content,
                            authorId: data.authorId.toString()
                        });
                        if (data.imagePath) {
                            setPreview(`${API_URL}${data.imagePath}`);
                        }
                    }
                } catch (err) {
                    console.error("Erro ao carregar postagem");
                }
            }
        };

        loadDoctors();
        loadPostData();
    }, [isEdit, id, isProfessional]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.authorId) {
            alert('Por favor, selecione um autor para a postagem.');
            return;
        }

        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (image) data.append('image', image);

        try {
            const url = isEdit ? `${API_URL}/api/posts/${id}` : `${API_URL}/api/posts`;
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: data
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => navigate(`${basePath}/blog`), 2000);
            } else {
                alert('Erro ao salvar postagem.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${isProfessional ? 'min-h-screen bg-champagne' : ''} p-12`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate(`${basePath}/blog`)}
                        className="flex items-center gap-2 text-med-blue/40 hover:text-deep-blue font-bold text-sm transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Blog
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="bg-deep-blue p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase">
                            {isEdit ? 'Editar Postagem' : 'Nova Postagem'}
                        </h1>
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
                        <p className="text-med-blue/60 font-medium">A postagem do blog foi salva corretamente.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 block mb-4">Capa da Postagem</label>

                                <div className="relative aspect-video rounded-3xl overflow-hidden bg-sand flex flex-col items-center justify-center border-2 border-dashed border-med-blue/10 transition-all hover:border-primary/40 cursor-pointer group">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-6">
                                            <Upload className="w-8 h-8 text-med-blue/20 mb-4 group-hover:text-primary transition-colors" />
                                            <p className="text-[10px] font-bold text-med-blue/40 leading-relaxed uppercase tracking-widest">Upload de Imagem</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                </div>
                                <p className="mt-4 text-[9px] text-med-blue/40 font-medium leading-relaxed italic">
                                    * Resolução recomendada: 800x600px.
                                </p>
                            </div>

                            {!isProfessional && (
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 block mb-4">Autor (Médico)</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                        <select
                                            disabled={isEdit}
                                            value={formData.authorId}
                                            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                            className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-10 py-4 text-deep-blue font-medium appearance-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                                            required
                                        >
                                            <option value="">Selecione o Autor</option>
                                            {doctors.map(doc => (
                                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {isEdit && <p className="mt-2 text-[9px] text-red-400 font-bold italic">Não é possível alterar o autor após a criação.</p>}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-deep-blue/5 space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Título da Postagem</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ex: Os benefícios da Medicina Integrativa"
                                        className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all text-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Conteúdo do Blog</label>
                                    <textarea
                                        required
                                        rows={15}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Escreva sua postagem aqui..."
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
                                            {isEdit ? 'Salvar Alterações' : 'Publicar Postagem'}
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

export default BlogPostForm;
