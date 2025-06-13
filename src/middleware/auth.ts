import moment from "moment";
import jwt from "jwt-simple";
import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../interfaces/user-interface";

export const ensureAuth = () => (req: Request, res: Response, next: NextFunction) => {

    // Verificar si el token de autorización está presente en los headers
    if (!req.headers.authorization) {
        res.status(403).send({
            status: "error",
            message: "El token no ha sido enviado",
        });
        return;
    }

    // Eliminar comillas simples o dobles y "Bearer " del token
    const token = req.headers.authorization
        .replace(/['"]+/g, "")
        .replace("Bearer ", "");

    try {
        // Decodificar el token usando la clave secreta
        const payload = jwt.decode(token, process.env.SECRET_KEY as string);

        // Verificar si el token ha expirado
        if (payload.exp <= moment().unix()) {
            res.status(401).send({
                status: "error",
                message: "El token ha expirado",
            });
            return;
        }

        // Asignar el usuario decodificado al objeto `res.locals.user` para que esté disponible en las siguientes rutas
        res.locals.user = payload as AuthUser;
    } catch (error) {
        res.status(404).send({
            status: "error",
            message: "Token inválido",
        });
        return;
    }
    next();
};