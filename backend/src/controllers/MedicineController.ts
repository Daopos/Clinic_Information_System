import { NextFunction, Response, Request } from "express";
import MedicineRepo from "../repositories/MedicineRepo";
import MedicineService from "../services/MedicineService";
import { UpdateUserDto } from "../Dto/Medicine/UpdateMedicineDto";
import { validateDto } from "../util/validationDto";
import { Medicine } from "../entities/Medicine";

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
    const { med_name, form_med } = req.body;

    if (!med_name || !form_med) {
      res.status(400).json({
        message: "Medicine name or form of medicine is missing",
      });
      return;
    }

    try {
      const medicine = await this.medicineService.createMedicine(req.body);

      res
        .status(201)
        .json({ message: "Successfully Created", responseData: medicine });
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

  public async deleteMedicineById(
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
      await this.medicineService.deleteMedicineById(Number(id));
      res.status(200).json({ message: "Medicine Deleted Successfully" });
    } catch (err) {
      next(err);
    }
  }

  public async updateMedicineeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
      res.status(400).json({ message: "Invalid or Missing Id" });
    }

    try {
      const validatedBody = await validateDto(UpdateUserDto, req.body);

      const medicine = await this.medicineService.updateMedicineById(
        Number(id),
        validatedBody as Partial<Medicine>
      );

      res
        .status(200)
        .json({ message: "Successfully Updated", responseData: medicine });
    } catch (err) {
      next(err);
    }
  }
}

export default new MedicineController();
