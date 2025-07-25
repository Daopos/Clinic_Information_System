import express from "express";
import UserController from "../controllers/UserController";
import authentication from "../middleware/authentication";

class UserRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  public config(): void {
    this.router.post(
      "/user",
      authentication("ADMIN"),
      UserController.createUser.bind(UserController)
    );
    this.router.post("/login", UserController.loginUser.bind(UserController));
  }
}

export default new UserRoutes().router;
