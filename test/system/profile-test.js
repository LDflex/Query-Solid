import data from '../../src/exports/comunica.js';

jest.unmock('solid-auth-client');
import { mockHttp } from '../util';

const ruben = 'https://ruben.verborgh.org/profile/#me';

describe('System test: profile', () => {
  mockHttp();

  test('main profile fields', async () => {
    expect(await data[ruben].name).toHaveProperty('value', 'Ruben Verborgh');
    expect(await data[ruben].givenName).toHaveProperty('value', 'Ruben');
    expect(await data[ruben].familyName).toHaveProperty('value', 'Verborgh');
    expect(await data[ruben].email).toHaveProperty('value', 'mailto:ruben.verborgh@ugent.be');
  });

  test('friend URLs', async () => {
    const friends = [];
    for await (const friend of data[ruben].friends)
      friends.push(`${friend}`);
    expect(friends.length).toBeGreaterThan(100);
    expect(friends).toContain('https://www.w3.org/People/Berners-Lee/card#i');
    expect(friends).toContain('https://www.rubensworks.net/#me');
    expect(friends).toContain('https://data.verborgh.org/people/joachim_van_herwegen');
  });

  test('friend names', async () => {
    const friends = [];
    for await (const friend of data[ruben].friends.givenName)
      friends.push(`${friend}`);
    expect(friends.length).toBeGreaterThan(100);
    expect(friends).toContain('Tim');
    expect(friends).toContain('Ruben');
    expect(friends).toContain('Joachim');
  });

  test('friend names with separate expressions', async () => {
    const friends = [];
    for await (const friend of data[ruben].friends)
      friends.push(`${await friend.givenName}`);
    expect(friends.length).toBeGreaterThan(100);
    expect(friends).toContain('Tim');
    expect(friends).toContain('Ruben');
    expect(friends).toContain('Joachim');
  });
});
