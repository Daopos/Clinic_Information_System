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
}

export default EquipmentService;
