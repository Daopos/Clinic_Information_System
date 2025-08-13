import generator from "generate-password";

export const generatePassword = (): string => {
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  return password;
};
