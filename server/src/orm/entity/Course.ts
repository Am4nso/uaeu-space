import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm"
import {CourseFile} from "./CourseFile";

@Entity()
export class Course {

    @PrimaryColumn()
    tag!: string;

    @Column()
    name!: string;

    @OneToMany(() => CourseFile, file => file.course)
    files!: CourseFile[];

    @Column({default: 0})
    views!: number;

}
