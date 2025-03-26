import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment";
import { CourseContent } from "./courseContent";
import { Quiz } from "./quiz";
import { Result } from "./result";

@Entity("COURSE_LMS")
export class Course{

    @PrimaryGeneratedColumn()
    courseId:number

    @Column()
    courseName:string

    @Column()
    description:string

    @Column()
    price:number  

    @OneToMany(()=>Enrollment, (enrollment)=>enrollment.course)
    enrollments:Enrollment[];

    @OneToMany(()=>CourseContent, (courseContent)=>courseContent.course)
    contents:CourseContent

    @OneToMany(()=>Quiz, (quiz)=>quiz.course)
    quizzes:Quiz[]

    @OneToMany(()=>Result, (result)=>result.course)
    results:Result
}