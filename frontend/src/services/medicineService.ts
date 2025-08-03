import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type { MedicineForm } from "../types/IMedicine";

const createMedicine = async (data: MedicineForm) => {
  try {
    const result = await AxiosClientUser.post("/medicine", data);

    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export default {
  createMedicine,
};
