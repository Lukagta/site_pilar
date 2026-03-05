import type { SiteConfig } from "../services/api";

const AGENDAMENTO_URL = 'http://localhost:5173/agendar';

export function Contact({ config }: { config: SiteConfig | null }) {
    const whatsapp = config?.whatsapp || '21971571603';
    const address = config?.address || 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ, CEP 24800-041';
    return (
        <section id="contact" className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Formulário */}
                    <div className="rounded-3xl bg-white p-8 border border-med-blue/10 shadow-xl shadow-deep-blue/5">
                        <h2 className="mb-2 text-2xl font-bold text-deep-blue">Entre em Contato</h2>
                        <p className="mb-8 text-sm font-medium text-med-blue/60">Envie uma mensagem ou agende sua consulta diretamente online.</p>

                        {/* Botão de agendamento online em destaque */}
                        <a
                            href={AGENDAMENTO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5 mb-6"
                        >
                            <span className="material-symbols-outlined text-lg">calendar_month</span>
                            Marcar Consulta Presencial
                        </a>

                        {/* Divisor */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-med-blue/10"></div>
                            <span className="text-xs font-bold text-med-blue/40 uppercase tracking-wider">ou envie uma mensagem</span>
                            <div className="flex-1 h-px bg-med-blue/10"></div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-bold text-deep-blue">Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome completo"
                                        className="mt-1 block w-full rounded-lg border border-med-blue/20 bg-gray-light/30 p-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-med-blue/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-deep-blue">WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        className="mt-1 block w-full rounded-lg border border-med-blue/20 bg-gray-light/30 p-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-med-blue/30"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-deep-blue">Mensagem</label>
                                <textarea
                                    rows={4}
                                    placeholder="Como podemos te ajudar?"
                                    className="mt-1 block w-full rounded-lg border border-med-blue/20 bg-gray-light/30 p-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none placeholder:text-med-blue/30"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-xl border border-primary bg-white py-4 font-bold text-primary transition-all hover:bg-primary/5"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>

                    {/* Mapa + Endereço */}
                    <div className="flex flex-col gap-6">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '300px' }}
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.9649247657!2d-42.861783!3d-22.748123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9993335555555555%3A0x8888888888888888!2sRua%20Dr.%20Pereira%20dos%20Santos%2C%20107%20-%20Centro%2C%20Itabora%C3%AD%20-%20RJ%2C%2024800-041!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                            title="Localização da Clínica Pilar em Itaboraí"
                        ></iframe>
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-xl shadow-deep-blue/5 border border-med-blue/5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined font-bold">location_on</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-deep-blue">Endereço</h4>
                                <p className="text-sm font-medium text-med-blue/70">Rua Dr. Pereira dos Santos, 107, Sl 1113, Itaboraí - RJ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
