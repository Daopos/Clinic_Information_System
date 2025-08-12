import { Repository } from "typeorm";
import { AppDataSource } from "./../config/data-source";
import { MedicineLog } from "../entities/MedicineLog";
import ImedicineLog from "../interfaces/IMedicineLog";

class MedicineLogRepo implements ImedicineLog {
  private repo: Repository<MedicineLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(MedicineLog);
  }

  public async createMedicineLog(
    data: Partial<MedicineLog>
  ): Promise<MedicineLog> {
    const medicineLog = this.repo.create(data);

    return await this.repo.save(medicineLog);
  }

  public async getAllLogs(
    page: number,
    limit: number
  ): Promise<[MedicineLog[], number]> {
    const skip = (page - 1) * limit;

    const [logs, total] = await this.repo.findAndCount({
      relations: { medicine: true, medicineStock: true },
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return [logs, total];
  }
}

export default new MedicineLogRepo();
