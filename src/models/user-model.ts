import { Schema, model } from "mongoose";
import { User } from "../interfaces/user-interface";


// Esquema de Mongoose para el modelo de usuario
// El email y el nick son únicos, y la contraseña es obligatoria
// El rol por defecto es "admin" y la imagen por defecto es "default_user.png"
const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    image: {
        type: String,
        default: "default_user.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const UserModel = model<User>('User', UserSchema)

export default UserModel