import isArrayOrObject from "./isObjectOrArray";

function queryStringify(data: StringIndexed, prefix = ""): string | never {
  if (!isArrayOrObject(data)) {
    throw new Error("input must be an object");
  }

  const result = Object.entries(data).reduce((query, [key, value]) => {
    let currentResult = "";
    if (isArrayOrObject(value)) {
      currentResult = queryStringify(
        value as StringIndexed,
        prefix ? `${prefix}[${key}]` : `${prefix}${key}`
      );
    } else {
      currentResult = prefix
        ? `${prefix}[${key}]=${String(value)}`
        : `${prefix}${key}=${String(value)}`;
    }

    return query.length === 0
      ? `${query}${currentResult}`
      : `${query}&${currentResult}`;
  }, "?");
  return result;
}

export default queryStringify;
