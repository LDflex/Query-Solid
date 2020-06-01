import data from '../../src/exports/comunica.js';
import auth from 'solid-auth-client';

jest.unmock('solid-auth-client');
import { mockHttp } from '../util';

describe('System test: PUT', () => {
  mockHttp();

  test('PUTting a Turtle document', async () => {
    // Write document
    const document = 'https://drive.verborgh.org/public/destination';
    const contents = '# Turtle document\n';
    const result = await data[document].put(contents);

    // Verify successful write
    const response = await auth.fetch(document);
    expect(await response.text()).toBe(contents);

    // Verify result
    expect(result).toHaveProperty('value', document);
    expect(result).toHaveProperty('termType', 'NamedNode');
  });
});
