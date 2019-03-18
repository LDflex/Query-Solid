import { toIterablePromise } from 'ldflex';
import { defaultActivitiesPath, replaceVariables } from './util';
import { namedNode } from '@rdfjs/data-model';
import context from './context.json';
import queryTemplate from './activity.sparql';

const { as } = context['@context'];

/**
 * Handler that finds an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class FindActivityHandler {
  constructor({ activitiesPath = defaultActivitiesPath } = {}) {
    this._activitiesPath = activitiesPath;
  }

  handle(pathData, path) {
    const self = this;
    const { root } = path;
    const { user } = root;
    const { queryEngine } = pathData.settings;

    // Return an iterator over the activity paths
    return (type = `${as}Like`) => toIterablePromise(async function* () {
      // Determine the storage location
      const actor = await user;
      const document = new URL(self._activitiesPath, await user.pim$storage || actor);

      // Find activities for each object on the path
      for await (const object of path) {
        if (object.termType === 'NamedNode') {
          const query = self._findActivity({ type, actor, object });
          // Create a path for each of the query results
          for await (const binding of queryEngine.execute(query, `${document}`)) {
            const term = binding.values().next().value;
            yield root[term.value];
          }
        }
      }
    });
  }

  // Creates a Turtle snippet representing the activity
  _findActivity({ type, actor, object }) {
    return replaceVariables(queryTemplate, {
      type: namedNode(type),
      actor: namedNode(actor),
      object,
    });
  }
}
