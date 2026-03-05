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
        <section id="pillars" className="bg-background-light py-24 text-charcoal">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">Nossos Pilares</h2>
                    <p className="mt-4 text-slate-500">O que nos define e guia cada decisão clínica em favor da sua saúde.</p>
                </div>
                <div className="grid gap-12 md:grid-cols-3">
                    {pilares.map((pilar) => (
                        <div key={pilar.titulo} className="space-y-4 border-l-2 border-primary/40 pl-8">
                            <span className="material-symbols-outlined text-4xl text-primary">{pilar.icon}</span>
                            <h3 className="text-2xl font-bold">{pilar.titulo}</h3>
                            <p className="text-slate-600">{pilar.descricao}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
