import { useEffect, useState } from 'react';
import { API_URL } from '../services/api';

interface Specialty {
    id: number;
    name: string;
    description: string | null;
    icon: string;
}

export function Services() {
    const [especialidades, setEspecialidades] = useState<Specialty[]>([]);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const res = await fetch(`${API_URL}/api/specialties`);
                const data = await res.json();
                setEspecialidades(data);
            } catch (err) {
                console.error("Erro ao carregar especialidades", err);
            }
        };

        fetchSpecialties();
    }, []);
    return (
        <section id="services" className="bg-background-alt pt-20 pb-16">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-charcoal">Atendimento Focado Em:</h2>
                    <p className="mt-4 text-slate-600">Tratamentos focados na individualidade bioquímica de cada paciente.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {especialidades.map((esp) => (
                        <div
                            key={esp.id}
                            className="group relative flex flex-col gap-4 rounded-2xl border border-primary/10 bg-background-light p-8 transition-all hover:border-primary/30 hover:shadow-xl"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined">{esp.icon || 'stethoscope'}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-charcoal">{esp.name}</h3>
                                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{esp.description || 'Especialidade focada na sua saúde com a melhor qualidade e atenção.'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
