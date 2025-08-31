import { Equipment } from "../entities/Equipment";

export interface IEquipment {
  findById(id: number): Promise<Equipment | null>;

  create(data: Partial<Equipment>): Promise<Equipment>;

  editById(id: number, data: Partial<Equipment>): Promise<Equipment>;

  deleteById(id: number): Promise<void>;

  addQuantity(id: number, qty: number): Promise<void>;

  reduceQuantity(id: number, qty: number): Promise<void>;

  getAll(): Promise<Equipment[]>;
}
