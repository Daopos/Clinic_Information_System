import { useState } from "react";
import { useAppointments } from "../../hooks/useAppointment";
import { transformDate, transformDateTime } from "../../utils/transformDate";
import AppRespond from "../../components/dentist/AppRespond";
import type { IAppointment, AppointmentForm } from "../../types/IAppointment";
import toast, { Toaster } from "react-hot-toast";
import appointmenntService from "../../services/appointmenntService";

const Appointment = () => {
  const { appointments } = useAppointments();

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentForm>({
      id: 0,
      app_date: "",
      status: "",
    });

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModal = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (data: AppointmentForm) => {
    toast.dismiss();

    try {
      await appointmenntService.approveAppoitnments(data);
      handleCloseModal();
      toast.success("Successfully Changed!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Appointments
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Browse and manage a complete list of medicines, including
                availability, dosage, expiration dates, and stock levels for
                your inventory.
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Appointment date
                </th>
                <th scope="col" className="px-6 py-3">
                  service
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Create
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th className="px-6 py-4 ">
                    {transformDateTime(appointment.app_date)}
                  </th>
                  <td className="px-6 py-4">{appointment.services}</td>
                  <td className="px-6 py-4">
                    {appointment.patient?.firstname}
                  </td>
                  <td className="px-6 py-4">{appointment.status}</td>
                  <td className="px-6 py-4">
                    {transformDate(appointment.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleModal(appointment)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
