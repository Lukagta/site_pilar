const especialidades = [
    {
        icon: 'stethoscope',
        titulo: 'Medicina Funcional',
        descricao: 'Identificamos e tratamos a causa raiz das disfunções crônicas através de análise sistêmica.',
    },
    {
        icon: 'nutrition',
        titulo: 'Nutrologia',
        descricao: 'Otimização metabólica e planos alimentares personalizados baseados em genética e rotina.',
    },
    {
        icon: 'psychology',
        titulo: 'Saúde Mental',
        descricao: 'Abordagem integrativa para ansiedade, estresse e equilíbrio emocional constante.',
    },
    {
        icon: 'fitness_center',
        titulo: 'Medicina Esportiva',
        descricao: 'Foco em performance, longevidade e recuperação rápida de lesões osteomusculares.',
    },
];

export function Services() {
    return (
        <section id="services" className="bg-background-alt py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-charcoal">Nossas Especialidades</h2>
                    <p className="mt-4 text-slate-600">Tratamentos focados na individualidade bioquímica de cada paciente.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {especialidades.map((esp) => (
                        <div
                            key={esp.titulo}
                            className="group relative flex flex-col gap-4 rounded-2xl border border-primary/10 bg-background-light p-8 transition-all hover:border-primary/30 hover:shadow-xl"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined">{esp.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-charcoal">{esp.titulo}</h3>
                                <p className="mt-2 text-sm text-slate-600">{esp.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
