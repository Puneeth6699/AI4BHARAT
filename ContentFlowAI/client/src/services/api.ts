import axios from 'axios';
import type { GenerateRequest, GeneratedContent } from '../types';

const api = axios.create({
    baseURL: 'https://contentflow-backend.onrender.com',
    timeout: 180000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateContent = async (payload: GenerateRequest): Promise<GeneratedContent> => {
    const { data } = await api.post<GeneratedContent>('/generate', payload);
    return data;
};