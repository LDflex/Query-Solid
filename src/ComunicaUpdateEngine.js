import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';
import { createBindings } from './util';

/**
 * An extension of ComunicaEngine that delegates
 * SPARQL UPDATE queries directly to the documents
 * using authenticated request.
 */
export default class ComunicaUpdateEngine extends ComunicaEngine {
  /**
   * Executes a SPARQL UPDATE query on the source.
   */
  executeUpdate(sparql, source) {
    let done = false;
    const next = async () => {
      if (done)
        return { done };
      done = true;

      // Find the document to update
      const sources = await (source ? this.toComunicaSources(source) : this._sources);
      if (!sources || sources.length !== 1)
        throw new Error('Can only update a single source.');
      const [{ value: document }] = sources;
      if (!/^https?:\/\//.test(document))
        throw new Error('Can only update an HTTP(s) document.');

      // Send authenticated PATCH request to the document
      const { ok, status, statusText } = await auth.fetch(document, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/sparql-update',
        },
        body: sparql,
      });

      // Error if the server response was not ok
      if (!ok)
        throw new Error(`Update query failed (${status}): ${statusText}`);

      // Clear stale cached versions of the document
      await this.clearCache(document);

      return { value: createBindings({ ok }) };
    };
    return {
      next,
      [Symbol.asyncIterator]() { return this; },
    };
  }

  /**
   * Removes the given document (or all, if not specified) from the query engine cache,
   * such that fresh results are obtained the next time.
   */
  async clearCache(document) {
    await this._engine.invalidateHttpCache(document);
  }
}
