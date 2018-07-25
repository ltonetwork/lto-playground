import { AppbarModule } from './appbar.module';

describe('AppbarModule', () => {
  let appbarModule: AppbarModule;

  beforeEach(() => {
    appbarModule = new AppbarModule();
  });

  it('should create an instance', () => {
    expect(appbarModule).toBeTruthy();
  });
});
