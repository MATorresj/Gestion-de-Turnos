import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn  } from "typeorm";
import { Credentials } from "./Credentials";
import { Appointments } from "./Appointment";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column({
        length: 100
    })
    email: string

    @Column({
        length: 100,
        nullable: false
    })
    birthdate: string

    @Column("integer")
    nDni: number

    @Column({
        type: "text",
        nullable: true
    })
    profilePicture: string;

    @OneToOne(()=> Credentials, credentials => credentials.user)
    @JoinColumn({ name: "credentialsId"})
    credentials: Credentials

    @OneToMany(()=> Appointments , (appointment)=> appointment.user)
    appointments: Appointments[]
}
