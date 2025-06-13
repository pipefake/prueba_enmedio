// Interfaz que define una transacción
export interface TransactionInput {
    terminalId: string;
    amount: number;
    currency: string;
    cardMasked?: string;
    transactionType: string;
    status?: string;
}

// Resultado con timestamps e id
export interface Transaction extends TransactionInput {
    id?: number; // Sequelize
    _id?: string; // MongoDB
    created_at: Date;
    updated_at: Date;
}

//Interfaz que define los métodos del repositorio de transacción
export interface ITransactionRepository {
    createTransaction(transaction: Transaction): Promise<Transaction>
    listarTransacciones(filtros: FiltroTransacciones): Promise<Transaction[]>
}

//interfaz que define los métodos del servicio de transacción
export interface ITransactionService {
    createTransaction(transaction: Transaction): Promise<Transaction | null>
}

// Interfaz para los filtros de las transacciones
export interface FiltroTransacciones {
    fechaInicio?: Date;
    fechaFin?: Date;
    terminalId?: string;
    status?: string;
    page?: number;
    limit?: number;
}