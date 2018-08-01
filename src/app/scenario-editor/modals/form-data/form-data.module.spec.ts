import { FormDataModule } from './form-data.module';

describe('FormDataModule', () => {
  let formDataModule: FormDataModule;

  beforeEach(() => {
    formDataModule = new FormDataModule();
  });

  it('should create an instance', () => {
    expect(formDataModule).toBeTruthy();
  });
});
