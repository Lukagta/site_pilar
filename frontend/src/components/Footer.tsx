import { motion } from "framer-motion"
import { Instagram, Facebook, Send, MapPin, Phone, Mail, Stethoscope } from "lucide-react"
import type { SiteConfig } from "../services/api"

export function Footer({ config }: { config: SiteConfig | null }) {
    const whatsapp = config?.whatsapp || '(21) 97157-1603';
    const address = config?.address || 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ';

    return (
        <footer className="bg-deep-blue pt-24 pb-12 overflow-hidden relative">
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none scale-150">
                <span className="font-display text-[20rem] font-black text-white leading-none">PI</span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand Col */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg">
                                <Stethoscope className="w-6 h-6 text-deep-blue" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-2xl font-black text-white leading-none tracking-tighter">
                                    PILAR
                                </span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none mt-1">
                                    Medicina Integrada
                                </span>
                            </div>
                        </div>
                        <p className="max-w-sm text-white/50 text-sm leading-relaxed font-medium">
                            Construindo pontes entre o rigor científico e o acolhimento humanizado. Uma nova visão sobre o cuidado integral e a saúde preventiva.
                        </p>
                        <div className="flex gap-4">
                            <a href={config?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-deep-blue transition-all duration-500">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={config?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-deep-blue transition-all duration-500">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-deep-blue transition-all duration-500">
                                <Send className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Nav Groups */}
                    <div className="lg:col-span-3">
                        <h4 className="font-display text-lg font-bold text-white mb-8">Navegação</h4>
                        <ul className="space-y-4">
                            {['Especialidades', 'Abordagem', 'Corpo Docente', 'Contato', 'Área Administrativa'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={item === 'Área Administrativa' ? '/admin/login' : `#${item.toLowerCase() === 'especialidades' ? 'services' : item.toLowerCase() === 'corpo docente' ? 'doctors' : item.toLowerCase()}`}
                                        className="text-white/40 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                                    >
                                        <div className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="lg:col-span-4">
                        <h4 className="font-display text-lg font-bold text-white mb-8">Contato Direto</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <MapPin className="w-5 h-5 text-primary mt-1" />
                                <p className="text-white/40 text-sm font-medium leading-relaxed">
                                    {address}
                                </p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Phone className="w-5 h-5 text-primary" />
                                <a
                                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    {whatsapp}
                                </a>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Mail className="w-5 h-5 text-primary" />
                                <p className="text-white/40 text-sm font-medium">
                                    contato@pilar.med.br
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attribution */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
                        © {new Date().getFullYear()} Pilar Medicina Integrada. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 hover:text-primary transition-colors">Termos</a>
                        <a href="#" className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 hover:text-primary transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
