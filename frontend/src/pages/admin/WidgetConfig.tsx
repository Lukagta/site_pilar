import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Layout,
    Save,
    CheckCircle2,
    Calendar,
    Clock
} from 'lucide-react';
import { getSiteConfig, API_URL } from '../../services/api';

const WidgetConfig = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [configs, setConfigs] = useState({
        nextAvailableDate: 'Hoje',
        nextAvailableTime: '14:30h',
        proximaVagaVisible: true
    });

    useEffect(() => {
        async function loadData() {
            const data = await getSiteConfig();
            if (data) {
                setConfigs({
                    nextAvailableDate: data.nextAvailableDate || 'Hoje',
                    nextAvailableTime: data.nextAvailableTime || '14:30h',
                    proximaVagaVisible: data.proximaVagaVisible ?? true
                });
            }
        }
        loadData();
    }, []);

    const handleSaveConfigs = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const configArray = [
            { key: 'nextAvailableDate', value: configs.nextAvailableDate },
            { key: 'nextAvailableTime', value: configs.nextAvailableTime },
            { key: 'proximaVagaVisible', value: configs.proximaVagaVisible.toString() }
        ];

        try {
            const res = await fetch(`${API_URL}/api/admin/config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ configs: configArray })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            alert('Erro ao salvar configurações.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg">
                            <Layout className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase">Widgets do Site</h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSaveConfigs} className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-deep-blue/5 space-y-8">
                            <div className="grid gap-6">
                                <div className="p-6 bg-champagne/20 rounded-2xl md:rounded-[2rem] border border-deep-blue/5">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div>
                                            <h3 className="text-sm font-bold text-deep-blue mb-1">Widget "Próxima Vaga"</h3>
                                            <p className="text-[10px] text-med-blue/40 uppercase font-black tracking-widest">Esta informação aparece em destaque na página inicial.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setConfigs({ ...configs, proximaVagaVisible: !configs.proximaVagaVisible })}
                                            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${configs.proximaVagaVisible ? 'bg-primary' : 'bg-med-blue/20'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${configs.proximaVagaVisible ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Data (Ex: Hoje, Amanhã, 10/10)</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                                <input
                                                    type="text"
                                                    value={configs.nextAvailableDate}
                                                    onChange={(e) => setConfigs({ ...configs, nextAvailableDate: e.target.value })}
                                                    placeholder="Ex: Hoje"
                                                    className="w-full bg-white border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Horário (Ex: 14:30h, Manhã)</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                                <input
                                                    type="text"
                                                    value={configs.nextAvailableTime}
                                                    onChange={(e) => setConfigs({ ...configs, nextAvailableTime: e.target.value })}
                                                    placeholder="Ex: 14:30h"
                                                    className="w-full bg-white border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-deep-blue hover:bg-primary text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-deep-blue/10 disabled:opacity-50"
                            >
                                {loading ? 'Salvando...' : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Salvar Widget
                                    </>
                                )}
                            </button>

                            {success && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
                                    <CheckCircle2 className="w-4 h-4" /> Widget atualizado com sucesso!
                                </motion.div>
                            )}
                        </form>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-primary/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-primary/10">
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Sobre o Widget</h4>
                            <p className="text-xs text-med-blue/60 leading-relaxed">
                                Este widget exibe para o paciente a próxima vaga disponível para atendimento. 
                                <br /><br />
                                Marque como invisível se não for exibir horários específicos por data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetConfig;
