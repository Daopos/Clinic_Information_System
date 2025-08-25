import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserRepo from "../repositories/UserRepo";
import UserService from "../services/UserService";
import { generateTokenChangePassword } from "../util/generateToken";
import { sendEmailChangePassword } from "../util/generateEmailChangePassword";

class UserExtensionController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(UserRepo);
  }

  public async sendChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email } = req.body;
    try {
      const user = await this.userService.getByEmail(email);

      const payload = {
        userId: user.id,
      };
      const token = generateTokenChangePassword(payload);

      const resetUrl = `${process.env.FRONT_URL}/reset-password?token=${token}`;

      sendEmailChangePassword(email, resetUrl);
      res.status(200).json({ message: "Successfully send", user, payload });
    } catch (err) {
      next(err);
    }
  }

  public async ChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { token, password } = req.body;

    console.log(token);
    console.log(password);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const id = (decoded as any).userId;
    console.log(id);
    try {
      await this.userService.changePassword(id, password);

      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  }
}

export default new UserExtensionController();
