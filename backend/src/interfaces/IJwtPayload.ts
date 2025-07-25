import { UserRole } from "../entities/User";

export interface IJwtPayload {
  id: number;
  role: UserRole;
}
