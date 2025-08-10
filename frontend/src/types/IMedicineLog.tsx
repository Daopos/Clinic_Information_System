export interface MedicineLogForm {
  dispensed_to: string;
  quantity_dispensed: number;
  medicineId: number;
  medicineStockId: number;
}

export interface MedicineLog {
  dispensed_to: string;
  quantity_dispensed: number;
  pharmacistId: number;
}
