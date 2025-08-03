import { NextFunction, Response, Request } from "express";
import MedicineRepo from "../repositories/MedicineRepo";
import MedicineService from "../services/MedicineService";

class MedicineController {
  private medicineService: MedicineService;

  constructor() {
    this.medicineService = new MedicineService(MedicineRepo);
  }

  public async createMedicine(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { med_name, form_med, stock } = req.body;

    if (!med_name || !form_med || !stock) {
      res.status(400).json({
        message: "Medicine name, form me, expiration, or stock is missing",
      });
      return;
    }

    try {
      const medicine = await this.medicineService.createMedicine(req.body);

      res.status(201).json({ message: "Successfully Created", data: medicine });
    } catch (err) {
      next(err);
    }
  }

  public async getAllMedicine(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const medicines = await this.medicineService.getAllMedicine();

      res.status(200).json({ responseData: medicines });
    } catch (err) {
      next(err);
    }
  }
}

export default new MedicineController();
