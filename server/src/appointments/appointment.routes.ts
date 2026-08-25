import { Router } from "express";
import {
    createAppointment,
    getAppointmentByID,
    deleteAppointment,
    getAppointments,
    updateAppointment
} from "./appointment.controller";

const router = Router();

router.post("/appointments", createAppointment);
router.delete("/appointments/:id", deleteAppointment);
router.get("/appointments", getAppointments);
router.get("/appointments/:id", getAppointmentByID);
router.patch("/appointments/:id", updateAppointment)


export default router;