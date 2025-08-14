import { Between, Like, Repository } from "typeorm";
import { AppDataSource } from "./../config/data-source";
import { MedicineLog } from "../entities/MedicineLog";
import ImedicineLog from "../interfaces/IMedicineLog";

class MedicineLogRepo implements ImedicineLog {
  private _repo: Repository<MedicineLog>;

  constructor() {
    this._repo = AppDataSource.getRepository(MedicineLog);
  }

  public async createMedicineLog(
    data: Partial<MedicineLog>
  ): Promise<MedicineLog> {
    const medicineLog = this._repo.create(data);

    return await this._repo.save(medicineLog);
  }

  // public async getAllLogs(
  //   page: number,
  //   limit: number
  // ): Promise<[MedicineLog[], number]> {
  //   const skip = (page - 1) * limit;

  //   const [logs, total] = await this._repo.findAndCount({
  //     relations: { medicine: true, medicineStock: true },
  //     skip,
  //     take: limit,
  //     order: { createdAt: "DESC" },
  //   });

  //   return [logs, total];
  // }

  public async getAllLogs(
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    searchTerm?: string
  ): Promise<[MedicineLog[], number]> {
    const skip = (page - 1) * limit;

    // Build where conditions
    const where: any = {};

    // Date filtering
    if (startDate && endDate) {
      where.createdAt = Between(startDate, endDate);
    }

    // Search by medicine name (case-insensitive)
    if (searchTerm) {
      where.medicine = {
        med_name: Like(`%${searchTerm}%`),
      };
    }

    const [logs, total] = await this._repo.findAndCount({
      relations: { medicine: true, medicineStock: true, pharmacist: true },
      where,
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return [logs, total];
  }
}

export default new MedicineLogRepo();
