//console.log("Hello world!"); 

import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver } from "type-graphql";
import { Console } from "console";


@Resolver()
class testResolver{
    @Query(() => String)
    async test(){
        return "Tested!";
    }

}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [testResolver]
    });

    const apolloServer = new ApolloServer({ schema });
    
    const app = express();

    app.listen(5000, () => {
        console.log("Listening on http://127.0.0.1:5000");
    })
}

main();