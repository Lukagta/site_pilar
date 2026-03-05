import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Settings,
    Save,
    MessageCircle,
    MapPin,
    Instagram,
    Facebook,
    Image as ImageIcon,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSiteConfig } from '../../services/api';

const ClinicConfig = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const [configs, setConfigs] = useState({
        whatsapp: '',
        address: '',
        instagram: '',
        facebook: '',
        logo: ''
    });

    useEffect(() => {
        async function loadData() {
            const data = await getSiteConfig();
            if (data) {
                setConfigs({
                    whatsapp: data.whatsapp || '',
                    address: data.address || '',
                    instagram: data.instagram || '',
                    facebook: data.facebook || '',
                    logo: data.logo || ''
                });
                if (data.logo) {
                    setLogoPreview(`http://localhost:3002${data.logo}`);
                }
            }
        }
        loadData();
    }, []);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('logo', file);

        setLoading(true);
        try {
            const res = await fetch('http://localhost:3002/api/admin/config/logo', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setLogoPreview(`http://localhost:3002${data.logoPath}`);
                setConfigs(prev => ({ ...prev, logo: data.logoPath }));
                alert('Logo atualizada com sucesso!');
            }
        } catch (error) {
            alert('Erro ao enviar logo.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfigs = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const configArray = [
            { key: 'whatsapp', value: configs.whatsapp },
            { key: 'address', value: configs.address },
            { key: 'instagram', value: configs.instagram },
            { key: 'facebook', value: configs.facebook }
        ];

        try {
            const res = await fetch('http://localhost:3002/api/admin/config', {
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
        <div className="min-h-screen bg-champagne p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-med-blue/40 hover:text-deep-blue font-bold text-sm transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="bg-deep-blue p-2 rounded-lg">
                            <Settings className="w-5 h-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-display text-2xl font-black text-deep-blue tracking-tighter uppercase">Dados da Clínica</h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Logo Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-deep-blue/5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1 block mb-4">Identidade Visual (Logo)</label>
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-sand flex flex-col items-center justify-center border-2 border-dashed border-med-blue/10 hover:border-primary/40 transition-all cursor-pointer group">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo Preview" className="max-w-[80%] max-h-[80%] object-contain" />
                                ) : (
                                    <div className="flex flex-col items-center text-center p-4">
                                        <ImageIcon className="w-8 h-8 text-med-blue/20 mb-2 group-hover:text-primary transition-colors" />
                                        <p className="text-[10px] font-bold text-med-blue/40">Upload da Logo</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleLogoUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                            </div>
                            <p className="mt-4 text-[9px] text-med-blue/30 uppercase font-black tracking-widest text-center">Recomendado: PNG Transparente</p>
                        </div>
                    </div>

                    {/* Configs Column */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSaveConfigs} className="bg-white rounded-[3rem] p-10 shadow-sm border border-deep-blue/5 space-y-8">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">WhatsApp de Atendimento</label>
                                    <div className="relative">
                                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                        <input
                                            type="text"
                                            value={configs.whatsapp}
                                            onChange={(e) => setConfigs({ ...configs, whatsapp: e.target.value })}
                                            placeholder="Ex: (21) 97157-1603"
                                            className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Endereço Completo</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-med-blue/20" />
                                        <textarea
                                            rows={2}
                                            value={configs.address}
                                            onChange={(e) => setConfigs({ ...configs, address: e.target.value })}
                                            className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Instagram (URL)</label>
                                        <div className="relative">
                                            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                            <input
                                                type="text"
                                                value={configs.instagram}
                                                onChange={(e) => setConfigs({ ...configs, instagram: e.target.value })}
                                                className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue/40 ml-1">Facebook (URL)</label>
                                        <div className="relative">
                                            <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-med-blue/20" />
                                            <input
                                                type="text"
                                                value={configs.facebook}
                                                onChange={(e) => setConfigs({ ...configs, facebook: e.target.value })}
                                                className="w-full bg-champagne/50 border-none rounded-2xl pl-12 pr-6 py-4 text-deep-blue font-medium placeholder:text-med-blue/20 focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
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
                                        Salvar Configurações
                                    </>
                                )}
                            </button>

                            {success && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
                                    <CheckCircle2 className="w-4 h-4" /> Configurações atualizadas!
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicConfig;
