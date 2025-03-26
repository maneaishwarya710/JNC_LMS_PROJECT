import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
@Entity("PAYMENT_LMS")
export class Payment{

    @PrimaryGeneratedColumn()
    paymentId:number

    @Column("decimal")
    amount:number

    @Column()
    paymentDate:Date

    @Column()
    paymentMethod:string   

    @ManyToOne(()=>User, (user)=>user.payments)
    @JoinColumn({name:"userId"})
    user:User
}