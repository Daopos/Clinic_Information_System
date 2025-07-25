import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/IJwtPayload";

const authentication =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // ✅ Prefer cookie first, fallback to Authorization header
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;

    try {
      const decoded = jwt.verify(token, secret!) as IJwtPayload;

      (req as any).id = decoded.id;
      (req as any).role = decoded.role;

      if (
        allowedRoles.length > 0 &&
        (!(req as any).role || !allowedRoles.includes((req as any).role))
      ) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return;
      }
      next();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name: string }).name === "TokenExpiredError"
      ) {
        res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
        return;
      }
      res.status(401).json({ message: "Invalid token." });
      return;
    }
  };

export default authentication;
