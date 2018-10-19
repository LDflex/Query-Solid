import { PathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';
import context from './context';

const paths = new PathFactory({ context });

const rootPaths = new PathFactory({
  resolvers: [{
    supports: () => true,
    resolve: subject => pathFor(subject === 'user' ? getWebId() : subject),
  }],
});

/** Exports a `user` path and paths for every URL */
export default rootPaths.create();

/** Creates a query path for the given subject */
function pathFor(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return paths.create({ queryEngine }, { subject });
}

/** Gets the WebID of the logged in user */
async function getWebId() {
  const session = await auth.currentSession();
  if (!session)
    throw new Error('LDflex "user" expression failed: not logged in');
  return session.webId;
}
