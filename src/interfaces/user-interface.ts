// Interfaz que define un usuario
export interface User {
    _id?: string;
    name: string;
    last_name: string;
    nick: string;
    email?: string;
    bio: string;
    password?: string;
    image: string;
    role: string;
    created_at: Date;
}

// Interfaz que define el cuerpo de la petición para iniciar sesión
export interface LoginBody {
    email: string;
    password: string;
}

// Interfaz que define un usuario autenticado
export interface AuthUser {
    id: string;
    name: string;
    role: string
}
