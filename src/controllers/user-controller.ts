// src/controllers/user-controller.ts
import { Request, Response } from "express";

//Controlador de prueba
const testUser = (req: Request, res: Response) => {
    res.send('Hello World!')
};

export { testUser };