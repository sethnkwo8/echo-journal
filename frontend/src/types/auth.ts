// frontend/src/types/auth.ts

// Interface for register form
export interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

// Interface for login form
export interface LoginFormType{
    email: string;
    password: string;
}

// Interface for token for login/refresh
export interface Token {
    access_token: string;
    token_type: string;
}

// Interface for user 
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    created_at: string;    
}