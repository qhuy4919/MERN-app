import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class Base extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @CreateDateColumn()
    createAt: Date;

    @Field()
    @CreateDateColumn()
    updateAt: Date;
}