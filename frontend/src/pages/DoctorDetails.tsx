import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: string;
    description: string;
    fullDescription: string;
    imagePath: string;
}

export default function DoctorDetails() {
    const { id } = useParams();
    const [doc, setDoc] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctor() {
            try {
                const res = await fetch(`http://localhost:3002/api/doctors`);
                const data = await res.json();
                const found = data.find((d: Doctor) => d.id === parseInt(id || '0'));
                setDoc(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctor();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Carregando...</div>;
    if (!doc) return <div className="p-20 text-center">Profissional não encontrado</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="relative h-[400px] w-full bg-deep-blue overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-deep-blue to-transparent z-10" />
                <img
                    src={`http://localhost:3002${doc.imagePath}`}
                    className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                    alt=""
                />
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="mx-auto max-w-7xl px-6 w-full">
                        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                            <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Voltar para Início</span>
                        </Link>
                        <div className="space-y-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                {doc.specialty}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">{doc.name}</h1>
                            <p className="text-white/40 font-bold tracking-widest uppercase text-sm">CRM: {doc.crm}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-deep-blue text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="h-px w-8 bg-primary"></span>
                                Sobre o Profissional
                            </h2>
                            <p className="text-med-blue/70 text-lg font-medium leading-relaxed whitespace-pre-line">
                                {doc.fullDescription}
                            </p>
                        </section>

                        <section className="bg-gray-light/30 rounded-3xl p-10 border border-med-blue/5">
                            <h3 className="text-deep-blue font-extrabold text-2xl mb-6">Qualificações e Especialidades</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {doc.fullDescription.split('\n').filter(l => l.includes('-')).map((line, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                        <span className="font-medium text-med-blue/70">{line.replace('-', '').trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-3xl bg-white border border-med-blue/10 p-8 shadow-xl shadow-deep-blue/5 overflow-hidden relative group">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                                <img
                                    src={`http://localhost:3002${doc.imagePath}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={doc.name}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-med-blue/40 text-xs font-bold mb-1 uppercase tracking-widest">Agende sua consulta</p>
                                <h4 className="text-deep-blue font-extrabold text-xl mb-6">{doc.name}</h4>
                                <a
                                    href="#contact"
                                    className="block w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-center"
                                >
                                    Entrar em Contato
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
