import { IsAlphanumeric, IsEmail, MinLength, } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './base';

@ObjectType() //talking to graphQL
@Entity()  // talking to database
export class User extends Base {
    @Field()
    @IsAlphanumeric(undefined, { message: 'Username must be alphanumeric' })
    @MinLength(8, { message: 'Username must be at least 8 characters long' })
    @Column({ unique: true })
    username!: string;

    @Column()
    @MinLength(8, { message: 'Password must at least 8 characters long' })
    password!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @IsEmail(undefined, { message: 'Invalid email address' })
    email: string;

    @Field()
    @Column({ default: '' })
    imgUrl: string


}