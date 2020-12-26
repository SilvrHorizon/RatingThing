import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { myContext } from "../../@types/myContext";
import { User } from "../../entities/user.entity";
import { RegisterUserResponse } from "./responses";

import { adminsOnly, authenticationRequired } from "../../middleware/authenticationRequired"
import { userFromSession } from "../../utils/common";

@Resolver()
class UserResolver{
    @Query(returns => User)
    @UseMiddleware(authenticationRequired)
    me(@Ctx() {userUtils} : myContext){
        return userUtils.getUser();
    }

    @Query(returns => Boolean)
    async login(@Ctx() {session} : myContext, @Arg('email') email: string, @Arg('password') password: string){
        
        const user = await User.findOne({
            where: {
                email
            }
        })

        session.userId = 1;
        if(user){
            if(await user.checkPassword(password)){
                session.userId = user.id;
                console.log("Life is good for this user I suppose")
                return true
            }
        }

        return false;
    }


    @Mutation((returns) => RegisterUserResponse)
    async register(@Arg('email') email: string, @Arg('password') password : string): Promise<RegisterUserResponse>{
        
        if(await User.findOne({where: {email}})){
            return {
                error: {
                    message: "Email already in use!"
                }
            }
        }

        const user = await User.create(
            {
                email,
                password,
                isAdmin: false
            }
        ).save();

        return {user: user};

    }

}