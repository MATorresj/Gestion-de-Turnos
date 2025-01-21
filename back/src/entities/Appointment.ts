import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointments"
})
export class Appointments {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    date: string

    @Column({
        length: 8
    })
    time: string

    @Column({
        default: "active"
    })
    status: string

    @ManyToOne(()=> User, (user)=> user.appointments)
    user: User
}