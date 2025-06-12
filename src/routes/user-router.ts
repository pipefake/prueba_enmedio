// src/routes/user-router.ts
import express from "express";
import { testUser } from "../controllers/user-controller";

//Inicializar el enrutador de Express
const router = express.Router();

//Definir la ruta de prueba para el usuario
router.get('/', testUser);

//Exportar el enrutador
export default router;
