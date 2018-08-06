import { D3DiagramViwerModule } from './d3-diagram-viwer.module';

describe('D3DiagramViwerModule', () => {
  let d3DiagramViwerModule: D3DiagramViwerModule;

  beforeEach(() => {
    d3DiagramViwerModule = new D3DiagramViwerModule();
  });

  it('should create an instance', () => {
    expect(d3DiagramViwerModule).toBeTruthy();
  });
});
