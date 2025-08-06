import { IsString, IsNumber, Length } from "class-validator";

export class UpdaMedicineDto {
  @IsString({ message: "Medicine name must be a string" })
  @Length(1, undefined, { message: "Medicine name must be longer" })
  med_name: string;

  @IsNumber({}, { message: "Dosage must be a number" })
  dosage: number;

  @IsString({ message: "Form of medicine must be a string" })
  @Length(1, undefined, { message: "Form of medicine must be longer" })
  form_med: string;
}
