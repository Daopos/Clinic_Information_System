import { Request, Response, NextFunction } from "express";
import StockRepo from "../repositories/StockRepo";
import StockService from "../services/StockService";
import { validateDto } from "../util/validationDto";
import { CreateStockDto } from "../Dto/MedicineStock/CreateStockDto";
import { User } from "../entities/User";
import { Medicine } from "../entities/Medicine";
import MedicineRepo from "../repositories/MedicineRepo";
import UserRepo from "../repositories/UserRepo";

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
}

export default new StockController();
