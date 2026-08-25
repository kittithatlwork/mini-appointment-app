import type { Appointment, AppointmentStatus } from "../types/appointment";

interface AppointmentCardProps {
    appointment: Appointment;
    onStatusChange: (
        id:number,
        status: AppointmentStatus
    ) => void;
    onDelete: (id: number) => void;
    // patientName: string;
    // appointmentAt: string;
    // status: string;
}

function AppointmentCard({
    appointment,
    onStatusChange,
    onDelete
    // patientName,
    // appointmentAt,
    // status
}: AppointmentCardProps ){
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    {appointment.patientname}
                </h2>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    {appointment.status}
                </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="mt-3">
                    <p className="text-sm text-gray-500">
                        Appointment
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {new Date(appointment.appointmentat).toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        )}
                    </p>

                    <p className="text-sm text-gray-500">
                        {new Date(appointment.appointmentat).toLocaleTimeString(
                            "en-GB",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    onClick={() => {
                        console.log("appointment:", appointment);
                        console.log("appointment.id:", appointment.id);
                        onStatusChange(
                            appointment.id,
                            "confirmed"
                        )
                    }}
                >
                    Confirm
                </button>

                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    onClick={() =>
                        onStatusChange (
                            appointment.id,
                            "cancelled"
                        )
                    }
                >
                    Cancel
                </button>
                <button
                    onClick={() => onDelete(appointment.id)}
                    className=" rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    Delete
                </button>
            </div>

        </div>
    )
}
export default AppointmentCard;