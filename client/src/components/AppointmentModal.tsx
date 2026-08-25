import type { Appointment } from "../types/appointment";
import AppointmentForm from "./AppointmentForm";

interface AppointmentModalProps {
    isOpen: Boolean;
    onClose: () => void;
    onSuccess: (appointment: Appointment) => void;
}

function AppointmentModal({
    isOpen,
    onClose,
    onSuccess
}: AppointmentModalProps) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        New Appointment
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-6">
                    <AppointmentForm onCancel={ onClose } onSuccess={ onSuccess } />
                </div>

            </div>

        </div>
    );
}
export default AppointmentModal;