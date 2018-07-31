import { FieldNamePipe } from './field-name.pipe';
import { DELIMETER } from '../delimeter';

describe('forms/pipes/field-name', () => {
  let pipe: FieldNamePipe;
  beforeEach(() => {
    pipe = new FieldNamePipe();
  });

  it('should replace "function" with function_____', () => {
    const name = pipe.transform('function');
    expect(name).toBe('function' + DELIMETER);
  });
});
