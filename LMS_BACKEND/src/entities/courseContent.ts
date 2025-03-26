import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./course";

@Entity("COURSECONTENT_LMS")
export class CourseContent{

    @PrimaryGeneratedColumn()
    contentId:number

    @Column()
    contentType:string   

    @ManyToOne(()=>Course, (course)=>course.contents)
    @JoinColumn({name:"CourseId"})
    course:Course
}