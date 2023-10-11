export const UpperCamelCaseToKebabCase = (Str: string) => {
  return Str.replace(/(A-Z)/g, "-$1").toLocaleLowerCase();
};

export const sumArray = (arr: number[]) => {
  let sum = 0;
  arr.forEach((n) => (sum += n));
  return sum;
};

export const deepClone = (obj: any, map = new WeakMap()) => {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  const constructor = obj.constructor;
  if (/^(Function|Set|Map|RegExp|Date)$/i.exec(constructor.name)) {
    return new constructor(obj);
  }
  if (map.has(obj)) return map.get(obj);
  let res: any = null;
  res = Array.isArray(obj) ? [] : {};
  map.set(obj, res);

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      res[prop] = deepClone(obj[prop], map);
    }
  }
  return res;
};
