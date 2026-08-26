import { Router } from "express";
import {
    createAppointment,
    // getAppointmentByID,
    deleteAppointment,
    getAppointments,
    updateStatusAppointment
} from "./appointment.controller";

const router = Router();

router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);
// router.get("/appointments/:id", getAppointmentByID);
router.patch("/appointments/:id", updateStatusAppointment);
router.delete("/appointments/:id", deleteAppointment);


export default router;