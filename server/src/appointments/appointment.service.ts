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