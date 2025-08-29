import { Equipment } from "../entities/Equipment";

export interface IEquipment {
  findById(id: number): Promise<Equipment | null>;

  create(data: Partial<Equipment>): Promise<Equipment>;

  getAll(): Promise<Equipment[]>;
}
