const isEmpty = (variable: unknown): boolean => {
  if (!variable) {
    return true;
  }

  if (Array.isArray(variable) && variable.length === 0) {
    return true;
  }

  if (
    typeof variable === "object" &&
    Object.getOwnPropertyNames(variable).length === 0
  ) {
    return true;
  }

  return false;
};

export default isEmpty;
