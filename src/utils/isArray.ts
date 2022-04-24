function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export default isArray;
