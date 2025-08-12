import express from "express";
import authentication from "../middleware/authentication";
import AppointmentController from "../controllers/AppointmentController";

class AppointmentRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.post(
      "/appointment",
      authentication("ADMIN", "PATIENT"), //REMOVE ADMIN
      AppointmentController.createAppointment.bind(AppointmentController)
    );
  }
}

export default new AppointmentRoutes().router;
