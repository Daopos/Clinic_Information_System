import { Repository } from "typeorm";
import { IMedicineStock } from "../interfaces/IMedicineStock";
import { MedicineStock } from "../entities/MedicineStock";
import { AppDataSource } from "../config/data-source";
import { ReadStockWithoutUserDto } from "../Dto/MedicineStock/ReadStockDto";

class StockRepo implements IMedicineStock {
  private repo: Repository<MedicineStock>;

  constructor() {
    this.repo = AppDataSource.getRepository(MedicineStock);
  }

  public async create(data: Partial<MedicineStock>): Promise<MedicineStock> {
    const stock = this.repo.create(data);

    return await this.repo.save(stock);
  }

  public async getAll(): Promise<ReadStockWithoutUserDto[]> {
    const stocks = await this.repo.find({ relations: { medicine: true } });

    return stocks;
  }
  public async findByIdWithMedicine(
    id: number
  ): Promise<ReadStockWithoutUserDto | null> {
    const stock = await this.repo.findOne({
      where: { id: id },
      relations: { medicine: true },
    });
    return stock;
  }
}

export default new StockRepo();
