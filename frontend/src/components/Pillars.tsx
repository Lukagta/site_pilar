import { motion } from "framer-motion"

const pilares = [
    {
        icon: 'person_search',
        titulo: 'Personalização',
        descricao: 'Não acreditamos em protocolos engessados. Cada tratamento é moldado pela sua genética e estilo de vida único.',
    },
    {
        icon: 'science',
        titulo: 'Ciência',
        descricao: 'Baseamos nossas intervenções em evidências científicas robustas e nos avanços mais recentes da medicina moderna.',
    },
    {
        icon: 'volunteer_activism',
        titulo: 'Empatia',
        descricao: 'O acolhimento humano é parte fundamental da cura. Criamos um ambiente seguro para o seu desenvolvimento.',
    },
];

export function Pillars() {
    return (
        <section id="pillars" className="py-12 lg:py-16 bg-champagne relative border-t border-med-blue/10 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Editorial Sticky Header */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-[2px] w-24 bg-primary mb-8 origin-left"
                            />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-deep-blue leading-[0.95] tracking-tighter mb-8"
                            >
                                Fundações <br />
                                <span className="text-primary italic font-light drop-shadow-sm">do Cuidar.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="text-lg text-med-blue/60 leading-relaxed font-medium max-w-sm"
                            >
                                Nossos pilares transcendem a medicina tradicional. Estruturamos a jornada terapêutica sobre valores inegociáveis.
                            </motion.p>
                        </div>
                    </div>

                    {/* Asymmetrical List */}
                    <div className="lg:col-span-7">
                        <div className="space-y-0">
                            {pilares.map((pilar, index) => (
                                <motion.div
                                    key={pilar.titulo}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="group relative border-t border-med-blue/10 py-8 lg:py-12 first:border-0 first:pt-0"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 md:gap-10">
                                        {/* Large Editorial Number */}
                                        <div className="shrink-0 pt-2 pointer-events-none select-none">
                                            <span className="font-display text-6xl md:text-7xl font-black text-champagne [-webkit-text-stroke:1px_rgba(201,151,63,0.4)] group-hover:[-webkit-text-stroke:2px_rgba(201,151,63,1)] transition-all duration-700">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        {/* Pilar Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                                                    <span className="material-symbols-outlined text-primary text-[20px] group-hover:text-white transition-colors duration-500">{pilar.icon}</span>
                                                </div>
                                                <h3 className="font-display text-3xl md:text-4xl font-bold text-deep-blue group-hover:text-primary transition-colors duration-500">
                                                    {pilar.titulo}
                                                </h3>
                                            </div>
                                            <p className="text-med-blue/70 text-lg leading-relaxed">
                                                {pilar.descricao}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Giant Background Typography */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none translate-y-1/3 opacity-[0.03]">
                <span className="font-display text-[25rem] font-black text-deep-blue leading-none">VITA</span>
            </div>
        </section>
    );
}
