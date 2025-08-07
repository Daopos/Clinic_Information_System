export const transformDate = (d: string) => {
  const customDate = new Date(d);
  return `${(customDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${customDate
    .getDate()
    .toString()
    .padStart(2, "0")}-${customDate.getFullYear()}`;
};
