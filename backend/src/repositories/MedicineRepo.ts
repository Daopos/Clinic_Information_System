import { Repository } from "typeorm";
import IMedicine from "../interfaces/IMedicine";
import { Medicine } from "../entities/Medicine";
import { AppDataSource } from "../config/data-source";

class MedicineRepo implements IMedicine {
  private repo: Repository<Medicine>;

  constructor() {
    this.repo = AppDataSource.getRepository(Medicine);
  }

  public async create(data: Partial<Medicine>): Promise<Medicine> {
    const medicine = this.repo.create(data);

    return await this.repo.save(medicine);
  }

  public async findById(id: number): Promise<Partial<Medicine> | null> {
    return await this.repo.findOneBy({ id });
  }

  public async getAll(): Promise<Medicine[]> {
    return await this.repo.find();
  }
}

export default new MedicineRepo();
