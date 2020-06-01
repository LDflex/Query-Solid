import SolidUpdateEngine from '../../src/SolidUpdateEngine';
import auth from 'solid-auth-client';

const mockEngine = {
  execute: jest.fn(async function* asyncResults() {
    yield 'my result';
  }),
  clearCache: jest.fn(),
};

describe('a SolidUpdateEngine instance', () => {
  let engine, bindings;
  beforeEach(() => {
    engine = new SolidUpdateEngine('https://example.org/', mockEngine);
  });

  it('passes execute calls', async () => {
    const results = engine.execute('a', 'b');
    for await (const result of results)
      expect(result).toBe('my result');
    expect(mockEngine.execute).toHaveBeenCalledTimes(1);
    expect(mockEngine.execute).toHaveBeenCalledWith('a', 'b');
  });

  it('adds all required methods to the returned iterator', async () => {
    const results = engine.executeUpdate('a', 'b');
    expect(results.return()).toBe(undefined);
    expect(results.throw()).toBe(undefined);
  });

  it('passes clearCache calls', async () => {
    const result = {};
    mockEngine.clearCache.mockReturnValueOnce(result);
    expect(await engine.clearCache('a')).toBe(result);
    expect(mockEngine.clearCache).toHaveBeenCalledTimes(1);
    expect(mockEngine.clearCache).toHaveBeenCalledWith('a');
  });

  describe('executing a query to insert a triple', () => {
    beforeEach(async () => {
      bindings = [];
      for await (const binding of engine.execute('INSERT DATA { <> <> <> }'))
        bindings.push(binding);
    });

    it('issues a PATCH request', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('method', 'PATCH');
    });

    it('issues the request to the default source', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[0]).toBe('https://example.org/');
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
      expect(mockEngine.clearCache).toHaveBeenCalledTimes(1);
      expect(mockEngine.clearCache).toHaveBeenCalledWith('https://example.org/');
    });

    it('returns one OK binding', () => {
      expect(bindings).toHaveLength(1);
      expect(bindings[0].size).toBe(1);
      expect(bindings[0].values().next().value).toHaveProperty('ok', true);
    });
  });

  it('accepts a URL as source', async () => {
    const source = new URL('http://a.example/');
    await engine.execute('INSERT DATA { <> <> <> }', source).next();
    expect(auth.fetch).toHaveBeenCalledTimes(1);
    const args = auth.fetch.mock.calls[0];
    expect(args[0]).toBe('http://a.example/');
  });

  it('accepts a NamedNode as source', async () => {
    const source = { value: 'http://a.example/' };
    await engine.execute('INSERT DATA { <> <> <> }', source).next();
    expect(auth.fetch).toHaveBeenCalledTimes(1);
    const args = auth.fetch.mock.calls[0];
    expect(args[0]).toBe('http://a.example/');
  });

  test('executing an invalid query throws an error', async () => {
    await expect(engine.execute('INSERT error').next()).rejects
      .toThrow(new Error('Update query failed (123): Status'));
  });

  it('accepts a nested array as source', async () => {
    const source = [[['http://a.example/']]];
    await engine.execute('INSERT DATA { <> <> <> }', source).next();
    expect(auth.fetch).toHaveBeenCalledTimes(1);
    const args = auth.fetch.mock.calls[0];
    expect(args[0]).toBe('http://a.example/');
  });

  test('executing a query on a non-HTTP document throws an error', async () => {
    const sources = ['did://a.example/'];
    await expect(engine.execute('INSERT DATA { <> <> <> }', sources).next()).rejects
      .toThrow(new Error('Can only update an HTTP(S) document.'));
  });

  test('executing a query on multiple sources throws an error', async () => {
    const sources = ['http://a.example/', 'http://b.example/'];
    await expect(engine.execute('INSERT DATA { <> <> <> }', sources).next()).rejects
      .toThrow(new Error('Can only update a single source.'));
  });

  test('executing a query on an unsupported source throws an error', async () => {
    const source = { toString: () => 'my source' };
    await expect(engine.execute('INSERT DATA { <> <> <> }', source).next()).rejects
      .toThrow(new Error('Unsupported source: my source'));
  });
});

describe('a SolidUpdateEngine instance without a default source', () => {
  let engine;
  beforeEach(() => {
    engine = new SolidUpdateEngine(null, mockEngine);
  });

  test('executing a query without source throws an error', async () => {
    await expect(engine.execute('INSERT DATA { <> <> <> }').next()).rejects
      .toThrow(new Error('Unsupported source: null'));
  });
});
