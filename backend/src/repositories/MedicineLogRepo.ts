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
}

export default new MedicineLogRepo();
