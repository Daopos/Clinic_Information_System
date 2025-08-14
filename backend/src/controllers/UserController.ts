import { NextFunction, Request, Response } from "express";
import UserRepo from "../repositories/UserRepo";
import UserService from "../services/UserService";
import { ApiError } from "../middleware/errorHandler";
import { generateToken, generateTokenMobile } from "../util/generateToken";
import { UserRole } from "../entities/User";

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
    const { firstname, email } = req.body;

    if (!firstname || !email) {
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

      res.status(201).json({ responseData: data });
      return;
    } catch (err) {
      next(err);
    }
  }

  public async signupUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstname, email } = req.body;

    if (!firstname || !email) {
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

    const payload = {
      ...req.body,
      role: UserRole.PATIENTS,
    };

    try {
      const data = await this.userService.signupUser(payload);

      const tokenPayload = {
        id: data.id,
        role: data.role,
      };
      const token = generateTokenMobile(tokenPayload);

      res.status(201).json({ responseData: data, token: token });
      return;
    } catch (err) {
      next(err);
    }
  }

  public async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "Email and passowrd are required!" });
      throw new ApiError("email or password is missing!", 401);
    }

    try {
      const user = await this.userService.loginUser(email, password);

      const payload = {
        id: user.id,
        role: user.role,
      };
      const token = generateToken(payload);

      const data = {
        firstname: user.firstname,
        role: user.role,
      };

      res.cookie("token", token, {
        httpOnly: true, // Prevent access from JS (XSS protection)
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 1000 * 60 * 60, // Optional: 1 hour expiration
      });

      res
        .status(200)
        .json({ message: "Successfullly login", responseData: data });
    } catch (err) {
      next(err);
    }
  }

  public async loginUserMobile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "Email and passowrd are required!" });
      throw new ApiError("email or password is missing!", 401);
    }

    try {
      const user = await this.userService.loginUser(email, password);

      const payload = {
        id: user.id,
        role: user.role,
      };
      const token = generateTokenMobile(payload);

      res.status(200).json({
        message: "Successfullly login",
        token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  public async logOutUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true, // Prevent access from JS (XSS protection)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
    });

    res.status(200).json({ message: "Successfully logout" });
  }

  public async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = (req as any).id;

    try {
      const user = await this.userService.getUserById(id);

      const data = {
        firstname: user.firstname,
        role: user.role,
      };

      res.status(200).json({ responseData: data });
    } catch (err) {
      next(err);
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json({ responseData: users });
    } catch (err) {
      next(err);
    }
  }

  public async deleteUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "No Id provided" });
    }
    try {
      await this.userService.deleteUserById(Number(id));
      res.status(200).json({ message: "Successfully deleteds" });
    } catch (err) {
      next(err);
    }
  }

  public async updateUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    const { firstname, lastname, middlename, email, role } = req.body;
    const data = { firstname, lastname, middlename, email, role };

    if (!id) {
      res.status(400).json({ message: "No Id provided" });
    }

    try {
      const result = await this.userService.updateUserById(Number(id), data);
      res
        .status(200)
        .json({ message: "Successfully updated", responseData: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
