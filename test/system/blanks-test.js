import data from '../../src/exports/comunica.js';

jest.unmock('solid-auth-client');
import { mockHttp } from '../util';

const alice = 'https://drive.verborgh.org/public/2019/blanks.ttl#Alice';

describe('System test: blank nodes', () => {
  mockHttp();

  test('Alice\'s friends with one expression', async () => {
    const names = [];
    for await (const name of data[alice].friends.name)
      names.push(`${name}`);
    expect(names).toHaveLength(2);
    expect(names).toContain('Bob');
    expect(names).toContain('Carol');
  });

  test('Alice\'s friends with two expressions', async () => {
    const names = [];
    for await (const friend of data[alice].friends)
      names.push(`${await friend.name}`);
    expect(names).toHaveLength(2);
    expect(names).toContain('Bob');
    expect(names).toContain('Carol');
  });
});
