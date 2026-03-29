import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { ArrowRight, Award } from "lucide-react"
import { Link } from "react-router-dom"
import { API_URL } from '../services/api';

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
                const res = await fetch(`${API_URL}/api/doctors`);
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
        <section id="doctors" className="py-16 lg:py-20 bg-white relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-champagne/30 -skew-y-3 origin-top-left" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Excelência Clínica</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-deep-blue leading-tight"
                        >
                            Corpo <span className="text-primary italic font-light">Clínico.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-xs text-med-blue/60 font-medium text-sm leading-relaxed border-l-2 border-primary/20 pl-6"
                    >
                        Uma seleção rigorosa de especialistas comprometidos com a vanguarda e o cuidado individualizado.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={doctor.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            {/* Card Container with Depth */}
                            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-sand shadow-[0_30px_60px_-15px_rgba(11,42,74,0.1)] transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_50px_80px_-20px_rgba(11,42,74,0.2)]">
                                <img
                                    src={`${API_URL}${doctor.imagePath}`}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                                />

                                {/* Overlay with Text Texture */}
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="mb-4 overflow-hidden">
                                        <motion.div className="flex items-center gap-2 mb-2">
                                            <Award className="w-4 h-4 text-primary" />
                                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">{doctor.specialty}</span>
                                        </motion.div>
                                        <h3 className="font-display text-3xl font-bold text-white mb-2 leading-none">{doctor.name}</h3>
                                        <p className="text-white/40 text-xs font-bold tracking-widest uppercase">CRM {doctor.crm}</p>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <p className="text-white/70 text-sm font-medium mb-6 line-clamp-3 leading-relaxed">
                                            {doctor.description}
                                        </p>
                                        <Link
                                            to={`/medico/${doctor.id}`}
                                            className="inline-flex items-center gap-3 text-white font-bold text-sm bg-primary/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-primary transition-all group/btn"
                                        >
                                            Perfil Completo
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Aesthetic Flourish - ID Number */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                                <span className="text-primary font-display font-bold">0{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
