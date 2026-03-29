const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3015';

export { API_URL };

export interface SiteConfig {
    whatsapp: string;
    whatsapp2?: string;
    email?: string;
    instagram: string;
    facebook: string;
    address: string;
    logo?: string;
    nextAvailableDate?: string;
    nextAvailableTime?: string;
    proximaVagaVisible?: boolean;
}

export async function getSiteConfig(): Promise<SiteConfig> {
    try {
        const response = await fetch(`${API_URL}/api/config`);
        if (!response.ok) {
            throw new Error('Erro ao buscar configurações');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        // Retorna valores padrão em caso de erro
        return {
            whatsapp: '11999999999',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            address: 'Av. Paulista, 1200 - Conj 42, Bela Vista, São Paulo - SP',
            logo: '',
            nextAvailableDate: 'Hoje',
            nextAvailableTime: '14:30h',
            proximaVagaVisible: true
        };
    }
}
