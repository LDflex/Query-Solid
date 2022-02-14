import data from '../../../src/exports/comunica';
import auth from 'solid-auth-client';
import FindActivityHandler from '../../../src/handlers/FindActivityHandler';
import CreateActivityHandler from '../../../src/handlers/CreateActivityHandler';
import DeleteActivityHandler from '../../../src/handlers/DeleteActivityHandler';
import { namedNode } from '@rdfjs/data-model';
import ComunicaEngine from '@ldflex/comunica';

jest.mock('@ldflex/comunica');
async function* noResults() { /* empty */ }
ComunicaEngine.prototype.execute = jest.fn(noResults);

FindActivityHandler.prototype.handle = jest.fn(() => jest.fn());
CreateActivityHandler.prototype.handle = jest.fn(() => jest.fn());
DeleteActivityHandler.prototype.handle = jest.fn(() => jest.fn());

describe('The @solid/ldflex module', () => {
  it('is an ES6 module with a default export', () => {
    expect(require('../../../src/exports/comunica').default).toBe(data);
  });

  test('its default export does not identify as an ES6 module', () => {
    expect(data.__esModule).toBeUndefined();
  });

  it('exposes the original JSON-LD context', () => {
    expect(data.context).toHaveProperty('as', 'https://www.w3.org/ns/activitystreams#');
  });

  it('exposes the expanded JSON-LD context', async () => {
    expect(data.context).toHaveProperty('friend', 'foaf:knows');
    expect(await data.context).toHaveProperty('friend', 'http://xmlns.com/foaf/0.1/knows');
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

  describe('an URL path', () => {
    const url = 'https://ex.org/#this';

    it('executes the query', async () => {
      await data[url].firstName;
      const { constructor, execute } = ComunicaEngine.prototype;
      expect(constructor).toHaveBeenCalledTimes(1);
      const args = constructor.mock.calls[0];
      await expect(args[0]).resolves.toEqual(namedNode(url));
      expect(execute).toHaveBeenCalledTimes(1);
      expect(execute).toHaveBeenCalledWith(urlQuery);
    });

    it('can retrieve likes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Like';
      const { handle } = FindActivityHandler.prototype;
      await data[url].likes;
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can retrieve dislikes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Dislike';
      const { handle } = FindActivityHandler.prototype;
      await data[url].dislikes;
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can retrieve follows', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Follow';
      const { handle } = FindActivityHandler.prototype;
      await data[url].follows;
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can create likes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Like';
      const { handle } = CreateActivityHandler.prototype;
      await data[url].like();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can create dislikes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Dislike';
      const { handle } = CreateActivityHandler.prototype;
      await data[url].dislike();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can create follows', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Follow';
      const { handle } = CreateActivityHandler.prototype;
      await data[url].follow();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can delete likes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Like';
      const { handle } = DeleteActivityHandler.prototype;
      await data[url].unlike();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can delete dislikes', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Dislike';
      const { handle } = DeleteActivityHandler.prototype;
      await data[url].undislike();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });

    it('can delete follows', async () => {
      const activity = 'https://www.w3.org/ns/activitystreams#Follow';
      const { handle } = DeleteActivityHandler.prototype;
      await data[url].unfollow();
      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledTimes(1);
      expect(handle.mock.results[0].value).toHaveBeenCalledWith(activity);
    });
  });

  describe('the user path', () => {
    describe('when not logged in', () => {
      it('throws an error', async () => {
        await expect(() => data.user.firstName).rejects
          .toThrow('Cannot resolve user path: no user logged in');
      });
    });

    describe('when logged in', () => {
      const webId = 'https://ex.org/#me';
      beforeEach(async () => {
        auth.currentSession.mockReturnValue({ webId });
        await data.user.firstName;
      });

      it('executes the query', async () => {
        const { constructor, execute } = ComunicaEngine.prototype;
        expect(constructor).toHaveBeenCalledTimes(1);
        await expect(constructor.mock.calls[0][0]).resolves.toEqual(namedNode(webId));
        expect(execute).toHaveBeenCalledTimes(1);
        expect(execute).toHaveBeenCalledWith(userQuery);
      });
    });
  });

  describe('the resolve path', () => {
    it('resolves to the root when no expression is passed', () => {
      expect(data.resolve()).toBe(data);
    });
  });

  describe('the root path', () => {
    it('resolves to the root', () => {
      expect(data.user.root.root.user.root).toBe(data);
    });
  });

  describe('the clearCache path', () => {
    it('returns a function to clear the cache', () => {
      const document = {};
      data.clearCache(document);
      expect(ComunicaEngine.prototype.clearCache).toHaveBeenCalledTimes(1);
      expect(ComunicaEngine.prototype.clearCache).toHaveBeenCalledWith(document);
    });
  });
});

const urlQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#this> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;

const userQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#me> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;
