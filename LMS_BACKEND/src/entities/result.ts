import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./course";
import { Quiz } from "./quiz";
import { User } from "./user";
@Entity("RESULT_LMS")
export class Result{

    @PrimaryGeneratedColumn()
    resultId:number

    @Column()
    score:number 
    
    @ManyToOne(()=>Course, (course)=>course.results)
    @JoinColumn({name:"courseId"})
    course:Course

    @ManyToOne(()=>Quiz, (quiz)=>quiz.results)
    @JoinColumn({name:"quizId"})
    quiz:Quiz

    @ManyToOne(()=>User, (user)=>user.results)
    @JoinColumn({name:"userId"})
    user:User;
}