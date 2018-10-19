import data from '../src';

describe('The SolidQueryLDFlex module', () => {
  it('exports the user path', async () => {
    await expect(data.user).rejects.toThrow(/not logged in/);
  });

  it('exports URL paths', () => {
    expect(data['https://example.org/']).toBeTruthy();
  });
});
