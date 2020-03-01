import ActivityHandler from './ActivityHandler';
import queryTemplate from './activity.sparql';
import { replaceVariables } from '../util';

/**
 * Handler that finds an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class FindActivityHandler extends ActivityHandler {
  requireUser = false;

  // Finds all activities in the document matching the given pattern
  async* createResults(activity, document, queryEngine) {
    const query = replaceVariables(queryTemplate, activity);
    for await (const binding of queryEngine.execute(query, document))
      yield binding.values().next().value;
  }
}
