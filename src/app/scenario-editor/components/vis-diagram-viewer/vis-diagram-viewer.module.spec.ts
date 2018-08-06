import { VisDiagramViewerModule } from './vis-diagram-viewer.module';

describe('VisDiagramViewerModule', () => {
  let visDiagramViewerModule: VisDiagramViewerModule;

  beforeEach(() => {
    visDiagramViewerModule = new VisDiagramViewerModule();
  });

  it('should create an instance', () => {
    expect(visDiagramViewerModule).toBeTruthy();
  });
});
