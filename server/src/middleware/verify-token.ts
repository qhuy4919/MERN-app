import { MiddlewareFn } from "type-graphql";
import { Context, UserAuthPayload } from "../type";
import { AuthenticationError } from "apollo-server-core";
import { Secret, verify } from 'jsonwebtoken';

export const verifyToken: MiddlewareFn<Context> = ({ context }, next) => {
    try {

        const authHeader = context.req.header('Authorization');
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            throw new AuthenticationError("can not authenticated to perform GQL server");
        }

        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload;
        context.user = decoded;

        return next();

    } catch (error) {
        throw new AuthenticationError(`Authentication error: ${error}`);
    }
};