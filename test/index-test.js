import data from '../src';
import auth from 'solid-auth-client';
import ComunicaEngine from 'ldflex-comunica';

describe('The @solid/ldflex module', () => {
  it('is an ES6 module with a default export', () => {
    expect(require('../src').default).toBe(data);
  });

  it('the default export itself does not identify as an ES6 module', () => {
    expect(data.__esModule).toBeUndefined();
  });

  describe('an URL path', () => {
    const url = 'https://ex.org/#this';
    beforeEach(async () => {
      await data[url].firstName;
    });

    it('executes the query', async () => {
      const { constructor, execute } = ComunicaEngine.prototype;
      expect(constructor).toHaveBeenCalledTimes(1);
      expect(constructor).toHaveBeenCalledWith(url);
      expect(execute).toHaveBeenCalledTimes(1);
      expect(execute).toHaveBeenCalledWith(urlQuery);
    });
  });

  describe('the user path', () => {
    describe('when not logged in', () => {
      it('throws an error', async () => {
        await expect(data.user.firstName).rejects
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
        await expect(constructor.mock.calls[0][0]).resolves.toBe(webId);
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
});

const urlQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#this> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;

const userQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#me> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;
