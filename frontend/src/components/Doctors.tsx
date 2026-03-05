import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { Users, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: string;
    description: string;
    imagePath: string;
}

export const Doctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const res = await fetch('http://localhost:3002/api/doctors');
                const data = await res.json();
                setDoctors(data);
            } catch (error) {
                console.error('Erro ao buscar médicos');
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    if (loading || doctors.length === 0) return null;

    return (
        <section id="doctors" className="py-24 bg-gray-light relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
                    >
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Nosso Corpo Clínico</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-deep-blue mb-6 tracking-tight"
                    >
                        Profissionais <span className="text-primary italic">Especializados</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-med-blue font-medium text-lg leading-relaxed"
                    >
                        Uma equipe dedicada a cuidar da sua saúde com excelência, ética e o acolhimento que você merece.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={doctor.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-deep-blue/5 border border-med-blue/5 hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={`http://localhost:3002${doctor.imagePath}`}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/90 via-deep-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <p className="text-white/80 text-sm font-medium mb-4 line-clamp-3">
                                        {doctor.description}
                                    </p>
                                    <Link
                                        to={`/medico/${doctor.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors group/link"
                                    >
                                        Ver Perfil Completo
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="mb-4">
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2 italic">
                                        {doctor.specialty}
                                    </span>
                                    <h3 className="text-2xl font-extrabold text-deep-blue mb-1">{doctor.name}</h3>
                                    <p className="text-med-blue/60 font-semibold text-xs tracking-wider">CRM: {doctor.crm}</p>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-med-blue/5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-primary/30" />)}
                                    </div>
                                    <span className="text-[10px] font-bold text-med-blue/30 uppercase tracking-widest">Membro Titular Pilar</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
