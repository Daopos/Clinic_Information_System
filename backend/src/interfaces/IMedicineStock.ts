import { ReadStockWithoutUserDto } from "../Dto/MedicineStock/ReadStockDto";
import { MedicineStock } from "../entities/MedicineStock";

export interface IMedicineStock {
  create(data: Partial<MedicineStock>): Promise<MedicineStock>;
  getAll(): Promise<ReadStockWithoutUserDto[]>;
  findByIdWithMedicine(id: number): Promise<ReadStockWithoutUserDto | null>;
}
