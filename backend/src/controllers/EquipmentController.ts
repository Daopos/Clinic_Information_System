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

  public async editEquipmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const equipment = await this._equipmentService.editEquipmentById(
        Number(id),
        req.body
      );

      res
        .status(200)
        .json({ message: "Successfully updated", responseData: equipment });
    } catch (err) {
      next(err);
    }
  }

  public async deleteEquipmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      await this._equipmentService.deleteEquipmentById(Number(id));

      res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      next(err);
    }
  }

  public async incrementEquipmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { total_quantity } = req.body;
    try {
      await this._equipmentService.incrementEquipmentById(
        Number(id),
        Number(total_quantity)
      );

      res.status(200).json({ message: "Added quantity" });
    } catch (err) {
      next(err);
    }
  }

  public async reduceEquipmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { total_quantity } = req.body;
    try {
      await this._equipmentService.reduceEquipmentById(
        Number(id),
        Number(total_quantity)
      );

      res.status(200).json({ message: "reduced quantity" });
    } catch (err) {
      next(err);
    }
  }
}

export default new EquipmentController();
