import { User } from "../entities/user.entity";

export const userFromSession = async (session: any) => {
    return await User.findOne({where: {id: session.userId}})
};