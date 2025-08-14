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
    return await this.repo
      .createQueryBuilder("m")
      .leftJoin("m.stocks", "s")
      .select([
        "m.id AS id",
        "m.med_name AS med_name",
        "m.dosage AS dosage",
        "m.form_med AS form_med",
        "m.createdAt AS createdAt",
        "m.updatedAt AS updatedAt",
      ])
      .addSelect("COALESCE(SUM(s.quantity), 0)", "totalQuantity")
      .groupBy("m.id")
      .orderBy("m.createdAt", "DESC")
      .getRawMany();
  }

  public async deleteById(id: number): Promise<void> {
    await this.repo.delete({ id });
  }

  public async updateById(
    id: number,
    data: Partial<Medicine>
  ): Promise<Medicine> {
    await this.repo.update(id, data);

    return await this.repo.findOneByOrFail({ id });
  }

  public async getMedicineOptions(): Promise<Partial<Medicine[]>> {
    return await this.repo.find({
      select: ["id", "med_name"],
    });
  }
}

export default new MedicineRepo();
