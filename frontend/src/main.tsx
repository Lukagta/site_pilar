import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Interceptador global para requisições seguras da API Admin
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
    let url = typeof input === 'string' ? input : input instanceof Request ? input.url : '';
    const isApiAdmin = typeof url === 'string' && url.includes('/api/admin');
    const isPublicAuthRoute = typeof url === 'string' && (url.includes('/login') || url.includes('/forgot-password'));

    if (isApiAdmin && !isPublicAuthRoute) {
        init = init || {};
        init.headers = init.headers || {};
        const token = localStorage.getItem('adminToken');
        if (token) {
            // Se Headers for um objeto Headers, trata corretamente
            if (init.headers instanceof Headers) {
                init.headers.set('Authorization', `Bearer ${token}`);
            } else if (Array.isArray(init.headers)) {
                init.headers.push(['Authorization', `Bearer ${token}`]);
            } else {
                (init.headers as any)['Authorization'] = `Bearer ${token}`;
            }
        }
    }

    const response = await originalFetch(input, init);

    // Se a api Admin retornar 401 (Não autorizado), forçamos logout.
    if (isApiAdmin && response.status === 401 && !isPublicAuthRoute) {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    }

    return response;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
