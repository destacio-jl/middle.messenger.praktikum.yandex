import { Indexed } from "../core/types";
import isObject from "./isObject";

function merge(target: Indexed, source: Indexed): Indexed {
  if (isObject(target) && isObject(source)) {
    const keys = Object.keys(source);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
}

export default merge;
