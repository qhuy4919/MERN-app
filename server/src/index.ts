
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { normalize, resolve } from 'path';
import { User } from './entity';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GreetingRosolver } from './resolver/greeting';
require('dotenv').config();

//
const port = normalize(process.env.PORT || "1234");
const main = async () => {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'MERN-app',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [User],
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
            resolvers: [GreetingRosolver],
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground
        ],

    })
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve as () => void));

    console.log(`server running on port ${PORT}. graphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`)
}

main().catch(error => console.log('ERROR STARTING SERVER: ', error))
