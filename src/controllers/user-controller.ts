// src/controllers/user-controller.ts 
import { Request, Response } from 'express';
import { LoginBody } from "../interfaces/user-interface";
import { UserService } from '../services/user/user-service';
import { UserRepository as PostgresUserRepository } from '../repositories/user/user-repositorypsql';
import { UserRepository as MongoUserRepository } from '../repositories/user/user-respository'; // Asegúrate de que el nombre del archivo sea correcto

// Instanciar ambos repositorios
const postgresRepo = new PostgresUserRepository();
const mongoRepo = new MongoUserRepository();

// Pasar ambos al servicio
const userService = new UserService(postgresRepo, mongoRepo);


export class UserController {
    // Método de Login (usando JWT)
    async login(req: Request, res: Response) {

        //Obtener los datos del body de la solicitud
        const { email, password } = req.body as LoginBody;
        try {

            //Intentar iniciar sesión con el servicio de usuario login
            const loginResponse = await userService.login(email, password);

            // Respuesta de error si las credenciales son inválidas. 401 (No autenticado)
            if (!loginResponse) {
                res.status(401).json({ message: "Credenciales inválidas" });
                return;
            }

            //Si las credenciales son válidas devuelve el token y el usuario. 200 (OK)
            res.status(200).json({
                status: "loggedIn",
                message: "Usuario autentificado correctamente",
                data: loginResponse,
            });
        } catch (error) {
            //Error en el servidor
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }

}
