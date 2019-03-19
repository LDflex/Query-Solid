import { toIterablePromise } from 'ldflex';
import { defaultActivitiesPath, replaceVariables, serializeTerm } from './util';
import { namedNode } from '@rdfjs/data-model';
import context from './context.json';
import queryTemplate from './activity-triples.sparql';

const { as } = context['@context'];

/**
 * Handler that deletes an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class DeleteActivityHandler {
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

      // Find activity triples for each object on the path
      const triples = [];
      for await (const object of path) {
        if (object.termType === 'NamedNode') {
          const query = self._findActivityTriples({ type, actor, object });
          for await (const binding of queryEngine.execute(query, `${document}`))
            triples.push(self._serializeTriple(binding));
        }
      }

      // Delete the activity triples from the document
      const sparql = `DELETE {\n${triples.join('\n')}\n}`;
      await queryEngine.executeUpdate(sparql, `${document}`).next();
    });
  }

  // Creates a SPARQL query for all triples of the activity
  _findActivityTriples({ type, actor, object }) {
    return replaceVariables(queryTemplate, {
      type: namedNode(type),
      actor: namedNode(actor),
      object,
    });
  }

  // Serializes a triple into a string
  _serializeTriple(components) {
    const terms = ['?subject', '?predicate', '?object']
      .map(c => serializeTerm(components.get(c)));
    return `${terms.join(' ')}.`;
  }
}
