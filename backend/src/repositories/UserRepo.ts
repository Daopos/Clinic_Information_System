import { Repository } from "typeorm";
import { User } from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../config/data-source";

class UserRepo implements IUser {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  public async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return await this.repo.save(user);
  }

  public async update(id: number, data: Partial<User>): Promise<User> {
    await this.repo.update(id, data);
    return await this.repo.findOneByOrFail({ id });
  }

  public async findById(id: number): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  public async deleteById(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOneBy({ email });
  }

  public async getUsers(): Promise<Partial<User>[]> {
    return await this.repo
      .createQueryBuilder("users")
      .select([
        "user.id",
        "user.firstname",
        "user.middlename",
        "user.lastname",
        "user.email",
        "user.role",
      ])
      .from(User, "user")
      .where("user.role NOT IN (:...roles)", { roles: ["ADMIN", "PATIENTS"] })
      .orderBy("user.createdAt", "DESC")
      .getMany();
  }
}

export default new UserRepo();
