import { interpolate } from './interpolate';

describe('forms/utils/interpolate', () => {
  it('should return value', () => {
    const value = interpolate('foo', { foo: 'bar' });
    expect(value).toEqual('bar');
  });

  it('should return nested values', () => {
    const value = interpolate('foo.bar', { foo: { bar: 'zed' } });
    expect(value).toEqual('zed');
  });

  it('should use "group" for properties', () => {
    const value = interpolate('.bar', { foo: { bar: 'zed' } }, 'foo');
    expect(value).toEqual('zed');
  });

  it('should eval plain JS', () => {
    const value = interpolate('1 + 1', {});
    expect(value).toBe(2);
  });

  it('should evan JS aganist properties', () => {
    const value = interpolate('a + b', { a: 2, b: 2 });
    expect(value).toBe(4);
  });

  it('should use group names in calculations', () => {
    const value = interpolate('a + .b', { a: 2, foo: { b: 2 } }, 'foo');
    expect(value).toBe(4);
  });

  it('should return "null" on error', () => {
    const value = interpolate('a + .b', {}, 'foo');
    expect(value).toBe(null);
  });
});
