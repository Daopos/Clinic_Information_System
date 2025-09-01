import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type {
  EditEquipmentForm,
  Equipment,
  EquipmentForm,
  UpdateQuantity,
} from "../types/IEquipment";

const getAllEquipments = async (): Promise<Equipment[]> => {
  try {
    const result = await AxiosClientUser.get("/equipments");
    return result.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const createEquipment = async (data: EquipmentForm): Promise<void> => {
  try {
    await AxiosClientUser.post("/equipment", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const editEquipment = async (
  id: number,
  data: EditEquipmentForm
): Promise<void> => {
  try {
    await AxiosClientUser.put(`/equipment/${id}`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const addEquipment = async (
  id: number,
  data: UpdateQuantity
): Promise<void> => {
  try {
    await AxiosClientUser.put(`/equipment/add/${id}`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

const reduceEquipment = async (
  id: number,
  data: UpdateQuantity
): Promise<void> => {
  try {
    await AxiosClientUser.put(`/equipment/reduce/${id}`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred ");
  }
};

export default {
  getAllEquipments,
  createEquipment,
  editEquipment,
  addEquipment,
  reduceEquipment,
};
