import { User } from "../entities/User";
import IUser from "../interfaces/IUser";
import { ApiError } from "../middleware/errorHandler";
import bcrypt from "bcrypt";

class UserService {
  constructor(private _repo: IUser) {}

  public async createUser(
    data: Partial<User>
  ): Promise<Omit<User, "password">> {
    const checkUser = await this._repo.findByEmail(data.email!);

    if (checkUser) {
      throw new ApiError("Email is already used", 409);
    }

    if (!data.password) {
      data.password = "123"; // fallback if password is missing
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(data.password!, salt);
      data.password = hashPassword;
      const user = await this._repo.create(data);
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      console.log(err);
      throw new ApiError(err as string, 400);
    }
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await this._repo.findById(id);

    if (!user) {
      throw new ApiError("No User Found", 400);
    }

    return user;
  }

  public async deleteUserById(id: number): Promise<void> {
    const user = await this._repo.findById(id);

    if (!user) {
      throw new ApiError("No User Found", 404);
    }

    await this._repo.deleteById(id);
  }

  public async updateUserById(id: number, data: Partial<User>): Promise<User> {
    const user = await this._repo.findById(id);

    if (!user) {
      throw new ApiError("No User Found", 400);
    }

    return this._repo.update(id, data);
  }

  public async loginUser(email: string, password: string): Promise<User> {
    const user = await this._repo.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError("Invalid email or password", 401);
    }

    return user;
  }

  public async getAllUsers(): Promise<Partial<User>[]> {
    const users = await this._repo.getUsers();

    return users;
  }
}

export default UserService;
