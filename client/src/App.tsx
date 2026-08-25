import Header from "./components/Header";
import AppointmentList from "./components/AppointmentList";
import type { Appointment, AppointmentStatus } from "./types/appointment";
import LoadingState from "./components/LoadingState";
import { useEffect, useState } from "react";
import AppointmentModal from "./components/AppointmentModal";
import { deleteAppointment, getAppointments, updateAppointmentStatus } from "./service/appointmentApi";
function App() {

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");

  const handleCreate = () => {
    setIsModalOpen(true);
  }

  const handleAppointmentCreated = (
    appointment: Appointment
  ) => {
    setAppointments((prev) => [
      ...prev,
      appointment,
    ]);
    setLoading(false);
  }

  useEffect(() => {
    const fetchAppointments = async() => {
      try {
        setLoading(true);
        setError("");

        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        setError(
          error instanceof Error
          ? error.message
          : "Failed to load appointments"
        )
      }
      finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);


  const handleStatusChange = async(
    id: number,
    status: AppointmentStatus
  ) => {
    console.log("STATUS CHANGE ID:", id);
    console.log("STATUS CHANGE:", status);
    try {
      const updateAppointment =
        await updateAppointmentStatus(id, status);

        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
            ? updateAppointment
            : appointment
          )
        )
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async(
    id: number
  ) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this appointment?"
      );

      if (!confirmed) return;

      await deleteAppointment(id);

      setAppointments((prev) =>
            prev.filter(
                (appointment) => appointment.id !== id
            )
        );
    } catch (error) {
      console.error(error);
    }
  }
  // const appointments: Appointment[] = [
  //   {
  //     id: 1,
  //     patientName: "John Doe",
  //     appointmentAt: "25 Aug 2026, 10:00",
  //     status: "Pending"
  //   }
  // ];
  return (
    <>
      <div className="Container">
        <div className="Header">
          <Header onCreate={ handleCreate } />
        </div>
        <main className="body p-8">
          {
            loading ? (
              <LoadingState />
            ) : error ? (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-red-600">
                {error}
              </div>
            ) : (
              <>
              <AppointmentModal isOpen={ isModalOpen }
              onClose={() => setIsModalOpen(false)}
              onSuccess={ handleAppointmentCreated } />
              <AppointmentList
              appointments={ appointments }
              onStatusChange={ handleStatusChange }
              onDelete={ handleDelete }
              />
              </>
            )
          }
        </main>
      </div>
    </>
  )
}

export default App