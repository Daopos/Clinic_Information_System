import { NextFunction, Request, Response } from "express";
import EquipmentRepo from "../repositories/EquipmentRepo";
import EquipmentService from "../services/EquipmentService";

class EquipmentController {
  private readonly _equipmentService: EquipmentService;

  constructor() {
    this._equipmentService = new EquipmentService(EquipmentRepo);
  }

  public async createEquipment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = req.body;

    try {
      const equipment = await this._equipmentService.createEquipment(data);

      res.status(201).json({ responseData: equipment });
    } catch (err) {
      next(err);
    }
  }

  public async getAllEquipments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const equipments = await this._equipmentService.getAllEquipments();

      res.status(200).json({ responseData: equipments });
    } catch (err) {
      next(err);
    }
  }
}

export default new EquipmentController();
