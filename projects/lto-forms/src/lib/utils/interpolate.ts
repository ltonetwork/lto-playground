import { DELIMETER } from '../delimeter';
/**
 * Interpolates string against context
 *
 * @param str string to interpolate (url or conditions)
 * @param ctx context of interpolation (form model)
 * @param group field to prefix relative paths like ".name" -> "data.name"
 */
export function interpolate(str: string, ctx: any, group?: string) {
  // Sometimes our "conditions" has local scope to group, it means that they look like .field_name
  // In these cases we have to replace "\s." with ".[conditions_field]"
  if (group) {
    str = str.replace(/(^\.)|(\s\.)/g, ' ' + group + '.');
  }

  // Disable tslint because we reassign evalFunction while eval our string
  // tslint:disable-next-line
  let evalFunction: any;
  let functionString = 'evalFunction = function () {';

  // Move all root properties into function context to make them visible from condition string
  for (let key of Object.keys(ctx)) {
    // Sometimes we have field name as 'function' and because 'function' is keyword
    // and we eval this this string it produces wrong results
    if (key === 'function') {
      key += DELIMETER;
    }
    functionString += 'var ' + key + ' = ctx["' + key + '"];';
  }
  functionString += 'return ' + str + ';';
  functionString += '}';
  try {
    // tslint:disable-next-line
    eval(functionString);
    return evalFunction();
  } catch (err) {
    // console.error('Unable to interpolate: ' + str, err);
    return null;
  }
}
