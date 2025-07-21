import { NextFunction, Request, Response } from "express";
import UserRepo from "../repositories/UserRepo";
import UserService from "../services/UserService";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(UserRepo);
  }

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstname, email, password } = req.body;

    if (!firstname || !email || !password) {
      res.status(400).json({
        message: "firstname, email, password, and role are required.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        message: "Invalid email format.",
      });
      return;
    }
    try {
      const data = await this.userService.createUser(req.body);

      res.json({ responseData: data });
      return;
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
