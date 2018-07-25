import { ScenarioEditorModule } from './scenario-editor.module';

describe('ScenarioEditorModule', () => {
  let scenarioEditorModule: ScenarioEditorModule;

  beforeEach(() => {
    scenarioEditorModule = new ScenarioEditorModule();
  });

  it('should create an instance', () => {
    expect(scenarioEditorModule).toBeTruthy();
  });
});
