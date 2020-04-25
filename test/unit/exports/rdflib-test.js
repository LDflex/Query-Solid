import data from '../../../src/exports/rdflib';
jest.mock('@ldflex/rdflib');

describe('The rdflib module', () => {
  it('is an ES6 module with a default export', () => {
    expect(require('../../../src/exports/rdflib').default).toBe(data);
  });

  test('its default export does not identify as an ES6 module', () => {
    expect(data.__esModule).toBeUndefined();
  });

  it('allows extending the JSON-LD context', async () => {
    const before = await data['https://foo.bar/#me']['ex:test'].sparql;
    expect(before).toContain('<ex:test>');

    await data.context.extend({
      ex: 'https://example.org/foo#',
    });

    const after = await data['https://foo.bar/#me']['ex:test'].sparql;
    expect(after).not.toContain('<ex:test>');
    expect(after).toContain('https://example.org/foo#test');
  });
});
