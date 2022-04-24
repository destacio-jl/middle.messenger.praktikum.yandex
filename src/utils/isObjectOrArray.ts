import { Indexed } from "../core/types";
import isArray from "./isArray";
import isPlainObject from "./isPlainObject";

function isArrayOrObject(value: unknown): value is Indexed {
  return isPlainObject(value) || isArray(value);
}

export default isArrayOrObject;
