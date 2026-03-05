const API_URL = 'http://localhost:3002';

export interface SiteConfig {
    whatsapp: string;
    instagram: string;
    facebook: string;
    address: string;
    logo?: string;
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
        };
    }
}
