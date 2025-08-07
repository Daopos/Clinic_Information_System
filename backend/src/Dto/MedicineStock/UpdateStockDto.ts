import { IsNumber, IsDate, IsPositive, IsDefined } from "class-validator";
import { Type } from "class-transformer";

export class UpdateStockDto {
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  hand_in: Date;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  expiration: Date;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
