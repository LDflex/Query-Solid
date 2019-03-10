import ComunicaUpdateEngine from '../src/ComunicaUpdateEngine';
import auth from 'solid-auth-client';

const comunicaMock = {
  invalidateHttpCache: jest.fn(),
};

describe('a ComunicaUpdateEngine instance', () => {
  let engine, bindings;
  beforeEach(() => {
    engine = new ComunicaUpdateEngine('https://example.org/');
    engine._engine = comunicaMock;
  });

  describe('executing a query to insert a triple', () => {
    beforeEach(async () => {
      bindings = [];
      for await (const binding of engine.executeUpdate('INSERT DATA { <> <> <> }'))
        bindings.push(binding);
    });

    it('issues a PATCH request', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('method', 'PATCH');
    });

    it('sets the Content-Type to application/sparql-update', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('headers');
      expect(args[1].headers).toHaveProperty('Content-Type', 'application/sparql-update');
    });

    it('sends a patch document', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('body');
      expect(args[1].body).toEqual('INSERT DATA { <> <> <> }');
    });

    it('invalidates the document cache', () => {
      expect(comunicaMock.invalidateHttpCache).toHaveBeenCalledTimes(1);
      expect(comunicaMock.invalidateHttpCache).toHaveBeenCalledWith('https://example.org/');
    });

    it('returns one OK binding', () => {
      expect(bindings).toHaveLength(1);
      expect(bindings[0].size).toBe(1);
      expect(bindings[0].values().next().value).toHaveProperty('ok', true);
    });
  });

  test('executing an invalid query throws an error', async () => {
    expect(engine.executeUpdate('error').next()).rejects
      .toThrow(new Error('Update query failed (123): Status'));
  });

  test('executing a query on multiple sources throws an error', async () => {
    expect(engine.executeUpdate('', [1, 2]).next()).rejects
      .toThrow(new Error('Can only update a single source.'));
  });

  test('executing a query on a non-document source throws an error', async () => {
    expect(engine.executeUpdate('', {}).next()).rejects
      .toThrow(new Error('Can only update an HTTP(s) document.'));
  });
});
