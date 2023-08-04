export const UpperCamelCaseToKebabCase = (Str: string) => {
  return Str.replace(/(A-Z)/g, "-$1").toLocaleLowerCase();
};
