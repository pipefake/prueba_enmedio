// src/routes/user-router.ts
import express from "express";
import { TransactionsController } from "../controllers/transaction-controller";
const transactionsController = new TransactionsController();
import { ensureAuth } from '../middleware/Auth';

//Inicializar el enrutador de Express
const router = express.Router();

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Insertar una transacción
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               terminalId:
 *                 type: string
 *                 example: "123456"
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               currency:
 *                 type: string
 *                 example: "USD"
 *               cardMasked:
 *                 type: string
 *                 example: "**** **** **** 1234"
 *               status:
 *                  type: string
 *                  example: "completed"
 *               transactionType:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: Creación de transacción exitosa
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/transactions', ensureAuth(), (req, res) => transactionsController.insertTransaction(req, res)); // ruta para insertar transacciones
/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: Listar transacciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de transacciones exitoso
 *       403:
 *         description: No tiene permisos para acceder a esta ruta
 */
router.get('/transactions', ensureAuth(), (req, res) => transactionsController.listarTransacciones(req, res)); // ruta para listar transacciones

//Exportar el enrutador
export default router;
