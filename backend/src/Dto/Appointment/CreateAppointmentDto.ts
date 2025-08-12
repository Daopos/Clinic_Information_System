import { IsDefined, IsString, IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateAppointmentDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  services: string;

  @Type(() => Date) // Converts incoming string to Date
  @IsDate()
  app_date: Date;
}
