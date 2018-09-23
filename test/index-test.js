import { node, user } from '../src';

describe('The SolidQueryLDFlex module', () => {
  it('exports the node function', () => {
    expect(node).toBeInstanceOf(Function);
  });

  it('exports the user path', () => {
    expect(user).toBeTruthy();
  });
});
