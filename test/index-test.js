import data from '../src';

describe('The SolidQueryLDFlex module', () => {
  it('exports the user path', () => {
    expect(data.user).toBeTruthy();
  });

  it('exports URL paths', () => {
    expect(data['https://example.org/']).toBeTruthy();
  });
});
