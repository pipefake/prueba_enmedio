import { Transaction, FiltroTransacciones } from '../../interfaces/transaction-interface';
import TransactionModel from "../../models/transaction-model";
import { ITransactionRepository } from "../../interfaces/transaction-interface";

export class TransactionRepository implements ITransactionRepository {

    // Método para crear una transacción en la base de datos
    async createTransaction(transaction: Transaction): Promise<Transaction> {
        const transactionCreate = await TransactionModel.create(transaction);
        return transactionCreate;
    }

    // Método para listar las transacciones
    async listarTransacciones(filtros: FiltroTransacciones = {}): Promise<Transaction[]> {

        //Se arma el query
        const query: any = {};

        if (filtros.fechaInicio || filtros.fechaFin) {
            query.createdAt = {};
            if (filtros.fechaInicio) {
                query.createdAt.$gte = filtros.fechaInicio;
            }
            if (filtros.fechaFin) {
                query.createdAt.$lte = filtros.fechaFin;
            }
        }

        if (filtros.terminalId) {
            query.terminalId = filtros.terminalId;
        }

        if (filtros.status) {
            query.status = filtros.status;
        }

        return await TransactionModel.find(query).sort({ createdAt: -1 });
    }
}
