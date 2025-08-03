import type { MedicineStock } from "./IMedicineStock";

export interface MedicineForm {
  med_name: string;
  dosage: number;
  form_med: string;
}

export interface Medicine {
  id: number;
  med_name: string;
  dosage: number;
  form_med: string;
  stock: MedicineStock[];
  expiration: Date;
}
