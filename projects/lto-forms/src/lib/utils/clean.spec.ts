import { clean } from './clean';
import { DELIMETER } from '../delimeter';

describe('forms/utils/clean', () => {
  it('should merge "nogroup" object properties into result', () => {
    const result: any = clean({
      nogroup: {
        field_1: 'foo',
        field_2: 'bar'
      }
    });

    expect(result['field_1']).toBe('foo');
    expect(result['field_2']).toBe('bar');
  });

  it('should not mutate input object', () => {
    const source = {
      nogroup: {
        field_1: 'foo',
        field_2: 'bar'
      }
    };
    const result = clean(source);
    expect(source !== result);
    expect(source.nogroup).toBeDefined();
    expect(source.nogroup.field_1).toBe('foo');
  });

  it('should gather multiple groupnames with sufix ___[number] into one', () => {
    const source: any = {};
    source['data' + DELIMETER + '1'] = { field_1: 'foo' };
    source['data' + DELIMETER + '2'] = { field_2: 'bar' };
    const result: any = clean(source);

    expect(result['data']).toBeDefined();
    expect(result['data']['field_1']).toBe('foo');
    expect(result['data']['field_2']).toBe('bar');
  });
});
