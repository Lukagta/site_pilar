export function Hero() {
    return (
        <section id="inicio" className="relative overflow-hidden py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Texto */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                                Saúde Integral e Humanizada
                            </span>
                            <h1 className="text-5xl font-black leading-tight tracking-tight lg:text-7xl text-deep-blue">
                                Medicina Integrada: <span className="text-primary italic">O Cuidado</span> que Você Merece
                            </h1>
                            <p className="max-w-xl text-lg text-med-blue font-medium">
                                Uma abordagem holística e personalizada para a sua saúde, unindo ciência de ponta, tecnologia e empatia genuína para o seu bem-estar pleno.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="http://localhost:5173/agendar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">calendar_month</span>
                                Agendar Consulta
                            </a>
                            <a
                                href="#services"
                                className="rounded-xl border border-primary/20 bg-white px-8 py-4 text-base font-bold text-primary hover:bg-primary/5 transition-all"
                            >
                                Conheça Nossos Planos
                            </a>
                        </div>
                    </div>

                    {/* Imagem */}
                    <div className="relative">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
                        <div className="overflow-hidden rounded-3xl shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                            <img
                                className="aspect-[4/3] w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKzEkLTfczbHYiRo_ZvRlfP4iycaXKnKmduHuyqWnRk2Oo7WpoNDqVQ2l9sJAiCB9vuwxH9v-E5WAjw2mqQkZsD-qRE5YETou9bpNQbTE43Oy8aM_Nf9rxcr4c_B8dILzhmBkr0ZLMAL0vBlXF_CJyTFvClqPKMEtFN4Sf9EG9ylJihuXV6vjRARGRudxvPlmIzj9z8HnF5tzJ2ChK27u2PyntzAqyvkEora_qgdPAxCPKUxaZI0evlGIedKxlrpzQGsab4kZkpkM"
                                alt="Corredor moderno da clínica"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
