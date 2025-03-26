import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment";
import { Payment } from "./payment";
import { Result } from "./result";
@Entity("USER_LMS")
export class User{

    @PrimaryGeneratedColumn()
    userId:number

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    userType:string
    
    @OneToMany(()=>Enrollment, (enrollment)=>enrollment.user)
    enrollments:Enrollment[]

    @OneToMany(()=>Payment, (payment)=>payment.user)
    payments:Payment[]

    @OneToMany(()=>Result, (result)=>result.user)
    results:Result[]
}