// src/routes/user-router.ts
import express from "express";
import { UserController } from "../controllers/user-controller";
const userController = new UserController();
//Inicializar el enrutador de Express
const router = express.Router();
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jfjimenezsalazar@gmail.com
 *               password:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', userController.login); // ruta para el login

//Exportar el enrutador
export default router;
