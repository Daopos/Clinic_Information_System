import express from "express";
import MedicineController from "../controllers/MedicineController";
import authentication from "../middleware/authentication";

class MedecineRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/medicine",
      authentication("ADMIN"),
      MedicineController.createMedicine.bind(MedicineController)
    );

    this.router.get(
      "/medicines",
      authentication("ADMIN"),
      MedicineController.getAllMedicine.bind(MedicineController)
    );

    this.router.delete(
      "/medicine/:id",
      authentication("ADMIN"),
      MedicineController.deleteMedicineById.bind(MedicineController)
    );

    this.router.put(
      "/medicine/:id",
      authentication("ADMIN"),
      MedicineController.updateMedicineeById.bind(MedicineController)
    );
  }
}

export default new MedecineRoutes().router;
