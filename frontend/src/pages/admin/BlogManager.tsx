import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ArrowLeft, PenTool, LayoutTemplate, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/api';

interface Post {
    id: number;
    title: string;
    updatedAt: string;
    imagePath: string | null;
    author: {
        name: string;
    };
}

const BlogManager = ({ isProfessional = false }: { isProfessional?: boolean }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const doctorId = localStorage.getItem('doctorId');
    const doctorName = localStorage.getItem('doctorName');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Se for profissional, busca só os dele; se não, pega todos (admin).
            const url = isProfessional && doctorId
                ? `${API_URL}/api/posts/author/${doctorId}`
                : `${API_URL}/api/posts`;

            const res = await fetch(url);
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Erro ao buscar posts', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
            try {
                const res = await fetch(`${API_URL}/api/posts/${id}`, { method: 'DELETE' });
                if (res.ok) fetchPosts();
            } catch (error) {
                alert('Erro ao excluir postagem.');
            }
        }
    };
    const handleDownload = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/posts/${id}/download`);
            if (!res.ok) throw new Error('Falha ao baixar postagem');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `post-${id}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            alert('Erro ao tentar fazer o download da postagem.');
        }
    };

    const basePath = isProfessional ? '/profissional' : '/admin';

    return (
        <div className={`${isProfessional ? 'min-h-screen bg-champagne' : ''} p-4 md:p-12`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <button
                        onClick={() => navigate(`${basePath}/${isProfessional ? 'painel' : 'dashboard'}`)}
                        className="flex items-center gap-2 text-med-blue/40 hover:text-deep-blue font-bold text-sm transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="bg-deep-blue p-2 rounded-lg">
                            <PenTool className="w-5 h-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase text-center md:text-left">
                            {isProfessional ? `Meu Blog: Dr(a). ${doctorName}` : 'Central de Blog'}
                        </h1>
                    </div>
                </div>

                <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-deep-blue/5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-deep-blue">Postagens Publicadas</h2>
                            <p className="text-med-blue/60 mt-2 text-sm">Gerencie o conteúdo exibido na área de Blog e Novidades.</p>
                        </div>
                        <button
                            onClick={() => navigate(`${basePath}/blog/novo`)}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 w-full md:w-auto"
                        >
                            <Plus className="w-5 h-5" />
                            Nova Postagem
                        </button>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-12 md:py-20 bg-champagne/30 rounded-2xl md:rounded-[2rem] border-2 border-dashed border-med-blue/10 p-6">
                            <LayoutTemplate className="w-12 h-12 md:w-16 md:h-16 text-med-blue/20 mx-auto mb-4" />
                            <p className="text-med-blue/40 font-bold uppercase tracking-widest text-sm">Nenhuma postagem encontrada</p>
                            <p className="text-med-blue/30 text-xs mt-2 font-medium">Crie sua primeira postagem para engajar seus pacientes.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-sand rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20"
                                >
                                    <div className="aspect-video bg-med-blue/5 relative overflow-hidden">
                                        {post.imagePath ? (
                                            <img src={`${API_URL}${post.imagePath}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-med-blue/20 font-bold text-xs">Sem Imagem</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                                            <button
                                                onClick={() => navigate(`${basePath}/blog/editar/${post.id}`)}
                                                className="bg-white/20 hover:bg-white backdrop-blur-sm text-white hover:text-deep-blue p-3 rounded-xl transition-all"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(post.id)}
                                                className="bg-white/20 hover:bg-white backdrop-blur-sm text-white hover:text-primary p-3 rounded-xl transition-all"
                                                title="Fazer Download (TXT)"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="bg-white/20 hover:bg-red-500 backdrop-blur-sm text-white p-3 rounded-xl transition-all"
                                                title="Excluir"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-display font-bold text-deep-blue line-clamp-2 leading-tight mb-2">{post.title}</h3>
                                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                            <span className="text-primary">{post.author.name}</span>
                                            <span className="text-med-blue/40">{new Date(post.updatedAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogManager;
