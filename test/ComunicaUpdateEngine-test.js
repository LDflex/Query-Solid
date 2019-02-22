import ComunicaUpdateEngine from '../src/ComunicaUpdateEngine';
import auth from 'solid-auth-client';

describe('a ComunicaUpdateEngine instance', () => {
  let engine;
  beforeEach(() => (engine = new ComunicaUpdateEngine('http://example.org')));

  it('does not yet support source objects', () => {
    engine = new ComunicaUpdateEngine('http://example.org', { dummy: 'source' });
    expect(() => engine.executeUpdate('')).toThrow();
  });

  describe('Inserting a triple', () => {
    beforeEach(async () => {
      for await (const bindings of engine.executeUpdate('INSERT DATA { <> <> <> }')) {
        expect(bindings.size).toBe(1);
        expect(bindings.values().next().value.ok).toBe(true);
      }
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
      expect(engine._engine.invalidateHttpCache).toHaveBeenCalledTimes(1);
      const args = engine._engine.invalidateHttpCache.mock.calls[0];
      expect(args[0]).toEqual('https://example.org/');
    });
  });

  describe('Inserting an invalid query', () => {
    beforeEach(async () => {
      expect(engine.executeUpdate('error').next()).rejects
        .toThrow(new Error('Update query failed (123): Status'));
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
      expect(args[1].body).toEqual('error');
    });
  });
});
