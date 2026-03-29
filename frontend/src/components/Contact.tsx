import { motion } from "framer-motion"
import { Send, MapPin, Phone, Mail, Calendar } from "lucide-react"
import type { SiteConfig } from "../services/api";

const AGENDAMENTO_URL = 'https://sistema.clinicapilar.com.br/agendar';

export function Contact({ config }: { config: SiteConfig | null }) {
    const whatsapp = config?.whatsapp || '21971571603';
    const whatsapp2 = config?.whatsapp2;
    const email = config?.email || 'contato@pilar.med.br';
    const address = config?.address || 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ';

    return (
        <section id="contact" className="py-16 lg:py-20 bg-sand/30">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Infos Col */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div className="w-12 h-[1px] bg-primary" />
                                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Canais de Acesso</span>
                            </motion.div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-5xl font-extrabold text-deep-blue mb-6">
                                Vamos iniciar um <br />
                                <span className="text-primary italic font-light">diálogo.</span>
                            </h2>
                            <p className="text-med-blue/70 leading-relaxed font-medium">
                                Escolha o canal de sua preferência. Nossa equipe está pronta para oferecer um atendimento ágil e resolutivo.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-deep-blue text-lg mb-1">Localização</h4>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-med-blue/50 leading-relaxed hover:text-primary transition-colors block mt-1"
                                    >
                                        {address}
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="font-display font-bold text-deep-blue text-lg mb-1">Telefone / WhatsApp</h4>
                                    <a
                                        href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-med-blue/50 leading-relaxed hover:text-primary transition-colors"
                                    >
                                        {whatsapp}
                                    </a>
                                    {whatsapp2 && (
                                        <a
                                            href={`https://wa.me/${whatsapp2.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-med-blue/50 leading-relaxed hover:text-primary transition-colors"
                                        >
                                            {whatsapp2}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-deep-blue text-lg mb-1">E-mail</h4>
                                    <a 
                                        href={`mailto:${email}`}
                                        className="text-sm font-medium text-med-blue/50 leading-relaxed hover:text-primary transition-colors"
                                    >
                                        {email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Col */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(11,42,74,0.08)] border border-med-blue/5"
                        >
                            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="font-display text-3xl font-bold text-deep-blue mb-2">Mensagem rápida</h3>
                                    <p className="text-sm font-medium text-med-blue/40">Retornaremos em até 24h úteis.</p>
                                </div>
                                <a
                                    href={AGENDAMENTO_URL}
                                    className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Agendamento Online
                                </a>
                            </div>

                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Identificação</label>
                                        <input
                                            type="text"
                                            placeholder="Seu nome completo"
                                            className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Contato</label>
                                        <input
                                            type="tel"
                                            placeholder="(00) 00000-0000"
                                            className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Sua Necessidade</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Como podemos ajudar hoje?"
                                        className="w-full bg-champagne/50 border-none rounded-2xl px-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    />
                                </div>
                                <button className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-deep-blue/10">
                                    Enviar Solicitação
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
