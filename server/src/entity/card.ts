import { Field, ObjectType } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { Base } from './base';

@ObjectType()
@Entity()
export class Card extends Base {
    @Field()
    @Column({ unique: true })
    kanji!: string

    @Field()
    @Column()
    romanji!: string

    @Field()
    @Column()
    meaning!: string

    @Field()
    @Column({ nullable: true })
    on?: string

    @Field()
    @Column({ nullable: true })
    kun?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    example?: string
}