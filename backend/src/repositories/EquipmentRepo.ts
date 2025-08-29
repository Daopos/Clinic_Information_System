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
}

export default new EquipmentRepo();
