import { useQuery } from "@tanstack/react-query";
import appointmentService from "../services/appointmenntService";
import type { IAppointment } from "../types/IAppointment";

export const useAppointments = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<IAppointment[]>({
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
