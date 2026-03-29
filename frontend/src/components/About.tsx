export function About() {
    return (
        <section id="about" className="py-16 lg:py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
                    {/* Foto */}
                    <div className="lg:w-1/2">
                        <img
                            className="rounded-3xl shadow-xl w-full transition-all hover:scale-[1.01]"
                            src="/about_clinic.png"
                            alt="Recepção e consultório da Clínica Pilar - Medicina Integrada"
                        />
                    </div>

                    {/* Texto */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-charcoal">Sobre a Clínica Pilar</h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            A Clínica Pilar nasceu da necessidade de um atendimento médico que vá além da prescrição. Nossa filosofia é baseada na integração total do paciente, tratando não apenas sintomas, mas o indivíduo como um todo orgânico e emocional.
                        </p>
                        <div className="mt-10 grid gap-6 sm:grid-cols-2">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary font-bold">verified_user</span>
                                <div>
                                    <h4 className="font-bold text-charcoal">Excelência Técnica</h4>
                                    <p className="text-sm text-slate-500">Corpo clínico em constante atualização.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary font-bold">favorite</span>
                                <div>
                                    <h4 className="font-bold text-charcoal">Humanização</h4>
                                    <p className="text-sm text-slate-500">Tempo de consulta estendido para ouvir você.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
