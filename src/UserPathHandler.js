import auth from 'solid-auth-client';
import SubjectPathResolver from './SubjectPathResolver';

/**
 * Creates a path with the current user as a subject.
 */
export default class UserPathHandler extends SubjectPathResolver {
  constructor(pathFactory) {
    super(pathFactory);
  }

  execute() {
    return this.resolve(this.getWebId());
  }

  /** Gets the WebID of the logged in user */
  async getWebId() {
    const session = await auth.currentSession();
    if (!session)
      throw new Error('Cannot resolve user path: no user logged in');
    return session.webId;
  }
}
