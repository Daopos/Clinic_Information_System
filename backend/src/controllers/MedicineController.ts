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
    try {
      const medicine = await this.medicineService.createMedicine(req.body);

      res.json({ message: "Successfully Created", data: medicine });
    } catch (err) {
      next(err);
    }
  }
}

export default new MedicineController();
