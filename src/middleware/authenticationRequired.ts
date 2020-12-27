import { AuthenticationError,  } from "apollo-server-express";
import { MiddlewareFn, NextFn, UnauthorizedError } from "type-graphql";
import { myContext } from "../@types/myContext";
import { User } from "../entity/user.entity";

export const authenticationRequired: MiddlewareFn<any> = async( resolverData, next) => { 
    const context = resolverData.context as myContext

    if(!(await context.userUtils.getUser())){
        throw new AuthenticationError("Missing or invalid token.");
    }
    return next();
}

export const adminsOnly: MiddlewareFn<any> = async (resolverData, next) => {
    await authenticationRequired(resolverData, async () => {});
    
    const context = resolverData.context as myContext;
 
    if((await context.userUtils.getUser())?.isAdmin){
        return next();
    }
    throw new UnauthorizedError();
}


