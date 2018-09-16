import SolidQueryLDFlex from '../src';

describe('The SolidQueryLDFlex module', () => {
  it('exports the node function', () => {
    expect(SolidQueryLDFlex.node).toBeInstanceOf(Function);
  });
});
