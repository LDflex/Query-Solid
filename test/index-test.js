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
          .toThrow(/not logged in/);
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
    const baz = {};
    const bar = { baz };
    const foo = { bar };
    const root = { foo };
    global.globalVar = 'foo';

    it('resolves dot-based property access without dot', () => {
      expect(data.resolve('foo.bar.baz', root)).toBe(baz);
    });

    it('resolves dot-based property access with dot', () => {
      expect(data.resolve('.foo.bar.baz', root)).toBe(baz);
    });

    it('resolves brace-based property access with double quotes', () => {
      expect(data.resolve('["foo"].bar.baz', root)).toBe(baz);
    });

    it('resolves brace-based property access with single quotes', () => {
      expect(data.resolve("['foo'].bar.baz", root)).toBe(baz);
    });

    it('resolves brace-based property access with backticks', () => {
      expect(data.resolve('[`foo`].bar.baz', root)).toBe(baz);
    });

    it('resolves brace-based property access without quotes', () => {
      expect(data.resolve('[foo].bar.baz', root)).toBe(baz);
    });

    it('resolves multiple brace-based property accesses without quotes', () => {
      expect(data.resolve('[foo][bar][baz]', root)).toBe(baz);
    });

    it('resolves parentheses in brace-based property access', () => {
      expect(data.resolve('[("foo")].bar.baz', root)).toBe(baz);
      expect(data.resolve('[(globalVar)].bar.baz', root)).toBe(baz);
    });

    it('errors on invalid expressions', () => {
      expect(() => data.resolve('..foo.bar'))
        .toThrow('Expression "..foo.bar" is invalid: Unexpected token .');
    });
  });
});

const urlQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#this> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;

const userQuery = `SELECT ?firstName WHERE {
  <https://ex.org/#me> <http://xmlns.com/foaf/0.1/givenName> ?firstName.
}`;
