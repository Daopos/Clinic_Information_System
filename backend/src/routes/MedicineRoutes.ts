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
      authentication("ADMIN", "PHARMACIST"),
      MedicineController.createMedicine.bind(MedicineController)
    );

    this.router.get(
      "/medicines",
      authentication("ADMIN", "PHARMACIST"),
      MedicineController.getAllMedicine.bind(MedicineController)
    );

    this.router.delete(
      "/medicine/:id",
      authentication("ADMIN", "PHARMACIST"),
      MedicineController.deleteMedicineById.bind(MedicineController)
    );

    this.router.put(
      "/medicine/:id",
      authentication("ADMIN", "PHARMACIST"),
      MedicineController.updateMedicineeById.bind(MedicineController)
    );

    this.router.get(
      "/medicines/options",
      authentication("ADMIN", "PHARMACIST"), //Remove Admin later
      MedicineController.getMedicineOptions.bind(MedicineController)
    );
  }
}

export default new MedecineRoutes().router;
