import { User } from "../../entities/User";
import { Medicine } from "../../entities/Medicine";
import { Expose } from "class-transformer";

export class ReadStockDto {
  @Expose()
  id: number;

  @Expose()
  medicine: Medicine;

  @Expose()
  hand_in: Date;

  @Expose()
  expiration: Date;

  @Expose()
  quantity: number;

  @Expose()
  user: User;
}

export class ReadStockWithoutUserDto {
  @Expose()
  id: number;

  @Expose()
  medicine: Medicine;

  @Expose()
  hand_in: Date;

  @Expose()
  expiration: Date;

  @Expose()
  quantity: number;
}
