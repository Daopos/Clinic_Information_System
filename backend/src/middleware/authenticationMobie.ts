import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const authenticationMobile =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      res.status(500).json({ message: "JWT secret is not configured." });
      return;
    }
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;

      (req as any).mobileId = decoded.id;

      if (
        allowedRoles.length > 0 &&
        (!(req as any).role || !allowedRoles.includes((req as any).role))
      ) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return;
      }
      next();
    } catch (err) {
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

export default authenticationMobile;
