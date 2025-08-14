import { MedicineLog } from "../entities/MedicineLog";

export default interface ImedicineLog {
  createMedicineLog(data: Partial<MedicineLog>): Promise<MedicineLog>;

  getAllLogs(
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    searchTerm?: string
  ): Promise<[MedicineLog[], number]>;
}
