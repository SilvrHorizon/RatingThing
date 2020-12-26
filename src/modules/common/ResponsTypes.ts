import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorResponse{
    @Field({nullable: true})
    message?: string;
}