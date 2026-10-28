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
    bio?: string;
    created_at: string;    
}

// Interface for user update
export interface UserUpdate {
    name?: string;
    bio?: string;
}

// Interface for user change password
export interface UserChangePassword {
    current_password: string;
    new_password: string;
}