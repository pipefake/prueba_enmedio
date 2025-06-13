import { TransactionInput, Transaction, FiltroTransacciones } from '../../interfaces/transaction-interface';
import TransactionModel from "../../models/transaction-model-psql";
import { ITransactionRepository } from "../../interfaces/transaction-interface";
import { Op, WhereOptions } from "sequelize";

export class TransactionRepository implements ITransactionRepository {

    // Método para crear una transacción en la base de datos
    async createTransaction(transaction: TransactionInput): Promise<Transaction> {
        const transactionCreate = await TransactionModel.create(transaction);
        return transactionCreate.toJSON() as Transaction;
    }

    // Método para listar las transacciones
    async listarTransacciones(filtros: FiltroTransacciones = {}): Promise<Transaction[]> {
        const where: WhereOptions = {};

        // Filtro por fecha
        if (filtros.fechaInicio || filtros.fechaFin) {
            where['createdAt'] = {};
            if (filtros.fechaInicio) {
                where['created_at'][Op.gte] = filtros.fechaInicio;
            }
            if (filtros.fechaFin) {
                where['created_at'][Op.lte] = filtros.fechaFin;
            }
        }
        // Filtro por terminalId
        if (filtros.terminalId) {
            where['terminalId'] = filtros.terminalId;
        }

        // Filtro por status
        if (filtros.status) {
            where['status'] = filtros.status;
        }

        const transactions = await TransactionModel.findAll({
            where,
            order: [['created_at', 'DESC']]
        });

        return transactions.map(t => t.toJSON() as Transaction);
    }
}
