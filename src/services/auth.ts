import axios from 'axios';
import { LoginInput, RegisterInput, AuthResponse } from '@/types/auth';

const API_URL = 'http://localhost:8080/api';

export const authService = {
    async register(data: RegisterInput): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response.data;
    },

    async login(data: LoginInput): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response.data;
    },
};