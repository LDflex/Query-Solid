import auth from 'solid-auth-client';
import { asList } from './util';

/**
 * A wrapper around a query engine
 * that uses Solid authenticated requests for updates.
 */
export default class SolidUpdateEngine {
  /**
   * Creates a wrapper around the given query engine.
   */
  constructor(sources, baseEngine) {
    // Preload source but silence errors; they will be thrown during execution
    this._source = this.getUpdateSource(sources);
    this._source.catch(() => null);
    this._engine = baseEngine;
  }

  /**
   * Creates an asynchronous iterable of results for the given SPARQL query.
   */
  async* execute(sparql, sources) {
    yield* /^\s*(?:INSERT|DELETE)/i.test(sparql) ?
      this.executeUpdate(sparql, sources) :
      this._engine.execute(sparql, sources);
  }

  /**
   * Creates an asynchronous iterable with the results of the SPARQL UPDATE query.
   */
  executeUpdate(sparql, sources) {
    let done = false;
    const next = async () => {
      if (done)
        return { done };
      done = true;

      // Send authenticated PATCH request to the document
      const source = await (sources ? this.getUpdateSource(sources) : this._source);
      const { ok, status, statusText } = await auth.fetch(source, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/sparql-update',
        },
        body: sparql,
      });
      if (!ok)
        throw new Error(`Update query failed (${status}): ${statusText}`);

      // Clear stale cached versions of the document
      await this.clearCache(source);

      // Return success
      return { value: asList({ ok }) };
    };
    return {
      next,
      return: noop, throw: noop, // required by the interface
      [Symbol.asyncIterator]() { return this; },
    };
  }

  /**
   * Parses the source(s) into the source to update.
   */
  async getUpdateSource(sources) {
    let source = await sources;

    // Transform URLs or terms into strings
    if (source instanceof URL)
      source = source.href;
    else if (source && typeof source.value === 'string')
      source = source.value;

    // Parse a string URL source
    if (typeof source === 'string') {
      if (!/^https?:\/\//.test(source))
        throw new Error('Can only update an HTTP(S) document.');
      return source.replace(/#.*/, '');
    }

    // Flatten recursive calls to this function
    if (Array.isArray(source)) {
      source = await Promise.all(source.map(s => this.getUpdateSource(s)));
      source = [].concat(...source).filter(s => !!s);
      if (source.length !== 1)
        throw new Error('Can only update a single source.');
      return source[0];
    }

    // Error on unsupported sources
    throw new Error(`Unsupported source: ${source}`);
  }

  /**
   * Removes the given document (or all, if not specified) from the cache,
   * such that fresh results are obtained next time.
   */
  clearCache(document) {
    return this._engine.clearCache(document);
  }
}

function noop() { /* empty */ }
