import {
  IsNumber,
  IsPositive,
  IsDefined,
  IsOptional,
  IsString,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateMedicineLogDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  dispensed_to: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity_dispensed: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  medicineId: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  medicineStockId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId?: number;
}
