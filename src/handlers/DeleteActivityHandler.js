import ActivityHandler from './ActivityHandler';
import queryTemplate from './activity-triples.sparql';
import { replaceVariables, termToString } from '../util';

const components = ['?subject', '?predicate', '?object'];

/**
 * Handler that deletes an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class DeleteActivityHandler extends ActivityHandler {
  // Finds activity triples for deletion
  async* createResults(activity, document, queryEngine) {
    const query = replaceVariables(queryTemplate, activity);
    for await (const triple of queryEngine.execute(query, document)) {
      const terms = components.map(c => termToString(triple.get(c)));
      yield `${terms.join(' ')}.\n`;
    }
  }

  // Deletes the activity triples from the document
  async processResults(results, document, queryEngine) {
    const sparql = `DELETE {\n${results.join('')}}`;
    await queryEngine.executeUpdate(sparql, document).next();
    return [];
  }
}
