import { useState } from "react";
import type { Appointment, AppointmentStatus } from "../types/appointment";
import { createAppointment } from "../service/appointmentApi";

interface AppointmentFormProps {
    onCancel: () => void;
    onSuccess: (appointment: Appointment) => void;
}

function AppointmentForm({
    onCancel,
    onSuccess
}: AppointmentFormProps) {

    const [patientName, setPatientName] = useState("");
    const [appointmentAt, setappointmentAt] = useState("");
    const [status, setStatus] = useState<AppointmentStatus>("pending");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!patientName.trim()){
            setError("Patient name is required.");
            return;
        }
        if (!appointmentAt){
            setError("Appointment date and time is required.");
            return;
        }
        if (new Date(appointmentAt) <= new Date()) {
            setError("Appointment time must be in the future.");
            return;
        }

        try {
            const appointment = await createAppointment(
                patientName,
                appointmentAt,
                status
            );
            console.log("Appointment created");
            setSuccess("Appointment created successfully.")
            onSuccess(appointment);
        }
        catch (e) {
            setError(
                e instanceof Error ?
                e.message : "Failed to create appointment"
            )
        }
        console.log({
            patientName,
            appointmentAt,
            status
        })
    }
    return (
        <form className="space-y-5" onSubmit={ handleSubmit }>
            {
                success && (
                    <div className=" rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )
            }
            {
                error && (
                    <div className=" rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )
            }
            <div>
                <label
                    htmlFor="patientName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Patient Name
                </label>

                <input
                    id="patientName"
                    type="text"
                    value={ patientName }
                    onChange={ (e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <div>
                <label
                    htmlFor="appointmentAt"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Appointment Date & Time
                </label>

                <input
                    id="appointmentAt"
                    type="datetime-local"
                    value={ appointmentAt }
                    onChange={ (e) => setappointmentAt(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <div>
                <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Status
                </label>

                <select
                    id="status"
                    value={ status }
                    onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Create Appointment
                </button>

            </div>

        </form>
    );
}

export default AppointmentForm;