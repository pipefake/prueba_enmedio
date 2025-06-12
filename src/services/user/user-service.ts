import { User } from "../../interfaces/user-interface";
import { IUserRepository, IUserService, LoginResponse } from "../../interfaces/user-repository-interface";
import bcrypt from "bcrypt";
import { createToken } from '../jwt';

export class UserService implements IUserService {

    // Repositorio de usuarios
    private userRepository: IUserRepository;

    // Constructor que recibe el repositorio de usuarios
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    // Método para iniciar sesión
    async login(email: string, password: string): Promise<LoginResponse | null> {

        //Buscar si existe el usuario por el email o por el nick 
        const user = await this.userRepository.findUserByEmailOrNick({ email });
        if (!user) return null;

        //Verificar si la contraseña es correcta
        const isPasswordValid = bcrypt.compare(password, user.password ?? "");
        if (!isPasswordValid) return null;

        // Generar token de autenticación (JWT)
        const token = createToken(user);
        if (!token) return null;

        return { token, user: user };
    }

}