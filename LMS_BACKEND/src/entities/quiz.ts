import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./course";
import { Result } from "./result";
@Entity("Quiz_LMS")
export class Quiz{

    @PrimaryGeneratedColumn()
    quizId:number

    @Column()
    quizName:string

    @Column()
    description:string

    @Column()
    totalmarks:number    

    @ManyToOne(()=>Course, (course)=>course.quizzes)
    @JoinColumn({name:"courseId"})
    course:Course

    @OneToMany(()=>Result, (result)=>result.quiz)
    results:Result[]
}