import { GroupModule } from './group.module';

describe('GroupModule', () => {
  let groupModule: GroupModule;

  beforeEach(() => {
    groupModule = new GroupModule();
  });

  it('should create an instance', () => {
    expect(groupModule).toBeTruthy();
  });
});
