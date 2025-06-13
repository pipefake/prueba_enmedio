import { DataTypes, Model } from 'sequelize';
import sequelize from '../databases/sequelize';
import { TransactionInput, Transaction } from '../interfaces/transaction-interface';
// import { User } from '../interfaces/user-interface'

// Modelo Sequelize

class TransactionModel extends Model<Transaction, TransactionInput> implements Transaction {
    public id!: number;
    public terminalId!: string;
    public amount!: number;
    public currency!: string;
    public cardMasked?: string;
    public transactionType!: string;
    public status?: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Inicialización del modelo
TransactionModel.init({
    _id: {
        type: DataTypes.FLOAT,
        primaryKey: true,
        autoIncrement: true
    },
    terminalId: {
        type: DataTypes.STRING,
        field: 'terminalid' // <- Esto enlaza correctamente con la columna
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cardMasked: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'cardmasked'
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'transactiontype'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'transactions',
    modelName: 'Transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export default TransactionModel;
