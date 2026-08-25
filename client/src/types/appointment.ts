export type AppointmentStatus =
    | "pending"
    | "confirmed"
    | "cancelled";

export interface Appointment {
    id: number;
    patientname: string;
    appointmentat: string;
    status: AppointmentStatus
}