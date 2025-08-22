import { useQuery } from "@tanstack/react-query";
import appointmentService from "../services/appointmenntService";
import type { Appointment } from "../types/IAppointment";

export const useAppointments = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: appointmentService.getAppointments,
  });

  return {
    appointments,
    isLoading,
    isError,
    error,

    refetch,
  };
};
