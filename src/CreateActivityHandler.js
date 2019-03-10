import uuid from 'uuid/v4';
import context from './context.json';
import { toIterablePromise } from 'ldflex';
import { defaultActivitiesPath, replaceVariables } from './util';
import { namedNode, literal } from '@rdfjs/data-model';
import activityTemplate from './activity.ttl';

const { as, xsd } = context['@context'];

/**
 * Handler that creates an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 * - a queryEngine property in the path settings
 */
export default class CreateActivityHandler {
  constructor({ type = `${as}Like`, activitiesPath = defaultActivitiesPath } = {}) {
    this._type = type;
    this._activitiesPath = activitiesPath;
  }

  handle({ settings }, path) {
    const self = this;
    const { root } = path;
    const { user } = root;
    const { queryEngine } = settings;

    // Return an iterator over the new activity URLs
    return () => toIterablePromise(async function* () {
      // Create an activity for each object on the path
      const activities = [];
      const inserts = [];
      const type = self._type;
      const actor = await user;
      const time = new Date().toISOString();
      for await (const object of path) {
        if (typeof object === 'string' || object.termType === 'NamedNode') {
          const id = `#${uuid()}`;
          const props = { id, type, actor, object, time };
          activities.push(id);
          inserts.push(self._createActivity(props));
        }
      }

      // Insert the activities into the document
      const document = new URL(self._activitiesPath, await user.pim_storage);
      const sparql = `INSERT {\n${inserts.join('')}}`;
      await queryEngine.executeUpdate(sparql, document).next();

      // Return the URLs of the new activities
      for (const id of activities)
        yield root[new URL(id, document)];
    });
  }

  // Creates a Turtle snippet representing the activity
  _createActivity({ id, type, actor, object, time }) {
    return replaceVariables(activityTemplate, {
      activity: namedNode(id),
      type: namedNode(type),
      actor: namedNode(actor),
      object: namedNode(object.value || object),
      published: literal(time, `${xsd}dateTime`),
    });
  }
}
