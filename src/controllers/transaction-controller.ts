// src/controllers/user-controller.ts 
import { Request, Response } from 'express';
import { TransactionService } from "../services/transaction/transaction-service";
import { TransactionRepository } from "../repositories/transaction/transaction-respository";
import { Transaction, FiltroTransacciones } from "../interfaces/transaction-interface";
import { TransactionRepository as PostgresUserRepository } from '../repositories/transaction/transaction-repository-psql';
import { TransactionRepository as MongoUserRepository } from '../repositories/transaction/transaction-respository'; // Asegúrate de que el nombre del archivo sea correcto

// Instanciar ambos repositorios
const postgresRepo = new PostgresUserRepository();
const mongoRepo = new MongoUserRepository();

// Pasar ambos al servicio
const transactionService = new TransactionService(postgresRepo, mongoRepo);

export class TransactionsController {

    private transactionService: TransactionService;

    constructor(transactionService?: TransactionService) {
        this.transactionService = transactionService || new TransactionService(
            new PostgresUserRepository(),
            new MongoUserRepository()
        );
    }


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

            const createTransactionResponse = await this.transactionService.createTransaction(transaction);

            //  Si no se pudo crear la transacción, devolver un error 400 (Unauthorized)
            if (!createTransactionResponse) {
                res.status(400).json({ message: "No se pudo crear la transacción" });
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

    // Método para listar las transacciones
    async listarTransacciones(req: Request, res: Response) {

        // Recibimos los filtros por la query
        const { fechaInicio, fechaFin, terminalId, status, page = '1', limit = '10' } = req.query;

        // Formar el objeto con los filtros
        const filtros: FiltroTransacciones = {
            fechaInicio: fechaInicio ? new Date(fechaInicio as string) : undefined,
            fechaFin: fechaFin ? new Date(fechaFin as string) : undefined,
            terminalId: terminalId as string,
            status: status as string,
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10
        };

        try {
            const transacciones = await this.transactionService.listarTransacciones(filtros);
            res.status(200).json({
                status: "success",
                data: transacciones,
            });
        } catch (error) {
            console.error('Error al crear transacción:', error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
}
