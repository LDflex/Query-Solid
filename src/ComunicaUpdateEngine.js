import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';

/**
 * An extension of ComunicaEngine that delegates
 * SPARQL UPDATE queries directly to the documents
 * using authenticated request.
 */
export default class ComunicaUpdateEngine extends ComunicaEngine {
  /**
   * Delegates SPARQL UPDATE queries directly to the document.
   */
  executeUpdate(sparql) {
    if (this._source)
      throw new Error('Updates on non-subject sources not yet supported.');

    let executed = false;
    const next = async () => {
      if (!executed) {
        executed = true;

        // Send authenticated PATCH request to the document
        const document = this.getDocument(await this._subject);
        const response = await auth.fetch(document, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/sparql-update',
          },
          body: sparql,
        });

        // Error if the server response was not ok
        if (!response.ok)
          throw new Error(`Update query failed (${response.status}): ${response.statusText}`);

        // Clear stale cached versions of the document
        await this.clearCache(document);

        // Mock Comunica's response for bindings as a Immutable.js object.
        return { value: { size: 1, values: () => ({ next: () => ({ value: { ok: true } }) }) } };
      }
      return { done: true };
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
