import { AxiosError } from "axios";
import type { MedicineStock, MedicineStockForm } from "../types/IMedicineStock";
import AxiosClientUser from "../axios-client/axios-client";

const getMedicineStocksToPharma = async (): Promise<MedicineStock[]> => {
  try {
    const result = await AxiosClientUser.get("/stocks/pharmacist");

    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const createMedicineStock = async (
  data: MedicineStockForm
): Promise<MedicineStock> => {
  try {
    const result = await AxiosClientUser.post("/stock", data);

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
  getMedicineStocksToPharma,
  createMedicineStock,
};
