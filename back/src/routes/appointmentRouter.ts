import { Router } from "express";
import { getAppointments, getAppointmentById, createAppointment, cancelAppointment } from "../controllers/appointmentController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAppointments)
appointmentRouter.get("/:id", getAppointmentById)
appointmentRouter.post("/schedule", createAppointment)
appointmentRouter.put("/cancel", cancelAppointment)

export default appointmentRouter;
