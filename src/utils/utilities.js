import { isArray, isBoolean, isNumber, isObject, isString } from './typeChecks'

var _hasOwnProperty = Object.prototype.hasOwnProperty;

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
export function _get (obj, path, defaultValue = undefined) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

// https://github.com/blakeembrey/setvalue/blob/master/src/index.ts
export function _set(obj, path, value) {
    if (path.length === 0) {
        return undefined;
    }
    var res = obj;
    var last = path[path.length - 1];
    if (path.length === 1) {
        if (isObject(res)) {
            return res[last] = value;
        }
        return undefined;
    }
    for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if (!_hasOwnProperty.call(res, key) || !isObject(res[key])) {
            res[key] = {};
        }
        res = res[key];
    }
    return res[last] = value;
}

/**
 * Deep merge two objects.
 * https://stackoverflow.com/a/34749873
 * @param target
 * @param ...sources
 */
 export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
