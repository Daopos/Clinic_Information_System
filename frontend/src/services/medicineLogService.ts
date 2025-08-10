import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type { MedicineLog, MedicineLogForm } from "../types/IMedicineLog";

const createMedicineLog = async (
  data: MedicineLogForm
): Promise<MedicineLog> => {
  try {
    const result = await AxiosClientUser.post(
      "http://localhost:3000/api/v1/medicinelog",
      data
    );

    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

export default {
  createMedicineLog,
};
