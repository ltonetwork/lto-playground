import { TextInputModule } from './text-input.module';

describe('TextInputModule', () => {
  let textInputModule: TextInputModule;

  beforeEach(() => {
    textInputModule = new TextInputModule();
  });

  it('should create an instance', () => {
    expect(textInputModule).toBeTruthy();
  });
});
