import { MedicineLog } from "./../entities/MedicineLog";
import { Medicine } from "../entities/Medicine";
import { MedicineStock } from "../entities/MedicineStock";
import IMedicine from "../interfaces/IMedicine";
import ImedicineLog from "../interfaces/IMedicineLog";
import { IMedicineStock } from "../interfaces/IMedicineStock";
import { ApiError } from "../middleware/errorHandler";

class MedicineLogService {
  constructor(
    private _repo: ImedicineLog,
    private _repoMedicine: IMedicine,
    private _repoStock: IMedicineStock
  ) {}

  public async createMedicineLog(
    data: Partial<MedicineLog>
  ): Promise<MedicineLog> {
    const medicine = await this._repoMedicine.findById(
      (data.medicine as Medicine).id
    );
    if (!medicine) {
      throw new ApiError("Medicine not found", 404);
    }

    const medicineStock = await this._repoStock.findById(
      (data.medicineStock as MedicineStock).id
    );
    if (!medicineStock) {
      throw new ApiError("Stock not found", 404);
    }

    try {
      const medicineLog = await this._repo.createMedicineLog(data);
      await this._repoStock.consumeStock(
        (data.medicineStock as MedicineStock).id,
        data.quantity_dispensed
      );

      return medicineLog;
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async getAllMedicineLogs(
    page: number,
    limit: number
  ): Promise<{
    data: MedicineLog[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [logs, total] = await this._repo.getAllLogs(page, limit);

    return {
      data: logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default MedicineLogService;
