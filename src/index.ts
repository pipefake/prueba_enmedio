import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Importar las rutas de usuario
import userRoutes from './routes/user-router';

// Crear una instancia de Express
const app = express();

//Configuración de dotenv para cargar variables de entorno
dotenv.config();

// Middleware para manejar JSON y URL-encoded
app.use(express.json());

// Middleware para manejar datos URL-encoded
app.use(express.urlencoded({ extended: true }));

//Rutas de la API de usuarios
app.use('/api/user', userRoutes);

//Configuración de CORS para permitir solicitudes desde ciertos origins, actualmente permite todas las solicitudes
app.use(cors());

// Especificar el Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
}).on("error", (error) => {
    // Manejo de errores al iniciar el servidor
    console.error("Error starting server:", error.message);
    throw new Error(error.message);
});