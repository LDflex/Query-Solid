import { PathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import auth from 'solid-auth-client';
import context from './context';

// Export the root path that resolves the first property
const rootPath = new PathFactory({
  handlers: {
    // Creates a path with the current user as subject
    user: { execute: () => createSubjectPath(getWebId()) },
    // Resolves a string expression into an LDflex path
    resolve: { execute: () => resolve },
    // Don't get mistaken for an ES6 module by loaders
    __esModule: { execute: () => undefined },
  },
  resolvers: [
    // Creates a subject path for all other properties
    { supports: () => true, resolve: createSubjectPath },
  ],
}).create();
export default rootPath;

// Resolve properties against the Solid JSON-LD context
const subjectPaths = new PathFactory({ context });

/** Starts an LDflex path from the given subject */
function createSubjectPath(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return subjectPaths.create({ queryEngine }, { subject });
}

/* Resolves the string expression to its corresponding LDflex path */
function resolve(expression, data = rootPath) {
  // An expression starts with a property access in dot or bracket notation
  const propertyPath = expression
    // Add the starting dot if omitted
    .replace(/^(?=[a-z$_])/i, '.')
    // Add quotes inside of brackets if omitted
    .replace(/\[([^'"`\](]*)\]/g, '["$1"]');

  // Create a function to evaluate the expression
  const body = `"use strict";return solid.data${propertyPath}`;
  let evaluator;
  try {
    /* eslint no-new-func: off */
    evaluator = Function('solid', body);
  }
  catch ({ message }) {
    throw new Error(`Expression "${expression}" is invalid: ${message}`);
  }

  // Evaluate the function
  return evaluator({ data });
}

/** Gets the WebID of the logged in user */
async function getWebId() {
  const session = await auth.currentSession();
  if (!session)
    throw new Error('LDflex "user" expression failed: not logged in');
  return session.webId;
}
