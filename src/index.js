import { PathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';
import context from './context';

const nodePaths = new PathFactory({ context });

const userPaths = new PathFactory({
  resolvers: [{
    supports: () => true,
    resolve: property => node(getWebId())[property],
  }],
});

/**
 * Starts a query path from the given subject
 */
export function node(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return nodePaths.create({ queryEngine }, { subject });
}

/**
 * Starts a query path from the currently logged in user
 */
export const user = userPaths.create();

/**
 * Gets the WebID of the logged in user.
 */
async function getWebId() {
  const session = await auth.currentSession();
  if (!session)
    throw new Error('Path expression with "user" failed: no active user');
  return session.webId;
}
