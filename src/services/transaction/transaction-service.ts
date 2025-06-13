import { ITransactionService, ITransactionRepository, Transaction, FiltroTransacciones } from "../../interfaces/transaction-interface";

export class TransactionService implements ITransactionService {

    private postgresUserRepository: ITransactionRepository;
    private mongoUserRepository: ITransactionRepository;

    constructor(
        postgresUserRepository: ITransactionRepository,
        mongoUserRepository: ITransactionRepository
    ) {
        this.postgresUserRepository = postgresUserRepository;
        this.mongoUserRepository = mongoUserRepository;
    }

    // Crear una transacción en ambos repositorios
    async createTransaction(transaction: Transaction): Promise<Transaction | null> {
        // Crear en MongoDB
        const mongoTransaction = await this.mongoUserRepository.createTransaction(transaction);
        // Crear en Postgres
        const postgresTransaction = await this.postgresUserRepository.createTransaction(transaction);

        // Si alguna falla, puedes manejar el error según tu lógica de negocio
        if (!mongoTransaction || !postgresTransaction) return null;

        // Puedes retornar la transacción creada en uno de los repositorios (por ejemplo, MongoDB)
        return mongoTransaction;
    }

    // Listar transacciones combinando ambos repositorios
    async listarTransacciones(filtros: FiltroTransacciones = {}): Promise<Transaction[]> {
        const mongoTransactions = await this.mongoUserRepository.listarTransacciones(filtros) || [];
        const postgresTransactions = await this.postgresUserRepository.listarTransacciones(filtros) || [];

        if (!mongoTransactions || !postgresTransactions) {
            return [];
        }

        return mongoTransactions || [];
    }
}