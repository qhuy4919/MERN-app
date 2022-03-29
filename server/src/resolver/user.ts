import { Mutation, Resolver } from "type-graphql";
import { RegisterInput } from '../type';
import { User } from '../entity';

@Resolver()
export class UserResolver {


    @Mutation()
    async register(
        registerInput: RegisterInput
    ): Promise<any> {
        const { username, password } = registerInput;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return {
                code: 400,
                success: false,
                message: 'User existing'
            }
        }
    }

}