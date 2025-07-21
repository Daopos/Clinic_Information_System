import { User } from "../entities/User";

export default interface IUser {
  create(user: Partial<User>): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  deleteById(id: number): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
