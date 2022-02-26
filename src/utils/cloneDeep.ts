import isArray from "./isArray";
import isDomElement from "./isDomElement";
import isObject from "./isObject";

function clone(item: unknown): unknown {
  if (!item) {
    return item;
  } // null, undefined values check

  const types = [Number, String, Boolean];
  let result: unknown;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach((type) => {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result !== "undefined") {
    return result;
  }

  if (isArray(item)) {
    result = [];
    item.forEach((child, index) => {
      result[index] = clone(child);
    });
    return result;
  }

  if (isObject(item)) {
    // testing that this is DOM
    if (isDomElement(item)) {
      result = item.cloneNode(true);
    } else if (!item.prototype) {
      // check that this is a literal
      if (item instanceof Date) {
        result = new Date(item);
      } else {
        // it is an object literal
        result = {};
        Object.keys(item).forEach((key) => {
          result[key] = clone(item[key]);
        });
      }
    } else {
      result = item;
    }
  } else {
    result = item;
  }

  return result;
}

export default cloneDeep;
