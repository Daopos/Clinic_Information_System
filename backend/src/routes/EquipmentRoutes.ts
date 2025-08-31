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

    this.router.put(
      "/equipment/:id",
      authentication(),
      EquipmentController.editEquipmentById.bind(EquipmentController)
    );

    this.router.delete(
      "/equipment/:id",
      authentication(),
      EquipmentController.deleteEquipmentById.bind(EquipmentController)
    );

    this.router.put(
      "/equipment/add/:id",
      authentication(),
      EquipmentController.incrementEquipmentById.bind(EquipmentController)
    );

    this.router.put(
      "/equipment/reduce/:id",
      authentication(),
      EquipmentController.reduceEquipmentById.bind(EquipmentController)
    );
  }
}

export default new EquipmentRoutes().router;
