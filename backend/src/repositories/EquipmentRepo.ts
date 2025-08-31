import { Repository } from "typeorm";
import { IEquipment } from "../interfaces/IEquipment";
import { Equipment } from "../entities/Equipment";
import { AppDataSource } from "../config/data-source";

class EquipmentRepo implements IEquipment {
  private _repo: Repository<Equipment>;

  constructor() {
    this._repo = AppDataSource.getRepository(Equipment);
  }

  public async findById(id: number): Promise<Equipment | null> {
    return await this._repo.findOneBy({ id });
  }

  public async create(data: Partial<Equipment>): Promise<Equipment> {
    const equipment = this._repo.create(data);
    await this._repo.save(equipment);
    return equipment;
  }

  public async getAll(): Promise<Equipment[]> {
    return await this._repo.find();
  }

  public async editById(
    id: number,
    data: Partial<Equipment>
  ): Promise<Equipment> {
    await this._repo.update(id, data);

    return await this._repo.findOneByOrFail({ id });
  }

  public async addQuantity(id: number, qty: number): Promise<void> {
    await this._repo.increment({ id: id }, "total_quantity", qty);
  }

  public async reduceQuantity(id: number, qty: number): Promise<void> {
    await this._repo.decrement({ id: id }, "total_quantity", qty);
  }

  public async deleteById(id: number): Promise<void> {
    await this._repo.delete({ id });
  }
}

export default new EquipmentRepo();
