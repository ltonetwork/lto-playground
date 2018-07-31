import { FormStepModule } from './form-step.module';

describe('FormStepModule', () => {
  let formStepModule: FormStepModule;

  beforeEach(() => {
    formStepModule = new FormStepModule();
  });

  it('should create an instance', () => {
    expect(formStepModule).toBeTruthy();
  });
});
