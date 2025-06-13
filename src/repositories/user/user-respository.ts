import { User } from '../../interfaces/user-interface';
import UserModel from "../../models/user-model";
import { IUserRepository, UserByEmailOrNickParams } from "../../interfaces/user-repository-interface";

export class UserRepository implements IUserRepository {

    // Método para consultar en la BD un usuario por email o nick 
    async findUserByEmailOrNick({ email }: UserByEmailOrNickParams): Promise<User | null> {
        const existingUser = await UserModel.findOne({ $or: [{ email: email?.toLowerCase() }, { nick: email?.toLowerCase() }] });
        return existingUser
    }

}