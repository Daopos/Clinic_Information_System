import { MedicineLog } from "../entities/MedicineLog";

export default interface ImedicineLog {
  createMedicineLog(data: Partial<MedicineLog>): Promise<MedicineLog>;

  getAllLogs(page: number, limit: number): Promise<[MedicineLog[], number]>;
}
