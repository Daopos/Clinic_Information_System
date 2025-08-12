import express from "express";
import authentication from "../middleware/authentication";
import MedicineLogCotroller from "../controllers/MedicineLogCotroller";

class MedicineLogRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/medicinelog",
      authentication("ADMIN", "PHARMACIST"), //Remoe ADMIN later
      MedicineLogCotroller.createMedicineLog.bind(MedicineLogCotroller)
    );

    this.router.get(
      "/medicinelogs",
      authentication("ADMIN", "PHARMACIST"),
      MedicineLogCotroller.getMedicineLogs.bind(MedicineLogCotroller)
    );
  }
}

export default new MedicineLogRoutes().router;
