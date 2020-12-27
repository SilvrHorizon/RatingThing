import { Field, ObjectType } from "type-graphql";
import { User } from "../../entity/user.entity"
import { ErrorResponse } from "../common/ResponsTypes"

@ObjectType()
export class RegisterUserResponse{
    @Field({nullable: true})
    user?: User;

    @Field({nullable: true})
    error?: ErrorResponse;
}