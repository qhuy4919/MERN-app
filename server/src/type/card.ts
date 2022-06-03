import { Field, InputType, ObjectType } from 'type-graphql';
import { IMutaionResponse } from './mutaion-response';
import { Card } from '../entity';

@ObjectType({ implements: IMutaionResponse })
export class CardMutationResponse implements IMutaionResponse {
    code: number
    success: boolean
    message?: string

    @Field(() => [Card], { nullable: true })
    list_card?: Card[]

}

@InputType()
export class NewCard {
    @Field()
    kanji!: string

    @Field()
    romanji!: string

    @Field()
    meaning!: string

    @Field({ nullable: true })
    on?: string

    @Field({ nullable: true })
    kun?: string

    @Field({ nullable: true })
    example?: string
}



