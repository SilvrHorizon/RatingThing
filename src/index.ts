//console.log("Hello world!"); 

import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver } from "type-graphql";
import { Console } from "console";
import { createConnection } from "typeorm";

const main = async () => {

    await createConnection()

    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"]
    });

    const apolloServer = new ApolloServer({ schema });
    
    const app = express();

    apolloServer.applyMiddleware({
        app
    });

    app.listen(5000, () => {
        console.log("Listening on http://127.0.0.1:5000/graphql");
    })
}

main();