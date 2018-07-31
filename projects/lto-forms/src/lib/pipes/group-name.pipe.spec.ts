import { GroupNamePipe } from './group-name.pipe';
import { DELIMETER } from '../delimeter';

describe('forms/pipes/group-name', () => {
  let pipe: GroupNamePipe;
  beforeEach(() => {
    pipe = new GroupNamePipe();
  });

  it('should replace empty group name with "nogroup"', () => {
    const name = pipe.transform('', 1);
    expect(name).toBe('nogroup' + DELIMETER + 1);
  });
});
