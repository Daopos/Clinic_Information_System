import express from "express";
import authentication from "../middleware/authentication";
import AppointmentController from "../controllers/AppointmentController";
import authenticationMobile from "../middleware/authenticationMobie";

class AppointmentRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.post(
      "/appointment",
      authenticationMobile("ADMIN", "PATIENTS"), //REMOVE ADMIN
      AppointmentController.createAppointment.bind(AppointmentController)
    );

    this.router.get(
      "/appointments",
      authentication("ADMIN", "DENTIST"),
      AppointmentController.getAllAppointments.bind(AppointmentController)
    );
  }
}

export default new AppointmentRoutes().router;
