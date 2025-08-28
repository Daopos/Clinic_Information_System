import { useState, useMemo } from "react";
import { useAppointments } from "../../hooks/useAppointment";
import AppRespond from "../../components/dentist/AppRespond";
import type { IAppointment, AppointmentForm } from "../../types/IAppointment";
import toast, { Toaster } from "react-hot-toast";
import appointmenntService from "../../services/appointmenntService";

// Calendar library
import { Calendar, momentLocalizer, type EventProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Appointment = () => {
  const { appointments, refetch } = useAppointments();

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentForm>({
      id: 0,
      app_date: "",
      status: "",
    });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");

  const handleModal = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (data: AppointmentForm) => {
    toast.dismiss();
    try {
      await appointmenntService.approveAppoitnments(data);
      refetch();
      handleCloseModal();
      toast.success("Successfully Changed!");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  // Custom event render (wrap text, show details)
  const EventComponent = ({
    event,
  }: EventProps<{ resource: IAppointment }>) => {
    const a: IAppointment = event.resource;
    return (
      <div className="whitespace-normal leading-snug">
        <div className="text-xs font-semibold">{a.services}</div>
        <div className="text-[11px] text-white">
          {a.patient?.firstname} ({a.status})
        </div>
      </div>
    );
  };

  // Filter appointments before rendering
  const filteredAppointments = useMemo(() => {
    if (filter === "all") return appointments;
    return appointments.filter((a) => a.status.toLowerCase() === filter);
  }, [appointments, filter]);

  // Convert to calendar events
  const events = filteredAppointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.services} - ${appointment.patient?.firstname} (${appointment.status})`,
    start: new Date(appointment.app_date),
    end: new Date(appointment.app_date),
    resource: appointment,
  }));

  // 🎨 Event colors by status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventPropGetter = (event: any) => {
    const status = event.resource?.status?.toLowerCase();
    let backgroundColor = "#6b7280"; // default gray
    if (status === "pending") backgroundColor = "#f59e0b"; // amber
    if (status === "approved") backgroundColor = "#22c55e"; // green
    if (status === "declined") backgroundColor = "#ef4444"; // red
    if (status === "completed") backgroundColor = "#3b82f6"; // blue

    return {
      style: {
        backgroundColor,
        borderColor: backgroundColor,
        color: "white",
        borderRadius: "6px",
        padding: "2px 4px",
      },
    };
  };

  return (
    <>
      <div className="space-y-4">
        {/* Filter control */}
        <div className="flex gap-2 items-center">
          <label className="font-medium">Show:</label>
          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#f59e0b" }}
            />{" "}
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#22c55e" }}
            />{" "}
            Approved
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#ef4444" }}
            />{" "}
            Declined
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#3b82f6" }}
            />{" "}
            Completed
          </span>
        </div>

        {/* Calendar */}
        <div className="h-[700px] bg-white p-2 shadow rounded">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={(event) => handleModal(event.resource)}
            popup
            dayLayoutAlgorithm="no-overlap"
            components={{
              event: EventComponent,
            }}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>

      {/* Modal */}
      <AppRespond
        openModal={openModal}
        onClose={handleCloseModal}
        initialData={selectedAppointment}
        onSubmiit={handleSubmit}
      />

      <Toaster />
    </>
  );
};

export default Appointment;
