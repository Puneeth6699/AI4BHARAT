import axios from 'axios';
import type { GenerateRequest, GeneratedContent } from '../types';

const api = axios.create({
    baseURL: '/api',
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateContent = async (payload: GenerateRequest): Promise<GeneratedContent> => {
    const { data } = await api.post<GeneratedContent>('/generate', payload);
    return data;
};
