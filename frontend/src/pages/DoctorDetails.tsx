import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, Calendar, Phone, Mail } from 'lucide-react';
import { API_URL } from '../services/api';

interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: string;
    description: string;
    fullDescription?: string;
    imagePath: string;
}

export default function DoctorDetails() {
    const { id } = useParams();
    const [doc, setDoc] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctor() {
            try {
                const res = await fetch(`${API_URL}/api/doctors/${id}`);
                if (!res.ok) throw new Error('Médico não encontrado');
                const data = await res.json();
                setDoc(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctor();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-champagne flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!doc) return (
        <div className="min-h-screen bg-champagne flex flex-col items-center justify-center p-10">
            <h2 className="font-display text-3xl font-bold text-deep-blue mb-4">Profissional não encontrado</h2>
            <Link to="/" className="text-primary font-bold hover:underline">Voltar para o início</Link>
        </div>
    );

    const mainSpecialty = doc.specialty;

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section - Magazine Style Page Title */}
            <section className="relative pt-32 pb-12 bg-champagne overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-sand/30 -skew-x-12 translate-x-1/4" />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <Link to="/" className="flex items-center gap-2 text-med-blue/40 hover:text-primary font-bold text-xs uppercase tracking-[0.2em] mb-12 transition-all group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Início
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-16 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-primary" />
                                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                                        {mainSpecialty}
                                    </span>
                                </div>
                                <h1 className="font-display text-6xl md:text-8xl font-extrabold text-deep-blue leading-none tracking-tighter">
                                    {doc.name.split(' ').map((word, i) => (
                                        i === 0 ? <span key={i}>{word} <br /></span> : <span key={i} className={i === 1 ? "text-primary italic font-light" : ""}>{word} </span>
                                    ))}
                                </h1>
                                <p className="text-xl font-bold text-med-blue/30 tracking-[0.1em] uppercase">CRM {doc.crm}</p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 hidden lg:block">
                            <p className="text-med-blue/60 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-8">
                                "{doc.description}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Flourish */}
                <div className="absolute -bottom-20 -left-20 pointer-events-none select-none opacity-[0.03]">
                    <span className="font-display text-[25rem] font-black text-deep-blue leading-none">DOC</span>
                </div>
            </section>

            {/* Profile Content */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-20">

                        {/* Bio Column */}
                        <div className="lg:col-span-7 space-y-16">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <h3 className="font-display text-3xl font-bold text-deep-blue flex items-center gap-4">
                                    Trajetória Profissional
                                    <div className="h-px flex-1 bg-med-blue/5" />
                                </h3>
                                <div className="text-lg text-med-blue/80 leading-relaxed font-normal whitespace-pre-wrap first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                    {doc.fullDescription}
                                </div>
                            </motion.div>

                            {/* Skills / Qualities Section */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-sand p-8 rounded-[2rem] space-y-4">
                                    <Award className="w-8 h-8 text-primary" />
                                    <h4 className="font-display font-bold text-deep-blue text-xl">Especialidades</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm font-medium text-med-blue/60">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {mainSpecialty}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm font-medium text-med-blue/60">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> Medicina Integrativa
                                        </li>
                                        <li className="flex items-center gap-3 text-sm font-medium text-med-blue/60">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> Atendimento Humanizado
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-deep-blue p-8 rounded-[2rem] space-y-4 text-white">
                                    <Calendar className="w-8 h-8 text-primary" />
                                    <h4 className="font-display font-bold text-xl">Disponibilidade</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Atendimento presencial em Itaboraí facilitado por agendamento prévio. Consulte horários disponíveis.
                                    </p>
                                    <a href="#contact" className="inline-block text-primary font-bold text-xs uppercase tracking-widest pt-2 hover:translate-x-1 transition-transform">
                                        Ver Agenda →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Portrait Column */}
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="sticky top-32"
                            >
                                <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(11,42,74,0.15)] bg-sand">
                                    <img
                                        src={`${API_URL}${doc.imagePath}`}
                                        alt={doc.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Floating Contact Card */}
                                <div className="absolute -bottom-10 left-10 right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-deep-blue/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 text-center">Agendamento Direto</p>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-4 p-3 hover:bg-champagne rounded-2xl transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-deep-blue">(21) 97157-1603</span>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 hover:bg-champagne rounded-2xl transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-deep-blue">contato@pilar.med.br</span>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <a
                                            href="https://sistema.clinicapilar.com.br/agendar"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-deep-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-primary shadow-lg shadow-deep-blue/20"
                                        >
                                            Marcar Consulta Agora
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
