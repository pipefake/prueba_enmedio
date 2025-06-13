import { ITransactionService, ITransactionRepository, Transaction } from "../../interfaces/transaction-interface";

export class TransactionService implements ITransactionService {

    // Repositorio de transacciones
    private transactionRepository: ITransactionRepository;

    // Constructor que recibe el repositorio de transacciones
    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Método para crear una transacción
    async createTransaction(transaction: Transaction): Promise<Transaction | null> {

        //Validar la inserción de la transacción
        const transactionResponse = await this.transactionRepository.createTransaction(transaction);
        if (!transactionResponse) return null;

        return transactionResponse;
    }

    async listarTransacciones(): Promise<Transaction[]> {

        const listarTransaccionesResponse = await this.transactionRepository.listarTransacciones();

        if (!listarTransaccionesResponse) {
            return [];
        }

        return listarTransaccionesResponse;
    }

}