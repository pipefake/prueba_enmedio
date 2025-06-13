import { IUserRepository, IUserService, LoginResponse } from "../../interfaces/user-repository-interface";
import bcrypt from "bcrypt";
import { createToken } from '../jwt';

export class UserService implements IUserService {
    private postgresUserRepository: IUserRepository;
    private mongoUserRepository: IUserRepository;

    constructor(
        postgresUserRepository: IUserRepository,
        mongoUserRepository: IUserRepository
    ) {
        this.postgresUserRepository = postgresUserRepository;
        this.mongoUserRepository = mongoUserRepository;
    }

    async login(email: string, password: string): Promise<LoginResponse | null> {

        // console.log(email, password);

        // Buscar usuario en ambas bases de datos
        const userFromPostgres = await this.postgresUserRepository.findUserByEmailOrNick({ email });
        const userFromMongo = await this.mongoUserRepository.findUserByEmailOrNick({ email });

        // Validar que exista en ambas
        if (!userFromPostgres || !userFromMongo) return null;

        // Validar contraseña con el usuario de PostgreSQL
        const isPasswordValid = await bcrypt.compare(password, userFromMongo.password ?? "");
        if (!isPasswordValid) return null;

        // Generar token con el usuario de PostgreSQL
        const token = createToken(userFromPostgres);
        if (!token) return null;

        return { token, user: userFromPostgres };
    }
}
