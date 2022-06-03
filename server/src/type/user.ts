import { JwtPayload } from "jsonwebtoken";
import { User } from "../entity";
import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./mutaion-response";

export type UserAuthPayload = JwtPayload & { userId: number }

@ObjectType({ implements: IMutaionResponse })
export class UserMutaionResponse implements IMutaionResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    user?: User
    @Field({ nullable: true })
    token?: string
}
