import { Request, Response } from "express";
import pg from "../db";
import {
    checkAllowStatus,
    checkAppointmentOverlap,
    checkPatientName,
    isAppointmentInFuture,
    checkAppointmentOverlapUpdate
} from "./appointment.service";
 

export const createAppointment = async (
    req: Request,
    res: Response
) => {
    try{
        const { patientname, appointmentat, status } = req.body;
        console.log("appointmentat:", appointmentat);
        console.log("parsed:", new Date(appointmentat));
        console.log("now:", new Date());
        if (!isAppointmentInFuture(appointmentat)){
            return res.status(400).json({
                error: "Appointment time must be in the future"
            })
        }
    
        if (await checkAppointmentOverlap(appointmentat)) return res.status(409).json({ error: "Conflict" });

        if (checkPatientName(patientname)){
            return res.status(400).json({
                error: "Patient name is required"
            });
        }

        if (!checkAllowStatus(status)){
            return res.status(400).json({
                error: "Invalid status"
            })
        }

        const result = await pg.query(
            `
            INSERT INTO appointments
            (patientname, appointmentat, status)
            VALUES ($1, $2, $3)
            RETURNING *
            `,[patientname, appointmentat, status]
        );
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error creating appointment", error);

        return res.status(500).json({
            error: "Internal server error"
        })
    }
};

export const getAppointmentByID = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const result = await pg.query(
            `
            SELECT *
            FROM appointments
            WHERE id = $1
            `,[id]
        );
        
        if (result.rows.length === 0){
            return res.status(404).json({
                error: "Appointment not found"
            });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error getting appointment by ID: ", error);
        return res.status(500).json({
            error: "Internal server error"
        })
    }
};

export const getAppointments = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await pg.query(
            `
            SELECT *
            FROM appointments
            `
        )
        return res.status(200).json(result.rows)
    }
    catch (error) {
        console.error("Error getting appointments: ", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
};

export const deleteAppointment = async (
    req: Request,
    res: Response
) => {

    try {
        const { id } = req.params;

        const result = await pg.query(
            `
            DELETE
            FROM appointments
            WHERE id = $1
            RETURNING *
            `,[id]
        )

        if (result.rows.length === 0){
            return res.status(404).json({
                error: "Appointment not found"
            })
        }
        return res.status(200).json({
            message: "Appointment deleted",
            appointment: result.rows[0]
        })


    } catch (error) {

        console.error("Error deleting appointment: ", error)

        return res.status(500).json({
            error: "Internal server error"
        })
    }

};

// export const updateAppointment = async(
//     req:Request,
//     res:Response
// ) => {
//     try {
//         const { id } = req.params;
//         const { patientname, appointmentat, status } = req.body;

//         const existing = await pg.query(
//             `
//             SELECT id
//             FROM appointments
//             WHERE id = $1
//             `,[id]
//         );

//         if (existing.rows.length === 0){
//             return res.status(404).json({
//                 error: "Appointment not found"
//             })
//         };

//         if (!isAppointmentInFuture(appointmentat)){
//             return res.status(400).json({
//                 error: "Appointment time must be in the future"
//             })
//         }

//         if (await checkAppointmentOverlapUpdate(appointmentat, id)){
//             return res.status(409).json({ error: "Conflict" })
//         }


//         const result = await pg.query(
//             `
//             UPDATE appointments
//             SET patientname = $1,
//             appointmentat = $2,
//             status = $3
//             WHERE id = $4
//             RETURNING *
//             `,[patientname, appointmentat, status, id]
//         );
//         return res.status(200).json({
//             message: "Appointment update successfully",
//             appointment: result.rows[0]
//         });

//     } catch (error) {
//         console.error("Error update appointment: ", error);
//         res.status(500).json({
//             error: "Internal Server Error"
//         });
//     }
// }

export const updateAppointment = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const existing = await pg.query(
            `
            SELECT id
            FROM appointments
            WHERE id = $1
            `,
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        const result = await pg.query(
            `
            UPDATE appointments
            SET status = $1
            WHERE id = $2
            RETURNING *
            `,
            [status, id]
        );

        return res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error update appointment: ", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}; 