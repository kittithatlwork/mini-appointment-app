import pg from "../db";

export const checkAppointmentOverlap = async (
    appointmentat: string,
): Promise<boolean> => {
    const result = await pg.query(
        `
        SELECT id
        FROM appointments
        WHERE appointmentat < $1::timestamptz + INTERVAL '30 minutes'
        AND appointmentat + INTERVAL '30 minutes' > $1::timestamptz
        `,
        [appointmentat]
    );
    return result.rows.length > 0;
};

export const checkAppointmentOverlapUpdate = async(
    appointmentat: string,
    id: string
): Promise <boolean> => {
    const result = await pg.query(
        `
        SELECT id
        FROM appointments
        WHERE appointmentat < $1::TIMESTAMPTZ + INTERVAL '30 minutes'
        AND appointmentat + INTERVAL '30 minutes' > $1::TIMESTAMPTZ AND id != $2
        `,[appointmentat, id]
    );
    return result.rows.length > 0;
}

export const checkPatientName =  (
    patientname: string,
): boolean => {
    return patientname.trim().length === 0;
}

export const checkAllowStatus = (
    status: string,
): boolean => {
    const ALLOWED_STATUSES = [
        "pending",
        "confirmed",
        "cancelled"
    ]
    return ALLOWED_STATUSES.includes(status);
}

export const isAppointmentInFuture = (
    appointmentat: string
): boolean => {
    return new Date(appointmentat) > new Date;
}