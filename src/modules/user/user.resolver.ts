import { Query, Resolver } from "type-graphql";


@Resolver()
class UserResolver{
    @Query(returns => String)
    me(){
        return "Hello world! Test change";
    }

}