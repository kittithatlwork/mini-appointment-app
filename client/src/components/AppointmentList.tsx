import AppointmentCard from "./AppointmentCard";
import type { Appointment, AppointmentStatus } from "../types/appointment";
import EmptyState from "./EmptyState";

interface AppointmentListProps {
    appointments: Appointment[];
    onStatusChange: (
        id: number,
        status: AppointmentStatus
    ) => void;
    onDelete: (id: number) => void;
}

function AppointmentList( {
    appointments,
    onStatusChange,
    onDelete
}: AppointmentListProps) {
    if (appointments.length === 0){
        return <EmptyState />
    }
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
                <AppointmentCard
                key={appointment.id}
                appointment={ appointment }
                onStatusChange={ onStatusChange }
                onDelete={onDelete}
                />
            ))}
        </div>
    )
}
export default AppointmentList;