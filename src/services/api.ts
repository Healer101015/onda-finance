import axios from 'axios';

// Cria uma instância do Axios apontando para uma URL fictícia
export const api = axios.create({
    baseURL: 'https://api.ondafinance.mock',
    timeout: 5000,
});

// Interceptor: Adiciona um delay de 800ms em todas as requisições para simular a rede
api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return config;
});