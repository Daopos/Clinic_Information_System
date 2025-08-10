import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type {
  MedicineLog,
  MedicineLogForm,
  PaginatedMedicineLogs,
} from "../types/IMedicineLog";

const createMedicineLog = async (
  data: MedicineLogForm
): Promise<MedicineLog> => {
  try {
    const result = await AxiosClientUser.post("/medicinelog", data);

    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const getAllMedicineLogs = async (
  page = 1,
  limit = 10
): Promise<PaginatedMedicineLogs> => {
  try {
    const result = await AxiosClientUser.get(
      `/medicinelogs?page=${page}&limit=${limit}`
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
  getAllMedicineLogs,
};
