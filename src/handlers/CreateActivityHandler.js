import ActivityHandler from './ActivityHandler';
import activityTemplate from './activity.ttl';
import { replaceVariables } from '../util';
import { namedNode, literal } from '@rdfjs/data-model';
import { v4 as uuidv4 } from 'uuid';
import context from '@solid/context';

const { xsd } = context['@context'];

/**
 * Handler that creates an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class CreateActivityHandler extends ActivityHandler {
  // Creates an activity for insertion in the given document
  async* createResults(activity, document) {
    const id = namedNode(new URL(`#${uuidv4()}`, document).href);
    const published = literal(new Date().toISOString(), `${xsd}dateTime`);
    activity = { id, published, ...activity };

    const insert = replaceVariables(activityTemplate, activity);
    yield { id, insert };
  }

  // Inserts the activities into the document
  async processResults(results, document, queryEngine) {
    const sparql = `INSERT {\n${results.map(r => r.insert).join('')}}`;
    await queryEngine.executeUpdate(sparql, document).next();
    return results.map(r => r.id);
  }
}
