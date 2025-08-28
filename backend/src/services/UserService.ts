import { User, UserRole } from "../entities/User";
import IUser from "../interfaces/IUser";
import { ApiError } from "../middleware/errorHandler";
import bcrypt from "bcrypt";
import { sendEmailPassword } from "../util/generateEmail";
import { generatePassword } from "../util/generatePassword";

class UserService {
  constructor(private _repo: IUser) {}

  public async createUser(
    data: Partial<User>
  ): Promise<Omit<User, "password">> {
    const checkUser = await this._repo.findByEmail(data.email!);

    if (checkUser) {
      throw new ApiError("Email is already used", 409);
    }
    const rawPassword = generatePassword();

    data.password = rawPassword; // fallback if password is missing

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(data.password!, salt);
      data.password = hashPassword;
      const user = await this._repo.create(data);
      const { password, ...safeUser } = user;

      sendEmailPassword(data.email, rawPassword);

      return safeUser;
    } catch (err) {
      console.log(err);
      throw new ApiError(err as string, 400);
    }
  }

  public async signupUser(
    data: Partial<User>
  ): Promise<Omit<User, "password">> {
    const checkUser = await this._repo.findByEmail(data.email);

    if (checkUser) {
      throw new ApiError("Email is already used", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password!, salt);
    data.password = hashPassword;
    try {
      const user = await this._repo.create(data);
      const { password, ...safeUser } = user;

      return safeUser;
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
      throw new ApiError("No User Found", 404);
    }

    await this._repo.deleteById(id);
  }

  public async updateUserById(id: number, data: Partial<User>): Promise<User> {
    const user = await this._repo.findById(id);

    if (!user) {
      throw new ApiError("No User Found", 404);
    }

    return await this._repo.update(id, data);
  }

  public async loginUser(email: string, password: string): Promise<User> {
    const user = await this._repo.findByEmail(email);

    if (user.role === UserRole.PATIENTS) {
      throw new ApiError("Invalid email or password", 401);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError("Invalid email or password", 401);
    }

    return user;
  }

  public async getAllUsers(): Promise<Partial<User>[]> {
    const users = await this._repo.getUsers();

    return users;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this._repo.findByEmail(email);

    if (!user) {
      throw new ApiError("No user Found", 404);
    }

    return user;
  }

  public async changePassword(id: number, pass: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass!, salt);

    const data = {
      password: password,
    };

    await this._repo.update(id, data);
  }
}

export default UserService;
