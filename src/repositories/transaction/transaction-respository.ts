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

        //Validar que el filtro por fecha inicial y fecha fin exista 
        if (filtros.fechaInicio || filtros.fechaFin) {
            query.createdAt = {};
            if (filtros.fechaInicio) {
                query.createdAt.$gte = filtros.fechaInicio;
            }
            if (filtros.fechaFin) {
                query.createdAt.$lte = filtros.fechaFin;
            }
        }

        //Validar que el filtro por terminalId exista
        if (filtros.terminalId) {
            query.terminalId = filtros.terminalId;
        }

        //Validar que el filtro por el status exista
        if (filtros.status) {
            query.status = filtros.status;
        }

        // Paginación
        const page = filtros.page || 1;
        const limit = filtros.limit || 10;
        const skip = (page - 1) * limit;

        //Se envia la query con los filtros
        return await TransactionModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }
}
