import uuid from 'uuid/v4';
import { toIterablePromise } from 'ldflex';
import { defaultActivitiesPath, replaceVariables } from './util';
import { namedNode, literal } from '@rdfjs/data-model';
import context from './context.json';
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
  constructor({ activitiesPath = defaultActivitiesPath } = {}) {
    this._activitiesPath = activitiesPath;
  }

  handle(pathData, path) {
    const self = this;
    const { root } = path;
    const { user } = root;
    const { queryEngine } = pathData.settings;

    // Return an iterator over the new activity paths
    return (type = `${as}Like`) => toIterablePromise(async function* () {
      // Determine the storage location
      const document = new URL(self._activitiesPath, await user.pim_storage);

      // Create an activity for each object on the path
      const activities = [];
      const inserts = [];
      const actor = await user;
      const time = new Date().toISOString();
      for await (const object of path) {
        if (object.termType === 'NamedNode') {
          const id = new URL(`#${uuid()}`, document).toString();
          const props = { id, type, actor, object, time };
          activities.push(id);
          inserts.push(self._createActivity(props));
        }
      }

      // Insert the activities into the document
      const sparql = `INSERT {\n${inserts.join('')}}`;
      await queryEngine.executeUpdate(sparql, document).next();

      // Return paths to the new activities
      for (const id of activities)
        yield root[id];
    });
  }

  // Creates a Turtle snippet representing the activity
  _createActivity({ id, type, actor, object, time }) {
    return replaceVariables(activityTemplate, {
      activity: namedNode(id),
      type: namedNode(type),
      actor: namedNode(actor),
      object,
      published: literal(time, `${xsd}dateTime`),
    });
  }
}
