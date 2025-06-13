import { Transaction } from '../../interfaces/transaction-interface';
import TransactionModel from "../../models/transaction-model";
import { ITransactionRepository } from "../../interfaces/transaction-interface";

export class TransactionRepository implements ITransactionRepository {

    // Método para crear una transacción en la base de datos
    async createTransaction(transaction: Transaction): Promise<Transaction> {
        const transactionCreate = await TransactionModel.create(transaction);
        return transactionCreate;
    }

    async listarTransacciones(): Promise<Transaction[]> {
        const transactions = await TransactionModel.find().sort({ createdAt: -1 });
        return transactions;
    }
}
