import { Equipment } from "../entities/Equipment";
import { IEquipment } from "../interfaces/IEquipment";
import { ApiError } from "../middleware/errorHandler";

class EquipmentService {
  constructor(private _repoEquipment: IEquipment) {}

  public async createEquipment(data: Partial<Equipment>): Promise<Equipment> {
    try {
      const equipment = await this._repoEquipment.create(data);
      return equipment;
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async getAllEquipments(): Promise<Equipment[]> {
    return await this._repoEquipment.getAll();
  }

  public async editEquipmentById(
    id: number,
    data: Partial<Equipment>
  ): Promise<Equipment> {
    const equipment = await this._repoEquipment.findById(id);

    if (!equipment) {
      throw new ApiError("Equipment not found", 404);
    }

    try {
      return await this._repoEquipment.editById(id, data);
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async incrementEquipmentById(id: number, qty: number): Promise<void> {
    const equipment = await this._repoEquipment.findById(id);

    if (!equipment) {
      throw new ApiError("Equipment not found", 404);
    }

    if (qty < 1) {
      throw new ApiError("Quantity must be greater than 0", 400);
    }

    try {
      await this._repoEquipment.addQuantity(id, qty);
    } catch (err) {
      throw new ApiError("Failed to increment quantity", 500);
    }
  }

  public async reduceEquipmentById(id: number, qty: number): Promise<void> {
    const equipment = await this._repoEquipment.findById(id);

    if (!equipment) {
      throw new ApiError("Equipment not found", 404);
    }

    if (qty < 1) {
      throw new ApiError("Quantity must be greater than 0", 400);
    }

    if (qty > equipment.total_quantity) {
      throw new ApiError(
        "Quantity must be less than or equal to the available stock",
        400
      );
    }

    await this._repoEquipment.reduceQuantity(id, qty);
  }

  public async deleteEquipmentById(id: number): Promise<void> {
    const equipment = await this._repoEquipment.findById(id);

    if (!equipment) {
      throw new ApiError("Equipment not found", 404);
    }

    await this._repoEquipment.deleteById(id);
  }
}

export default EquipmentService;
