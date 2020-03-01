import SubjectPathResolver from '../resolvers/SubjectPathResolver';
import auth from 'solid-auth-client';
import { namedNode } from '@rdfjs/data-model';

/**
 * Creates a path with the current user as a subject.
 */
export default class UserPathHandler extends SubjectPathResolver {
  handle({ settings }) {
    const subject = this.getWebId().then(namedNode);
    return this._createSubjectPath(subject, settings);
  }

  /** Gets the WebID of the logged in user */
  async getWebId() {
    const session = await auth.currentSession();
    if (!session)
      throw new Error('Cannot resolve user path: no user logged in');
    return session.webId;
  }
}
