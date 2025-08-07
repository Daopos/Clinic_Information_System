import { plainToInstance } from "class-transformer";
import { ReadStockWithoutUserDto } from "../Dto/MedicineStock/ReadStockDto";
import { IMedicineStock } from "./../interfaces/IMedicineStock";
import { MedicineStock } from "../entities/MedicineStock";
import IMedicine from "../interfaces/IMedicine";
import IUser from "../interfaces/IUser";
import { ApiError } from "../middleware/errorHandler";
import { Medicine } from "../entities/Medicine";
import { User } from "../entities/User";

class StockService {
  constructor(
    private readonly _repo: IMedicineStock,
    private readonly _repoMedicine: IMedicine,
    private readonly _repoUser: IUser
  ) {}

  public async createStock(
    data: Partial<MedicineStock>
  ): Promise<ReadStockWithoutUserDto> {
    const medicine = await this._repoMedicine.findById(
      (data.medicine as Medicine).id
    );
    if (!medicine) {
      throw new ApiError("Medicine not found", 404);
    }

    const user = await this._repoUser.findById((data.user as User).id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const stock = await this._repo.create(data);

    const findStock = await this._repo.findByIdWithMedicine(stock.id);

    const stockDto = plainToInstance(ReadStockWithoutUserDto, findStock);

    return stockDto;
  }

  public async getAllStockForPharma(): Promise<ReadStockWithoutUserDto[]> {
    const stocks = await this._repo.getAll();

    const stockDto = plainToInstance(ReadStockWithoutUserDto, stocks);

    return stockDto;
  }

  public async updateStock(
    id: number,
    data: Partial<MedicineStock>
  ): Promise<MedicineStock> {
    const stock = await this._repo.findById(id);

    if (!stock) {
      throw new ApiError("Stock not found", 404);
    }

    try {
      return await this._repo.updateById(id, data);
    } catch (err) {
      throw new ApiError(err);
    }
  }

  public async deleteStockById(id: number): Promise<void> {
    try {
      await this._repo.deleteById(id);
    } catch (err) {
      throw new ApiError(err);
    }
  }
}

export default StockService;
