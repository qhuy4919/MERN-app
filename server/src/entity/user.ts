import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() //talking to graphQL
@Entity()  // talking to database
export class User extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id !: number //'!' mean require

    @Field()
    @Column({ unique: true })
    username !: string

    @Column()
    password !: string
}