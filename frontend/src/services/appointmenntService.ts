import AxiosClientUser from "../axios-client/axios-client";
import type { Appointment } from "../types/IAppointment";

const getAppointments = async (): Promise<Appointment[]> => {
  const response = await AxiosClientUser.get("/appointments");

  return response.data.responseData;
};

export default { getAppointments };
