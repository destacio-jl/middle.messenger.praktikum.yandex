import { Indexed } from "../core/types";

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (!path || typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (typeof object !== "object") {
    return object;
  }

  const pathParts = path.split(".");
  const limit = pathParts.length - 1;
  let parent = object as Indexed;

  for (let i = 0; i < limit; i += 1) {
    const key = pathParts[i];
    if (!parent[key]) {
      parent[key] = {};
    }
    parent = parent[key] as Indexed;
  }

  parent[pathParts[limit]] = value;

  return object;
}

export default set;
