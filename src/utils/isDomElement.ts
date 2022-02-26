const isDomElement = (value: unknown): value is Node => {
  return value && value.nodeType && typeof value.cloneNode === "function";
};

export default isDomElement;
