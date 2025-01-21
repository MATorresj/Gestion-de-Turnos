import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentsService";
import { Appointments } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments: Appointments[] = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(404).json({ message: "Error al obtener los turnos", error: errorMessage });
    }
}

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment: Appointments = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(404).json({ message: "Error al obtener el turno", error: errorMessage });
    }
}

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const newAppointment = await createAppointmentService(req.body);


        res.status(201).json(newAppointment);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(400).json({ message: "Error al crear el turno", error: errorMessage });
    }
}

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const cancelAppointment = await cancelAppointmentService(Number(id));
        res.status(200).json({
            message: "Turno cancelado con éxito",
            cancelAppointment,
        });
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(404).json({ message: "Error al cancelar el turno", error: errorMessage });
    }
}
