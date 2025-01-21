import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointments } from "../entities/Appointment";
import { Credentials } from "../entities/Credentials";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "torres999",
    database: "proyecto_m3",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointments, Credentials],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User)
export const CredentialModel = AppDataSource.getRepository(Credentials)
export const AppointmentModel = AppDataSource.getRepository(Appointments)