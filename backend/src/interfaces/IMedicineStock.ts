import { ReadStockWithoutUserDto } from "../Dto/MedicineStock/ReadStockDto";
import { MedicineStock } from "../entities/MedicineStock";

export interface IMedicineStock {
  create(data: Partial<MedicineStock>): Promise<MedicineStock>;
  getAll(): Promise<ReadStockWithoutUserDto[]>;
  findByIdWithMedicine(id: number): Promise<ReadStockWithoutUserDto | null>;
  findById(id: number): Promise<Partial<MedicineStock> | null>;
  updateById(id: number, data: Partial<MedicineStock>): Promise<MedicineStock>;
  deleteById(id: number): Promise<void>;

  consumeStock(stockId: number, qty: number): Promise<void>;
}
