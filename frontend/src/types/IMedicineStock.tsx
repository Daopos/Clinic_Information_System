import type { Medicine } from "./IMedicine";

export interface MedicineStock {
  id: number;
  expiration: string;
  quantity: number;
  hand_in: string;
  medicine: Medicine;
  status: string;
}

export interface MedicineStockForm {
  id?: number;
  expiration: string;
  quantity: number;
  hand_in: string;
  medicineId: number;
}
