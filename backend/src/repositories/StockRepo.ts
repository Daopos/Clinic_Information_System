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
    const stocks = await this.repo.find({
      relations: { medicine: true },
      order: { createdAt: "DESC" },
    });

    return stocks;
  }

  public async findByIdWithMedicine(
    id: number
  ): Promise<ReadStockWithoutUserDto | null> {
    const stock = await this.findOneWithRelations(id);
    return stock;
  }

  public async updateById(
    id: number,
    data: Partial<MedicineStock>
  ): Promise<MedicineStock> {
    await this.repo.update(id, data);
    return await this.findOneWithRelations(id);
  }

  public async findById(id: number): Promise<Partial<MedicineStock> | null> {
    return await this.repo.findOneBy({ id });
  }

  public async deleteById(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  public async consumeStock(stockId: number, qty: number): Promise<void> {
    await this.repo.decrement({ id: stockId }, "quantity", qty);
  }

  //Reuasable find Id with Rleationship
  private async findOneWithRelations(
    id: number
  ): Promise<MedicineStock | null> {
    return await this.repo.findOne({
      where: { id },
      relations: { medicine: true },
    });
  }
}

export default new StockRepo();
