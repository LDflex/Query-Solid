import { QueryPath, QueryPathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';
import context from './context';

const factory = new QueryPathFactory({ context });

/**
 * Starts a query path from the given subject
 */
export function node(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return factory.create({ queryEngine }, { subject });
}

/**
 * Starts a query path from the currently logged in user
 */
export const user = new QueryPath({
  resolvers: [{
    supports() { return true; },
    resolve(path, property) {
      // Obtain the user's WebID
      const webId = auth.currentSession().then(session => {
        if (!session)
          throw new Error('Path expression with "user" failed: no active user');
        return session.webId;
      });
      // Start a new path from the user
      return node(webId)[property];
    },
  }],
});
