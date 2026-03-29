import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Award } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { API_URL } from '../services/api';

interface PostDetails {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
    imagePath: string | null;
    author: {
        name: string;
        specialty: string;
        imagePath: string | null;
    };
}

export default function PostDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchPost() {
            try {
                const res = await fetch(`${API_URL}/api/posts/${id}`);
                if (!res.ok) throw new Error('Post não encontrado');
                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sand">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-sand px-6 text-center">
                <h1 className="text-4xl font-display font-bold text-deep-blue mb-4">Artigo não encontrado</h1>
                <p className="text-med-blue mb-8">O artigo que você procurava foi removido ou não existe mais.</p>
                <Link to="/#blog" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    Voltar para a Página Inicial
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(post.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-champagne font-sans selection:bg-primary/20">
            <Header config={null} />

            <main className="pt-24 md:pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Botão de Voltar */}
                    <Link
                        to="/#blog"
                        className="inline-flex items-center gap-2 text-deep-blue/60 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Artigos
                    </Link>

                    {/* Cabeçalho */}
                    <header className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-deep-blue leading-tight tracking-tighter mb-8"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-6 text-sm font-medium text-med-blue/80 border-y border-deep-blue/10 py-6"
                        >
                            <div className="flex items-center gap-3">
                                {post.author.imagePath ? (
                                    <img
                                        src={`${API_URL}${post.author.imagePath}`}
                                        alt={post.author.name}
                                        className="w-10 h-10 rounded-full object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                                        <User className="w-5 h-5 text-deep-blue/40" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-deep-blue font-bold">Por {post.author.name}</p>
                                    <p className="text-xs flex items-center gap-1 text-primary"><Award className="w-3 h-3" /> {post.author.specialty}</p>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-deep-blue/10" />

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{formattedDate}</span>
                            </div>
                        </motion.div>
                    </header>

                    {/* Imagem de Capa */}
                    {post.imagePath && (
                        <motion.figure
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white aspect-video relative"
                        >
                            <img
                                src={`${API_URL}${post.imagePath}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay subtil para profundidade */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.figure>
                    )}

                    {/* Conteúdo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg md:prose-xl max-w-none text-med-blue leading-relaxed font-serif"
                    >
                        {post.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() ? <p key={idx} className="mb-6">{paragraph}</p> : <br key={idx} />
                        ))}
                    </motion.div>
                </article>
            </main>

            <Footer config={null} />
        </div>
    );
}
