import { AmountModule } from './amount.module';

describe('AmountModule', () => {
  let amountModule: AmountModule;

  beforeEach(() => {
    amountModule = new AmountModule();
  });

  it('should create an instance', () => {
    expect(amountModule).toBeTruthy();
  });
});
