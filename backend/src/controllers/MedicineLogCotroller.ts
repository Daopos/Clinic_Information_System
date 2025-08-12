import { NextFunction, Request, Response } from "express";
import MedicineLogRepo from "../repositories/MedicineLogRepo";
import MedicineLogService from "../services/MedicineLogService";
import { validateDto } from "../util/validationDto";
import { CreateMedicineLogDto } from "../Dto/MedicineLog/CreateMedicineLogDto";
import { User } from "../entities/User";
import { Medicine } from "../entities/Medicine";
import { MedicineStock } from "../entities/MedicineStock";
import MedicineRepo from "../repositories/MedicineRepo";
import StockRepo from "../repositories/StockRepo";

class MedicineLogController {
  private medecineLogService: MedicineLogService;

  constructor() {
    this.medecineLogService = new MedicineLogService(
      MedicineLogRepo,
      MedicineRepo,
      StockRepo
    );
  }

  public async createMedicineLog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = (req as any).id;

    try {
      const validatedBody = await validateDto(CreateMedicineLogDto, req.body);
      const payload = {
        ...validatedBody,
        pharmacist: { id: id } as User, // <== Needs to be an object
        medicine: { id: validatedBody.medicineId } as Medicine, // <== Also needs to be an object
        medicineStock: { id: validatedBody.medicineStockId } as MedicineStock,
        user: validatedBody.userId
          ? ({ id: validatedBody.userId } as User)
          : undefined,
      };

      const medicineLog = await this.medecineLogService.createMedicineLog(
        payload
      );

      res
        .status(201)
        .json({ message: "Successfully created", responseData: medicineLog });
    } catch (err) {
      next(err);
    }
  }

  public async getMedicineLogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const logs = await this.medecineLogService.getAllMedicineLogs(
        page,
        limit
      );

      res.status(200).json({ responseData: logs });
    } catch (err) {
      next(err);
    }
  }
}

export default new MedicineLogController();
