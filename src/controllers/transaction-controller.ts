// src/controllers/user-controller.ts 
import { Request, Response } from 'express';
import { TransactionService } from "../services/transaction/transaction-service";
import { TransactionRepository } from "../repositories/transaction/transaction-respository";
import { Transaction } from "../interfaces/transaction-interface";

const transactionRepo = new TransactionRepository();
const transactionService = new TransactionService(transactionRepo);

export class TransactionsController {
    // Método para insertar una transacción
    async insertTransaction(req: Request, res: Response) {

        // Obtener los datos del body de la solicitud
        const transaction = req.body as Transaction;

        try {

            // Validar que los datos de la transacción sean correctos
            if (!transaction || !transaction.terminalId || !transaction.amount || !transaction.currency || !transaction.transactionType) {
                res.status(400).json({ message: "Datos de transacción inválidos" });
                return;
            }

            const createTransactionResponse = await transactionService.createTransaction(transaction);

            //  Si no se pudo crear la transacción, devolver un error 400 (Unauthorized)
            if (!createTransactionResponse) {
                res.status(400).json({ message: "Credenciales inválidas" });
                return;
            }

            // Si la transacción fue creada exitosamente, devolver la respuesta 200 (OK)
            res.status(200).json({
                status: "success",
                message: "Transacción creada exitosamente",
                data: createTransactionResponse,
            });
        } catch (error) {
            //Error en el servidor
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }

}
