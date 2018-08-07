import { ImportJsonModule } from './import-json.module';

describe('ImportJsonModule', () => {
  let importJsonModule: ImportJsonModule;

  beforeEach(() => {
    importJsonModule = new ImportJsonModule();
  });

  it('should create an instance', () => {
    expect(importJsonModule).toBeTruthy();
  });
});
