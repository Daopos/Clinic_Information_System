import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type {
  Medicine,
  MedicineForm,
  MedicineOptions,
} from "../types/IMedicine";
import type { ApiResponse } from "../types/ApiResponse";

const createMedicine = async (data: MedicineForm) => {
  try {
    const result = await AxiosClientUser.post("/medicine", data);

    return result.data.responseData as Medicine;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const getMedicines = async (): Promise<Medicine[]> => {
  try {
    const result = await AxiosClientUser.get("/medicines");

    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const deleteMedicineById = async (id: number): Promise<void> => {
  try {
    const result = await AxiosClientUser.delete(`medicine/${id}`);

    return result.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const updateMedicineById = async (
  id: number,
  data: MedicineForm
): Promise<Medicine> => {
  try {
    const response = await AxiosClientUser.put<ApiResponse<Medicine>>(
      `/medicine/${id}`,
      data
    );
    return response.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

const getMedicineOptions = async (): Promise<MedicineOptions[]> => {
  try {
    const response = await AxiosClientUser.get("/medicines/options");

    return response.data.responseData;
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
  getMedicines,
  deleteMedicineById,
  updateMedicineById,
  getMedicineOptions,
};
