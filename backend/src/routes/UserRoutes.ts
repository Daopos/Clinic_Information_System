import express from "express";
import UserController from "../controllers/UserController";

class UserRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.post("/user", UserController.createUser.bind(UserController));
  }
}

export default new UserRoutes().router;
