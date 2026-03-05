import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: string;
    imagePath: string;
    isActive: boolean;
}

export default function Dashboard() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        crm: '',
        specialty: '',
        description: '',
        fullDescription: '',
        order: '0'
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('admin_auth')) {
            navigate('/admin/login');
        }
        fetchDoctors();
    }, [navigate]);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('http://localhost:3002/api/admin/doctors');
            const data = await res.json();
            setDoctors(data);
        } catch (error) {
            console.error('Erro ao buscar médicos');
        }
    };

    const handleToggleActive = async (id: number) => {
        try {
            await fetch(`http://localhost:3002/api/admin/doctors/${id}/toggle`, { method: 'PATCH' });
            fetchDoctors();
        } catch (error) {
            console.error('Erro ao alterar status');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza que deseja remover este profissional?')) {
            try {
                await fetch(`http://localhost:3002/api/admin/doctors/${id}`, { method: 'DELETE' });
                fetchDoctors();
            } catch (error) {
                console.error('Erro ao deletar');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return alert('Selecione uma foto');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('crm', formData.crm);
        data.append('specialty', formData.specialty);
        data.append('description', formData.description);
        data.append('fullDescription', formData.fullDescription);
        data.append('order', formData.order);
        data.append('image', selectedFile);

        try {
            const res = await fetch('http://localhost:3002/api/admin/doctors', {
                method: 'POST',
                body: data
            });

            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ name: '', crm: '', specialty: '', description: '', fullDescription: '', order: '0' });
                setSelectedFile(null);
                fetchDoctors();
            }
        } catch (error) {
            alert('Erro ao salvar');
        }
    };

    return (
        <div className="min-h-screen bg-gray-light/30 p-10">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-deep-blue">Gestão do Corpo Clínico</h1>
                        <p className="text-med-blue/60 font-medium">Gerencie os profissionais que aparecem no site</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined font-bold">add</span>
                            Novo Profissional
                        </button>
                        <button
                            onClick={() => { localStorage.removeItem('admin_auth'); navigate('/admin/login'); }}
                            className="bg-white text-deep-blue px-6 py-3 rounded-2xl font-bold border border-med-blue/10 hover:bg-gray-100 transition-all"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-deep-blue/5 border border-med-blue/5 relative overflow-hidden group">
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={`http://localhost:3002${doc.imagePath}`}
                                    className="w-20 h-24 object-cover rounded-xl bg-gray-light"
                                    alt={doc.name}
                                />
                                <div className="flex-1">
                                    <h3 className="font-extrabold text-deep-blue">{doc.name}</h3>
                                    <p className="text-xs font-bold text-primary italic uppercase">{doc.specialty}</p>
                                    <p className="text-xs font-semibold text-med-blue/40 mt-1">CRM: {doc.crm}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-med-blue/5">
                                <div className="flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${doc.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-med-blue/40">
                                        {doc.isActive ? 'Visível' : 'Oculto'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleToggleActive(doc.id)}
                                        className={`p-2 rounded-xl transition-all ${doc.isActive ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}
                                        title={doc.isActive ? "Desativar" : "Ativar"}
                                    >
                                        <span className="material-symbols-outlined text-lg font-bold">{doc.isActive ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                                        title="Excluir"
                                    >
                                        <span className="material-symbols-outlined text-lg font-bold">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-blue/40 backdrop-blur-sm p-6 overflow-y-auto">
                        <div className="bg-white rounded-3xl w-full max-w-2xl p-10 relative mt-20 mb-20">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-med-blue/40 hover:text-deep-blue"
                            >
                                <span className="material-symbols-outlined text-3xl font-bold">close</span>
                            </button>

                            <h2 className="text-2xl font-extrabold text-deep-blue mb-2">Novo Profissional</h2>
                            <p className="text-med-blue/60 font-medium text-sm mb-8">Preencha os dados e suba uma foto para a landing page</p>

                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">CRM</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.crm}
                                        onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Especialidade</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Ordem (ex: 1, 2, 3)</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Resumo (Landing Page)</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Descrição Completa e Especialidades (Página de Detalhes)</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.fullDescription}
                                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                        className="w-full rounded-2xl border border-med-blue/20 bg-gray-light/30 px-5 py-3 text-deep-blue focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-deep-blue mb-2 ml-1">Foto do Profissional</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-med-blue/50
                      file:mr-4 file:py-3 file:px-6
                      file:rounded-2xl file:border-0
                      file:text-sm file:font-bold
                      file:bg-deep-blue file:text-white
                      hover:file:bg-med-blue file:cursor-pointer"
                                    />
                                </div>

                                <div className="col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                    >
                                        Salvar Profissional
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
