import { User } from "./user-interface";

// Interfaz que define los parámetros para buscar un usuario por email o nick
export interface UserByEmailOrNickParams {

    //El valor de email puede ser el email o el nick del usuario
    email?: string;
    nick?: string
}

// Interfaz que define la respuesta del login
export interface LoginResponse {
    token: string;
    user: User;
}

//Interfaz que define los métodos del repositorio del usuario
export interface IUserRepository {
    findUserByEmailOrNick(args: UserByEmailOrNickParams): Promise<User | null>
}


//interfaz que define los métodos del servicio del usuario
export interface IUserService {
    login(email: string, password: string): Promise<LoginResponse | null>
}