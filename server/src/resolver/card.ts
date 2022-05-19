import { Context } from '@root/type';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyToken } from '../middleware';

@Resolver()
export class CardRosolver {
    @Query()
    @UseMiddleware(verifyToken)
    hello(
        @Ctx() { user }: Context
    ): string {
        return 'hello word';
    }
}