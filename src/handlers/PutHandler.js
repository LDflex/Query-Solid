import { toIterablePromise } from 'ldflex';
import auth from 'solid-auth-client';

/**
 * Creates a document for every result with the given contents.
 * Requires:
 * - the `root[...]` resolver
 */
export default class PutHandler {
  handle(pathData, path) {
    const { root } = path;

    // Return an iterator over the created documents
    return (body = '', contentType = 'text/turtle') =>
      toIterablePromise(async function* () {
        // Collect all unique URLs from the path
        const urls = new Set();
        for await (const result of path) {
          const match = /^https?:\/\/[^#]+/.exec(result ? result.value : '');
          if (match)
            urls.add(match[0]);
        }

        // Create and execute HTTP requests for every URL
        const requests = [...urls].map(url => auth.fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': contentType },
          body,
        }));
        await Promise.all(requests);

        // Return paths to the created documents
        for (const url of urls)
          yield root[url];
      });
  }
}
