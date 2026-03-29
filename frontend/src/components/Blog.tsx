import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { API_URL } from '../services/api';

interface Post {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
    imagePath: string | null;
    author: {
        name: string;
        specialty: string;
    };
}

export function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(`${API_URL}/api/posts`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Erro ao buscar postagens do blog");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 300 : 400; // Aproximação da largura do card
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading || posts.length === 0) return null;

    return (
        <section id="blog" className="py-16 lg:py-20 bg-white relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 bg-sand/30 -skew-y-2 origin-bottom-right" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Saúde e Bem-Estar</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-5xl md:text-6xl font-extrabold text-deep-blue leading-tight tracking-tighter"
                        >
                            Blog & <span className="text-primary italic font-light">Novidades.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full bg-white border border-deep-blue/5 flex items-center justify-center text-deep-blue hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-deep-blue text-white flex items-center justify-center hover:bg-primary transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                >
                    {posts.slice(0, 10).map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="snap-start shrink-0 w-[85vw] md:w-[400px] lg:w-[450px] group flex flex-col"
                        >
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-sand shadow-[0_30px_60px_-15px_rgba(11,42,74,0.1)] transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_50px_80px_-20px_rgba(11,42,74,0.15)] mb-8">
                                {post.imagePath ? (
                                    <img
                                        src={`${API_URL}${post.imagePath}`}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-med-blue/20">
                                        <PenTool className="w-12 h-12 opacity-20" />
                                    </div>
                                )}

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                        {new Date(post.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 px-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold text-med-blue/40 tracking-widest uppercase flex items-center gap-2">
                                        Por {post.author.name} <span className="w-1 h-1 rounded-full bg-primary" /> {post.author.specialty}
                                    </span>
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-deep-blue leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-med-blue/60 font-medium line-clamp-3 mb-8 text-sm leading-relaxed">
                                    {post.content}
                                </p>

                                <div className="mt-auto pt-6 border-t border-med-blue/10">
                                    <button
                                        onClick={() => window.location.href = `/blog/${post.id}`}
                                        className="inline-flex items-center gap-3 text-deep-blue font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors cursor-pointer"
                                    >
                                        Ler Artigo Completo
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
