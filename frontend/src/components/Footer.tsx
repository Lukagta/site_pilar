import type { SiteConfig } from "../services/api";

export function Footer({ config }: { config: SiteConfig | null }) {
    const whatsapp = config?.whatsapp || '(21) 97157-1603';
    const address = config?.address || 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ';

    return (
        <footer className="border-t border-med-blue/10 bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Logo + descrição */}
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">medical_services</span>
                            <h2 className="text-xl font-extrabold tracking-tight text-deep-blue">
                                Pilar <span className="font-light text-med-blue">Medicina</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-sm font-medium text-med-blue/60">
                            Promovendo saúde integral através da medicina baseada em evidências e do cuidado humanizado. CRM/SP 123.456 - Resp. Técnico Dr. Paulo Pilar.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light shadow-sm text-deep-blue hover:bg-primary hover:text-white transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light shadow-sm text-deep-blue hover:bg-primary hover:text-white transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </a>
                        </div>
                    </div>

                    {/* Links rápidos */}
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-wider text-xs text-primary">Links Rápidos</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="text-med-blue/60 hover:text-primary transition-colors font-medium text-sm">Sobre Nós</a></li>
                            <li><a href="#services" className="text-med-blue/60 hover:text-primary transition-colors font-medium text-sm">Serviços</a></li>
                            <li><a href="#doctors" className="text-med-blue/60 hover:text-primary transition-colors font-medium text-sm">Corpo Clínico</a></li>
                            <li><a href="#contact" className="text-med-blue/60 hover:text-primary transition-colors font-medium text-sm">Contato</a></li>
                            <li><a href="/admin/login" className="text-med-blue/20 hover:text-primary/40 transition-colors text-[10px] uppercase font-bold tracking-widest mt-4 inline-block">Área Administrativa</a></li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-wider text-xs text-primary">Contato</h4>
                        <ul className="space-y-2 text-sm font-medium text-med-blue/70">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-teal-health">phone</span>
                                {whatsapp}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-sm text-teal-health mt-0.5">location_on</span>
                                <span className="text-xs leading-relaxed">
                                    {address}
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-teal-health">email</span>
                                contato@pilar.med.br
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-primary/5 pt-8 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} Pilar Medicina Integrada. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
