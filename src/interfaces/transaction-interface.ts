// Interfaz que define una transacción
export interface Transaction {
    _id: string;
    terminalId: string;
    amount: number;
    currency: string;
    cardMasked?: string;
    transactionType: string;
    status?: string;
    created_at: Date;
    updated_at: Date;
}

//Interfaz que define los métodos del repositorio de transacción
export interface ITransactionRepository {
    createTransaction(transaction: Transaction): Promise<Transaction>
    listarTransacciones(): Promise<Transaction[]>
}

//interfaz que define los métodos del servicio de transacción
export interface ITransactionService {
    createTransaction(transaction: Transaction): Promise<Transaction | null>
}