import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';

/**
 * An extension of ComunicaEngine that delegates
 * SPARQL UPDATE queries directly to the documents
 * using authenticated request.
 */
export default class ComunicaUpdateEngine extends ComunicaEngine {
  constructor(subject) {
    super(subject);
  }

  /**
   * Delegates SPARQL UPDATE queries directly to the document.
   */
  executeUpdate(sparql) {
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
}
