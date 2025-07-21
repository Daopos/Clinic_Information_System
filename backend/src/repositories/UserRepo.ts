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
}

export default new UserRepo();
