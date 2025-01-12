export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'curator' | 'seller' | 'buyer';
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}