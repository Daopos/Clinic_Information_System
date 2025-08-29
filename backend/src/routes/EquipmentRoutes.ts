import express from "express";
import authentication from "../middleware/authentication";
import EquipmentController from "../controllers/EquipmentController";
class EquipmentRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/equipment",
      authentication(),
      EquipmentController.createEquipment.bind(EquipmentController)
    );

    this.router.get(
      "/equipments",
      authentication(),
      EquipmentController.getAllEquipments.bind(EquipmentController)
    );
  }
}

export default new EquipmentRoutes().router;
