import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    kanji!: string

    @Column()
    romanji!: string

    @Column()
    meaning!: string

    @Column({ nullable: true })
    on: string

    @Column({ nullable: true })
    kun: string

    @Column({ nullable: true })
    example: string
}