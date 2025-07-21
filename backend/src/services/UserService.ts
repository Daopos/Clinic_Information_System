import { User } from "../entities/User";
import IUser from "../interfaces/IUser";
import { ApiError } from "../middleware/errorHandler";

class UserService {
  constructor(private _repo: IUser) {}

  public async createUser(data: Partial<User>): Promise<User> {
    const checkUser = await this._repo.findByEmail(data.email!);

    if (checkUser) {
      throw new ApiError("Email is already used", 409);
    }

    try {
      const user = await this._repo.create(data);
      return user;
    } catch (err) {
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
      throw new ApiError("No User Found", 400);
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
}

export default UserService;
