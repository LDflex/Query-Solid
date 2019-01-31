import auth from 'solid-auth-client';
import uuid from 'uuid/v4';
import context from './context.json';
import { toIterablePromise } from 'ldflex';
import activityTemplate from './activity.ttl';

const { as, xsd } = context['@context'];

/**
 * Handler that creates an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 */
export default class CreateActivityHandler {
  constructor({ type = `${as}#Like`, path = '/public/activities' } = {}) {
    this._type = type;
    this._path = path;
  }

  handle(path, proxy) {
    const self = this;
    const root = proxy.root;
    const user = root.user;

    // Return an iterator over the new activity URLs
    return () => toIterablePromise(async function* () {
      // Create an activity for each object on the path
      const activities = [];
      const inserts = [];
      const type = self._type;
      const actor = await user;
      const time = new Date().toISOString();
      for await (const object of proxy) {
        if (typeof object === 'string' || object.termType === 'NamedNode') {
          const id = `#${uuid()}`;
          const props = { id, type, actor, object, time };
          activities.push(id);
          inserts.push(self._createActivity(props));
        }
      }

      // Send the activity as a patch
      const location = new URL(self._path, await user.pim_storage);
      await self._sendPatch(location, { insert: inserts.join('') });

      // Return the URLs of the new activities
      for (const id of activities)
        yield root[new URL(id, location)];
    });
  }

  // Creates a Turtle snippet representing the activity
  _createActivity({ id, type, actor, object, time }) {
    return activityTemplate
      .replace(/_:activity/, `<${id}>`)
      .replace(/_:type/, `<${type}>`)
      .replace(/_:actor/g, `<${actor}>`)
      .replace(/_:object/g, `<${object}>`)
      .replace(/_:published/g, `"${time}"^^<${xsd}dateTime>`);
  }

  // Sends a PATCH request to create the activity
  _sendPatch(resource, { insert }) {
    const patch = `INSERT {\n${insert}\n}`;
    return auth.fetch(resource, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/sparql-update',
      },
      body: patch,
    });
  }
}
