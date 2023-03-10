import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Professor} from "./Professor";
import {ReviewRatings} from "./ReviewRatings";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Professor, professor => professor.reviews)
    professor!: Professor

    @Column()
    author!: string

    @Column()
    score!: number

    @Column()
    positive!: boolean;

    @Column()
    comment!: string

    @OneToMany(() => ReviewRatings, ratings => ratings.review)
    ratings!: ReviewRatings[]

    @CreateDateColumn()
    created_at!: Date;
}
