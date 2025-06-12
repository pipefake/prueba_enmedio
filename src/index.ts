import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/conecction";
import swaggerJSDoc from "swagger-jsdoc";
import { openapiSpecification } from "./config/swagger-config";
import swaggerUi from 'swagger-ui-express';

// Mensaje de Bienvenida para verificare ejecutó la API de Node
console.log("API Node en ejecución");

// Usar la conexión a la Base de Datos
connection();

// Importar las rutas de usuario
import userRoutes from './routes/user-router';

// Crear una instancia de Express
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

//Configuración de dotenv para cargar variables de entorno
dotenv.config();

// Middleware para manejar JSON y URL-encoded
app.use(express.json());

// Middleware para manejar datos URL-encoded
app.use(express.urlencoded({ extended: true }));

//Rutas de la API de usuarios
app.use('/api/user', userRoutes);

//Configuración de CORS para permitir solicitudes desde ciertos origins, actualmente permite todas las solicitudes
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

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