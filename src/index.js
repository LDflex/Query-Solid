import { QueryPathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import context from './context';

const factory = new QueryPathFactory({ context });

/**
 * Starts a query path from the given subject
 */
function node(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return factory.create({ queryEngine }, { subject });
}

/**
 * Starts a query path from the currently logged in user
 */
function user() {
  const webid = {
    then: (resolve, reject) => {
      /* global solid */
      solid.auth.currentSession().then(session => {
        if (!session)
          throw new Error('Querying failed: no active user');
        return session.webId;
      }).then(resolve, reject);
    },
  };
  return node(webid);
}

const exports = {
  node,
  get user() { return user(); },
};

export default exports;
