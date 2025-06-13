import { User } from '../../interfaces/user-interface';
import UserModel from "../../models/user-model-psql";
import { IUserRepository, UserByEmailOrNickParams } from "../../interfaces/user-repository-interface";
import { Op } from "sequelize";

export class UserRepository implements IUserRepository {

    // Método para consultar en la BD un usuario por email o nick usando Sequelize
    async findUserByEmailOrNick({ email }: UserByEmailOrNickParams): Promise<User | null> {
        const existingUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: email?.toLowerCase() },
                    { nick: email?.toLowerCase() }
                ]
            }
        });
        return existingUser as User | null;
    }

}