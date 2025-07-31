import express from "express";
import UserController from "../controllers/UserController";
import authentication from "../middleware/authentication";

class UserRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post(
      "/user",
      authentication("ADMIN"),
      UserController.createUser.bind(UserController)
    );
    this.router.post("/login", UserController.loginUser.bind(UserController));
    this.router.get(
      "/me",
      authentication(),
      UserController.me.bind(UserController)
    );

    this.router.get(
      "/users",
      authentication("ADMIN"),
      UserController.getAllUsers.bind(UserController)
    );

    this.router.delete(
      "/user/:id",
      authentication("ADMIN"),
      UserController.deleteUserById.bind(UserController)
    );

    this.router.put(
      "/user/:id",
      authentication("ADMIN"),
      UserController.updateUserById.bind(UserController)
    );
  }
}

export default new UserRoutes().router;
