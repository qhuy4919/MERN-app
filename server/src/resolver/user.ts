import { Mutation, Resolver, Arg, Query } from "type-graphql";
import { LoginInput, RegisterInput, UserMutaionResponse } from '../type';
import { User } from '../entity';
import argon2 from 'argon2';
import { createToken } from '../util/token'

@Resolver()
export class UserResolver {
    @Query(_return => [User])
    async user(): Promise<User[]> {
        return await User.find();
    }

    @Mutation(_return => UserMutaionResponse)
    async register(
        @Arg('registerInput')
        registerInput: RegisterInput
    ): Promise<UserMutaionResponse> {
        const { username, password } = registerInput;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return {
                code: 400,
                success: false,
                message: 'User existing'
            }
        }

        const hashPassword = await argon2.hash(password);

        const newUser = User.create({
            username,
            password: hashPassword,
        });

        await newUser.save();

        return {
            code: 200,
            success: true,
            message: 'User registration successful',
            user: newUser
        }
    }

    @Mutation(_return => UserMutaionResponse)
    async login(
        @Arg('loginInput')
        { username, password }: LoginInput
    ): Promise<UserMutaionResponse> {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: 'User not found'
            }
        }

        const isPasswordValid = await argon2.verify(existingUser.password, password);

        if (!isPasswordValid) {
            return {
                code: 400,
                success: false,
                message: 'Password invalid'
            }
        }

        return {
            code: 200,
            success: true,
            message: 'login successful',
            user: existingUser,
            token: createToken(existingUser)
        }
    }


}