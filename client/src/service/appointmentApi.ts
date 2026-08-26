import type { Appointment, AppointmentStatus } from "../types/appointment";

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export const createAppointment = async (
    patientName: string,
    appointmentAt: string,
    status: Appointment["status"]
) => {
    const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            patientname: patientName ,
            appointmentat: appointmentAt ,
            status,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create appointment");
    }
    return data;
};

// export const getAppointments = async ():Promise<Appointment[]> => {
//     const response = await fetch(`${API_URL}/appointments`);
//     const data = await response.json();

//     if (!response.ok){
//         throw new Error(data.error || "Failed to fetch appointments");
//     }
//     return data;
// }

export const getAppointments = async (status?: AppointmentStatus) => {
    const url = status
        ? `${API_URL}/appointments?status=${status}`
        : `${API_URL}/appointments`;

    const response = await fetch(url);

    if (!response.ok){
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch appointments");
    }
    return response.json();
};

export const updateAppointmentStatus = async (
    id: number,
    status: AppointmentStatus,
):Promise<Appointment> => {
    const  response = await fetch(
        `${API_URL}/appointments/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
            }),
        }
    );
    const data = await response.json()
    if (!response.ok){
        throw new Error(
            data.error || "Failed to update appointment"
        );
    }
    return data;
}

export const deleteAppointment = async (
    id: number
): Promise<void> => {
    const response = await fetch(
        `${API_URL}/appointments/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.error || "Failed to delete appointment"
        );
    }
};