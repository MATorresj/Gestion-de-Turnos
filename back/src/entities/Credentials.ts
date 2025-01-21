import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from "typeorm";
import { User } from "./User";

@Entity({
    name: "credentials"
})
export class Credentials {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    username: string

    @Column({
        length: 100
    })
    password: string

    @OneToOne(()=> User, user => user.credentials)
    @JoinColumn({name: "userId"})
    user: User
}