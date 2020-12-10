//console.log("Hello world!"); 

import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/user.entity";

const main = async () => {

    const conn = await createConnection();
    await conn.runMigrations();


    console.log(await User.find());

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