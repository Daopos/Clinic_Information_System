import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type { IAppointment, AppointmentForm } from "../types/IAppointment";

const getAppointments = async (): Promise<IAppointment[]> => {
  const response = await AxiosClientUser.get("/appointments");

  return response.data.responseData;
};

const approveAppoitnments = async (data: AppointmentForm): Promise<void> => {
  try {
    await AxiosClientUser.post(`/appointment/approve/${data.id}`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

export default { getAppointments, approveAppoitnments };
