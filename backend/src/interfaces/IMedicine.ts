import { Medicine } from "../entities/Medicine";

export default interface IMedicine {
  getAll(): Promise<Medicine[]>;
  create(data: Partial<Medicine>): Promise<Medicine>;
  findById(id: number): Promise<Partial<Medicine> | null>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: Partial<Medicine>): Promise<Medicine>;
}
