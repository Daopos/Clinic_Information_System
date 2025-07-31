import express from "express";
import MedicineController from "../controllers/MedicineController";

class MedecineRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/medicine",
      MedicineController.createMedicine.bind(MedicineController)
    );
  }
}

export default new MedecineRoutes().router;
