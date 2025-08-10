export interface PaginatedMedicineLogs {
  data: MedicineLog[];
  total: number;
  page: number;
  totalPages: number;
}

export interface MedicineLogForm {
  dispensed_to: string;
  quantity_dispensed: number;
  medicineId: number;
  medicineStockId: number;
}

export interface MedicineLog {
  id: number;
  dispensed_to: string;
  quantity_dispensed: number;
  createdAt: string;
  medicine: {
    med_name: string;
    dosage: number;
    form_med: string;
  };
  medicineStock: {
    expiration: string;
  };
}
