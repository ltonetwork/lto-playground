import { ExpressionModule } from './expression.module';

describe('ExpressionModule', () => {
  let expressionModule: ExpressionModule;

  beforeEach(() => {
    expressionModule = new ExpressionModule();
  });

  it('should create an instance', () => {
    expect(expressionModule).toBeTruthy();
  });
});
