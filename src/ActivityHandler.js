import { toIterablePromise } from 'ldflex';
import { namedNode } from '@rdfjs/data-model';
import context from './context.json';

const { as } = context['@context'];

/**
 * Base class for handlers that manipulate activities
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class ActivityHandler {
  constructor({ activitiesPath = '/public/activities' } = {}) {
    this.activitiesPath = activitiesPath;
  }

  handle(pathData, path) {
    const self = this;
    const { root, root: { user } } = path;
    const { settings: { queryEngine } } = pathData;

    // Return an iterator over the activity paths
    return (type = `${as}Like`) => toIterablePromise(async function* () {
      // Determine the storage location
      const actor = namedNode(await user);
      const storage = await user.pim$storage;
      const document = new URL(self.activitiesPath, storage || actor.value).href;

      // Obtain results for every activity on the path
      const results = [];
      type = namedNode(type);
      for await (const object of path) {
        if (object.termType === 'NamedNode') {
          const activity = { type, actor, object };
          for await (const result of self.createResults(activity, document, queryEngine))
            results.push(result);
        }
      }

      // Process all results and return paths starting from the returned terms
      for (const term of await self.processResults(results, document, queryEngine))
        yield root[term.value];
    });
  }

  async processResults(results) {
    return results;
  }
}
