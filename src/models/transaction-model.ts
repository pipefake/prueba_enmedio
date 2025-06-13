import { Schema, model } from "mongoose";
import { Transaction } from "../interfaces/transaction-interface";

// Esquema de Mongoose para el modelo de transacción
const TransactionSchema = new Schema<Transaction>({
    terminalId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    cardMasked: {
        type: String,
        required: false
    },
    transactionType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const TransactionModel = model<Transaction>('Transaction', TransactionSchema);

export default TransactionModel;