import { Request, Response, NextFunction } from "express";
import StockRepo from "../repositories/StockRepo";
import StockService from "../services/StockService";
import { validateDto } from "../util/validationDto";
import { CreateStockDto } from "../Dto/MedicineStock/CreateStockDto";
import { User } from "../entities/User";
import { Medicine } from "../entities/Medicine";
import MedicineRepo from "../repositories/MedicineRepo";
import UserRepo from "../repositories/UserRepo";
import { UpdateStockDto } from "../Dto/MedicineStock/UpdateStockDto";

class StockController {
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService(StockRepo, MedicineRepo, UserRepo);
  }

  public async createStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = (req as any).id;
    try {
      const validatedBody = await validateDto(CreateStockDto, req.body);
      const payload = {
        ...validatedBody,
        user: { id: id } as User, // <== Needs to be an object
        medicine: { id: validatedBody.medicineId } as Medicine, // <== Also needs to be an object
      };

      const medicine = await this.stockService.createStock(payload);

      res
        .status(201)
        .json({ message: "Successfully created", responseData: medicine });
    } catch (err) {
      next(err);
    }
  }

  public async getAllStockForPharma(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicines = await this.stockService.getAllStockForPharma();

      res.status(200).json({ responseData: medicines });
    } catch (err) {
      next(err);
    }
  }

  public async updateStockById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const stockId = Number(id);
    if (!id || isNaN(stockId)) {
      res.status(400).json({ message: "Invalid or Missing Id" });
    }

    try {
      const validatedBody = await validateDto(UpdateStockDto, req.body);
      const stock = await this.stockService.updateStock(
        Number(id),
        validatedBody as Partial<Medicine>
      );

      res
        .status(200)
        .json({ message: "Successfully Updated", responseData: stock });
    } catch (err) {
      next(err);
    }
  }

  public async deleteStockById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing Id" });
      return;
    }

    try {
      await this.stockService.deleteStockById(Number(id));
      res.status(200).json({ message: "Stock Deleted Successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default new StockController();
