import { toIterablePromise } from 'ldflex';
import { namedNode } from '@rdfjs/data-model';
import context from '@solid/context';

const { as } = context['@context'];

/**
 * Base class for handlers that manipulate activities
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class ActivityHandler {
  requireUser = true;

  constructor({ activitiesPath = '/public/activities' } = {}) {
    this.activitiesPath = activitiesPath;
  }

  handle(pathData, path) {
    const self = this;
    const { root } = path;
    const { settings: { queryEngine } } = pathData;

    // Return an iterator over the activity paths
    return (type = `${as}Like`) => toIterablePromise(async function* () {
      // Only process activities if a user is logged in
      let user;
      try {
        user = await root.user;
      }
      catch (error) {
        if (self.requireUser)
          throw error;
        return;
      }

      // Determine the storage location
      const storage = await root.user.pim$storage;
      const document = new URL(self.activitiesPath, storage || user).href;

      // Obtain results for every activity on the path
      const results = [];
      const actor = namedNode(user);
      type = namedNode(type);
      for await (const object of path) {
        if (object.termType === 'NamedNode') {
          const activity = { actor, type, object };
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
