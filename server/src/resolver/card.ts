import { Context } from '@root/type';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyToken } from '../middleware';
import { CardMutationResponse, NewCard } from '../type';
import { Card, User } from '../entity';
@Resolver()
export class CardRosolver {
    @Query(_return => CardMutationResponse)
    @UseMiddleware(verifyToken)
    async getCardList(
        @Ctx() { user }: Context
    ): Promise<CardMutationResponse> {
        const { userId } = user;

        const isUserExisting = await User.find({
            where: {
                id: userId
            }
        })

        if (isUserExisting) {
            return {
                code: 401,
                success: false
            }
        }

        try {
            const cardList: Card[] = await Card.find();

            return {
                code: 200,
                success: true,
                list_card: cardList
            }
        } catch (error) {
            return {
                code: 500,
                success: false
            }
        }
    }

    @Mutation(_return => CardMutationResponse)
    @UseMiddleware(verifyToken)
    async addCard(
        @Arg('newCard')
        body: NewCard
    ): Promise<CardMutationResponse> {
        try {
            const { kanji } = body;
            const existingCard = await Card.findOne({
                where: {
                    kanji: kanji
                }
            });

            if (existingCard) return {
                code: 400,
                success: false,
                message: 'kanji is already existed'

            }
            const newCard: Card = Card.create(body);
            await newCard.save();

            return {
                code: 200,
                success: true,
                message: 'Create card succsessful'
            }
        } catch (error) {
            return {
                code: 500,
                success: false
            }
        }
    }

}