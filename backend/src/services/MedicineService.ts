import { Medicine } from "../entities/Medicine";
import IMedicine from "../interfaces/IMedicine";
import { ApiError } from "../middleware/errorHandler";

class MedicineService {
  constructor(private _repo: IMedicine) {}

  public async createMedicine(data: Partial<Medicine>): Promise<Medicine> {
    try {
      const medicine = await this._repo.create(data);
      return medicine;
    } catch (err) {
      throw new ApiError(err);
    }
  }
  public async findMedicineById(id: number): Promise<Partial<Medicine>> {
    const medicine = await this._repo.findById(id);

    if (!medicine) {
      throw new ApiError("No Medicine Found", 404);
    }

    return medicine;
  }

  public async getAllMedicine(): Promise<Medicine[]> {
    const medicines = await this._repo.getAll();

    return medicines;
  }

  public async deleteMedicineById(id: number): Promise<void> {
    const medicine = await this._repo.findById(id);

    if (!medicine) {
      throw new ApiError("No medicine Found", 404);
    }

    await this._repo.deleteById(id);
  }

  public async updateMedicineById(
    id: number,
    data: Partial<Medicine>
  ): Promise<Medicine> {
    const medicine = await this._repo.findById(id);

    if (!medicine) {
      throw new ApiError("No medicine Found", 404);
    }

    try {
      return await this._repo.updateById(id, data);
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async getMedicineOptions(): Promise<Partial<Medicine[]>> {
    try {
      return await this._repo.getMedicineOptions();
    } catch (err) {
      throw new ApiError(err);
    }
  }
}

export default MedicineService;
