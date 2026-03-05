import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section id="inicio" className="relative bg-champagne min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sand/50 -skew-x-12 translate-x-1/4 z-0" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Conteúdo Magazine Style */}
                    <div className="lg:col-span-7 flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-12 bg-primary" />
                                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                                    Pilar Medicina Integrada
                                </span>
                            </div>

                            <h1 className="font-display text-6xl md:text-8xl font-extrabold text-deep-blue leading-[0.95] tracking-tighter">
                                A Nova Era da <br />
                                <span className="text-primary italic font-light drop-shadow-sm">Saúde Digital.</span>
                            </h1>

                            <p className="max-w-xl text-lg md:text-xl text-med-blue/80 font-normal leading-relaxed">
                                Excelência técnica encontra o acolhimento humano. <br />
                                <span className="font-semibold text-deep-blue">Ciência, tecnologia e empatia</span> em uma abordagem editorial e sofisticada para o seu bem-estar.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <a
                                href="/agendar"
                                className="group relative overflow-hidden bg-deep-blue px-10 py-5 rounded-full text-white font-bold transition-all hover:pr-14"
                            >
                                <span className="relative z-10">Agendar Consulta</span>
                                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5" />
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </a>

                            <a
                                href="#sobre"
                                className="font-display font-bold text-deep-blue hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                Conheça Nossa Abordagem
                                <div className="w-8 h-[2px] bg-primary/30 group-hover:w-12 transition-all" />
                            </a>
                        </motion.div>

                        {/* Stats / Proof Line */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-8 pt-8 border-t border-med-blue/10"
                        >
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-deep-blue">15+</span>
                                <span className="text-[10px] uppercase tracking-widest text-med-blue/40 font-bold">Anos de Prática</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-deep-blue">5k+</span>
                                <span className="text-[10px] uppercase tracking-widest text-med-blue/40 font-bold">Vidas Cuidadas</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-deep-blue">Reg.</span>
                                <span className="text-[10px] uppercase tracking-widest text-med-blue/40 font-bold">Itaboraí - RJ</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Imagem Editorial */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(11,42,74,0.15)] group">
                            <img
                                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                                alt="Ambiente Clínico Premium"
                            />
                            <div className="absolute inset-0 bg-deep-blue/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />

                            {/* Card Flutuante - Memorable Element */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Próxima Vaga</p>
                                        <p className="text-sm font-bold text-deep-blue">Hoje, às 14:30h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Typography - Aesthetic Flourish */}
                        <div className="absolute -top-12 -right-12 pointer-events-none select-none">
                            <span className="font-display text-[12rem] font-black text-deep-blue/[0.03] leading-none">
                                PI
                            </span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
