import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/user.entity";
// import sqliteStoreFactory from 'express-session-sqlite'
import session from "express-session";
import { currentUserFetcher } from "./utils/currentUserFetcher";

const main = async () => {

    const conn = await createConnection();
    await conn.runMigrations();


    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"]
    });


    const apolloServer = new ApolloServer(
        { 
            schema,
            context: (ctx) => {
                return {
                    req: ctx.req,
                    session: ctx.req.session,
                    userUtils: new currentUserFetcher((ctx.req.session as any).userId)
                }
            }
        });

    
    
    const app = express();
    app.use(
        session(
            {
                /*
                store: new SqliteStore({
                    path: 'sessions.sqlite',
                    driver: sqlite3.Database,
                    ttl: 12345,
                }),*/
                name: "qid",
                resave: false,
                saveUninitialized: false,
                secret: process.env.SECRET || "temp",
                cookie: {
                    maxAge: 60 * 60 * 24,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production"
                }
            }
        )
    );


    apolloServer.applyMiddleware({
        app,
    });

    app.listen(5000, () => {
        console.log("Listening on http://127.0.0.1:5000/graphql");
    })
}

main();