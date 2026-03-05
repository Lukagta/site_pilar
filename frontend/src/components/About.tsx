export function About() {
    return (
        <section id="about" className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
                    {/* Foto */}
                    <div className="lg:w-1/2">
                        <img
                            className="rounded-3xl shadow-xl w-full transition-all hover:scale-[1.01]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_1laH4RO2_IJUDa-ovvGr-SB6y6yYO4XGpByOWwAhfZN3syCDVIlPuEXvACuBY0QUer9CIRJfjEtPND4Z4SQFa1EE-yKj_s_rcVsHzChoAV_fwYFyXe3jw5arblkU9PqUL-AUjP3nU90dFKE8y6zO144MuiULSlRiI8fkNBLk5j4E3H72rwZLOGiP2aZsJ3J1HFQjaHFfyaHaWWmbCYfZF-2id42ANaOMoSnJLbQrL9GrIOlAN-TxfOcCzODbn_x1v54fImyojqY"
                            alt="Médico conversando com paciente idoso"
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
                                    <p className="text-sm text-slate-500">Corpo clínico em constante atualização internacional.</p>
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
