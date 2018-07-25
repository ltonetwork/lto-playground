import { JsonEditorModule } from './json-editor.module';

describe('JsonEditorModule', () => {
  let jsonEditorModule: JsonEditorModule;

  beforeEach(() => {
    jsonEditorModule = new JsonEditorModule();
  });

  it('should create an instance', () => {
    expect(jsonEditorModule).toBeTruthy();
  });
});
