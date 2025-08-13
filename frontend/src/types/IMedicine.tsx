export interface MedicineForm {
  id?: number;
  med_name: string;
  dosage: number;
  form_med: string;
}

export interface Medicine {
  id: number;
  med_name: string;
  dosage: number;
  form_med: string;
  totalQuantity: number;
  status: string;
}

export interface MedicineOptions {
  id: number;
  med_name: string;
}
