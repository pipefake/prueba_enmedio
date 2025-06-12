import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv';

//Cargar variables de entorno desde archivo .env
dotenv.config();

// Clave secreta
const secret = process.env.SECRET_KEY || 'default_secret_key';

// Método para generar tokens
// Unix: segundos transcurridos desde el 1 de enero de 1970 hasta hoy.
const createToken = (user: any) => {
    const payload = {
        userId: user._id,
        role: user.role,
        iat: moment().unix(), // fecha de emisión
        exp: moment().add(7, 'days').unix() // fecha de expiración
    }

    // Devolver el jwt token codificado
    return jwt.encode(payload, secret);
};

export {
    secret,
    createToken
};