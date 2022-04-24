function isObject(item: unknown): value is object {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
}

export default isObject;
