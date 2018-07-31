import { DELIMETER } from '../delimeter';

/**
 * Because of specific of our form configuration we have to rename some fields
 * to render them properly and sometimes create several groups out of one.
 * This function takes object with modified field names and produce clean model
 * which corresponds to confuguration and can bu submitted to backend.
 * @example
 * {
 *    nogroup: {name: 'Foo'},
 *    address_____1: { postcode: '2611SB },
 *    address_____2: { city: 'Delft' }
 * }
 * will be transformed into
 * {
 *    name: 'Foo',
 *    address: {
 *       postcode: '2611SB,
 *       city: 'Delft'
 *    }
 * }
 * @param formData formData with modified keys
 */
export function clean(formData: object): object {
  // Create deep copy to prevent modification of input
  const copy = JSON.parse(JSON.stringify(formData));
  // Object to store fields which belongs to root object
  const nogroup = {};
  // We can have several nogroup
  Object.keys(copy)
    .filter(k => /nogroup/.test(k))
    .forEach(key => {
      Object.assign(nogroup, copy[key]);
      delete copy[key];
    });
  const result: any = Object.assign({}, nogroup);
  // Now we have to go through our groups and find multipart
  const delimeterRegexp = new RegExp(DELIMETER + '\\d+');
  for (const groupName of Object.keys(copy)) {
    const name = groupName.replace(delimeterRegexp, '');
    result[name] = Object.assign({}, result[name], copy[groupName]);
  }

  return result;
}
