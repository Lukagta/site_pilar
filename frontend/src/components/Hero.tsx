import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { getSiteConfig, type SiteConfig } from "../services/api"

export function Hero() {
    const [config, setConfig] = useState<SiteConfig | null>(null);

    useEffect(() => {
        getSiteConfig().then(setConfig);
    }, []);

    return (
        <section id="inicio" className="relative bg-champagne pb-8 pt-24 lg:pt-28 lg:pb-12 overflow-hidden">
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sand/50 -skew-x-12 translate-x-1/4 z-0" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
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

                            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-extrabold text-deep-blue leading-[0.95] tracking-tighter">
                                A Nova Era da <br />
                                <span className="text-primary italic font-light drop-shadow-sm">Saúde Integrada.</span>
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
                            className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: '800ms' }}
                        >
                            <a
                                href="https://sistema.clinicapilar.com.br/agendar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative overflow-hidden bg-deep-blue text-white px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 group shadow-[0_20px_40px_-15px_rgba(11,42,74,0.3)] hover:shadow-[0_20px_40px_-15px_rgba(212,175,53,0.4)] transform hover:-translate-y-1"
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2">Agendar Consulta</span>
                                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 z-10" />
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
                            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 pt-8 border-t border-med-blue/10"
                        >
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-deep-blue">10+</span>
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
                                src="/clinica.jpg"
                                alt="Ambiente Clínico Premium"
                            />
                            <div className="absolute inset-0 bg-deep-blue/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />

                            {/* Card Flutuante - Memorable Element */}
                            {config?.proximaVagaVisible !== false && (
                                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/20 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest whitespace-nowrap">Próxima Vaga</p>
                                            <p className="text-xs md:text-sm font-bold text-deep-blue line-clamp-1">
                                                {config?.nextAvailableDate || 'Hoje'}, às {config?.nextAvailableTime || '14:30h'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
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
