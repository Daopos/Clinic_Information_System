import express from "express";
import UserController from "../controllers/UserController";
import authentication from "../middleware/authentication";
import UserExtensionController from "../controllers/UserExtensionController";

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
    // login in web
    this.router.post("/login", UserController.loginUser.bind(UserController));
    //login in mobile
    this.router.post(
      "/loginmobile",
      UserController.loginUserMobile.bind(UserController)
    );
    this.router.post("/signup", UserController.signupUser.bind(UserController));

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

    this.router.post(
      "/logout",
      authentication(),
      UserController.logOutUser.bind(UserController)
    );

    this.router.get(
      "/my-profile",
      authentication(),
      UserController.myProfileWeb.bind(UserController)
    );

    this.router.post(
      "/changeLink",
      UserExtensionController.sendChangePassword.bind(UserController)
    );

    this.router.post(
      "/change/password",
      UserExtensionController.ChangePassword.bind(UserController)
    );
  }
}

export default new UserRoutes().router;
