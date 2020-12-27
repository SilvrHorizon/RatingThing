import { Query, Resolver } from "type-graphql";


@Resolver()
export class testResolver{

    @Query(() => String)
    testQuery(){
        return "Hello world!";
    }


}