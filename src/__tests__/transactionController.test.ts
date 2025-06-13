// tests/controllers/user-controller.test.ts
import { TransactionsController } from '../../src/controllers/transaction-controller';
import { TransactionService } from '../../src/services/transaction/transaction-service';

describe('TransactionsController', () => {
    let controller: TransactionsController;
    let mockCreateTransaction: jest.Mock;
    let req: any;
    let res: any;

    beforeEach(() => {
        mockCreateTransaction = jest.fn();

        const mockService = {
            createTransaction: mockCreateTransaction,
            listarTransacciones: jest.fn(),
        };

        controller = new TransactionsController(mockService as any);

        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });


    test('Debe responder 400 si faltan datos en la transacción', async () => {
        req.body = {}; // body vacío
        await controller.insertTransaction(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Datos de transacción inválidos" });
    });

    test('Debe responder 400 si createTransaction retorna null', async () => {
        req.body = {
            terminalId: '123',
            amount: 100,
            currency: 'USD',
            transactionType: 'payment',
        };

        mockCreateTransaction.mockResolvedValue(null);

        await controller.insertTransaction(req, res);

        expect(mockCreateTransaction).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "No se pudo crear la transacción" });
    });

    test('Debe responder 200 si la transacción se crea correctamente', async () => {
        const transactionResponse = { id: 'tx123', ...req.body };

        req.body = {
            terminalId: '123',
            amount: 100,
            currency: 'USD',
            transactionType: 'payment',
        };

        mockCreateTransaction.mockResolvedValue(transactionResponse);

        await controller.insertTransaction(req, res);

        expect(mockCreateTransaction).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Transacción creada exitosamente",
            data: transactionResponse,
        });
    });

    test('Debe responder 500 en caso de error', async () => {
        req.body = {
            terminalId: '123',
            amount: 100,
            currency: 'USD',
            transactionType: 'payment',
        };

        mockCreateTransaction.mockRejectedValue(new Error('fail'));

        await controller.insertTransaction(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Internal Server Error",
            error: expect.any(Error)
        }));
    });
});
