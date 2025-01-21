import { AppointmentModel, UserModel } from "../config/data-source";
import { Appointments } from "../entities/Appointment";
import { User } from "../entities/User";
import IAppointmentDto from "../dtos/IAppointmentDto";
import { sendConfirmationEmail } from "./emailService";

export const getAppointmentsService = async () =>{
    const allAppointments: Appointments[] = await AppointmentModel.find({relations: ["user"]})
    return allAppointments;
}

export const getAppointmentByIdService = async (id: number)=>{
    const foundAppointment: Appointments | null = await AppointmentModel.findOne({where: {id}, relations: ["user"]})
    if(!foundAppointment) throw Error ("El turno no fue encontrado")
    return foundAppointment;
}

export const createAppointmentService = async (createAppointmentDTO: IAppointmentDto) => {
    const newAppointment: Appointments = await AppointmentModel.create(createAppointmentDTO)
    await AppointmentModel.save(newAppointment)

    const user: User | null = await UserModel.findOneBy({id: createAppointmentDTO.userId})

    if(user) {
        newAppointment.user = user

        const emailSubject = "Confirmación de turno";
        const emailText = `Su turno ha sido creado para el ${createAppointmentDTO.date} a las ${createAppointmentDTO.time}.`;
        sendConfirmationEmail(user.email, emailSubject, emailText);
    } else {
        throw new Error("Usuario no encontrado")
    }

    await AppointmentModel.save(newAppointment)

    return newAppointment
}

export const cancelAppointmentService = async (id: number) => {
    const appointment: Appointments | null = await AppointmentModel.findOne({ where: { id }, relations: ["user"] })
    if (appointment) {
        appointment.status = "canceled";
        await AppointmentModel.save(appointment)

        console.log('Usuario asociado al turno:', appointment.user);
        console.log('Turno cancelado:', appointment);

        if (appointment.user) {
            const emailSubject = "Cancelación de turno";
            const emailText = `Su turno programado para el ${appointment.date} a las ${appointment.time} ha sido cancelado.`;
            console.log('Enviando correo a:', appointment.user.email);
            sendConfirmationEmail(appointment.user.email, emailSubject, emailText);
        }

        return appointment;
    } else {
        throw Error("No existe el turno con dicho ID");
    }
}