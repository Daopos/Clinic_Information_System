import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../middleware/validationExeption";

export const validateDto = async (dtoClass: any, plainObject: any) => {
  const instance = plainToInstance(dtoClass, plainObject, {});

  const errors = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: false,
  });

  if (errors.length > 0) {
    const combinedMessage = errors
      .flatMap((error) => Object.values(error.constraints || {}))
      .join(", ");

    throw new ValidationException(combinedMessage);
  }

  return instance;
};

export function formatValidationErrors(
  errors: ValidationError[]
): Record<string, string> {
  const result: Record<string, string> = {};

  const extractErrors = (error: ValidationError) => {
    if (error.constraints) {
      // Get the first error message for this field
      const firstMessage = Object.values(error.constraints)[0];
      result[error.property] = firstMessage;
    }

    if (error.children && error.children.length > 0) {
      error.children.forEach(extractErrors);
    }
  };

  errors.forEach(extractErrors);
  return result;
}
