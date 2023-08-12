export const UpperCamelCaseToKebabCase = (Str: string) => {
  return Str.replace(/(A-Z)/g, "-$1").toLocaleLowerCase();
};

export const sumArray = (arr: number[]) => {
  let sum = 0;
  arr.forEach((n) => (sum += n));
  return sum;
};
