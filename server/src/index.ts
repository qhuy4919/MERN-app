
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { normalize } from 'path';
import { User, Card } from './entity';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { CardRosolver, UserResolver } from './resolver';
import { Context } from '@root/type';
require('dotenv').config();

//
const port = normalize(process.env.PORT || "1234");
const ip = require("ip");

const main = async () => {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'MERN-app',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [User, Card],
        logging: true,
        synchronize: true,
    })
    console.log('Data source has been initialized');

    const app = express();
    const httpServer = createServer(app);

    //create graphQL server
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [CardRosolver, UserResolver],
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground
        ],
        context: ({ req, res }: Context) => ({ req, res })

    })
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    await new Promise(resolve => httpServer.listen({ port: PORT, hostname: '0.0.0.0' }, resolve as () => void));

    console.log(`server running on port ${PORT}. graphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log('current IP address: ', ip.address());
}

main().catch(error => console.log('ERROR STARTING SERVER: ', error))
