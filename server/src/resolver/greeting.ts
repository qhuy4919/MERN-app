import { Query, Resolver } from 'type-graphql';

@Resolver()
export class GreetingRosolver {
    @Query()
    hello(): string {
        return 'hello word';
    }
}