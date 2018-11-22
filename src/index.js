import { PathFactory, StringToLDflexHandler } from 'ldflex';
import context from './context.json';
import UserPathHandler from './UserPathHandler';
import SubjectPathResolver from './SubjectPathResolver';

// Creates data paths that start from a given subject
const subjectPathFactory = new PathFactory({ context });

// Export the root path that resolves the first property access
export default new PathFactory({
  // Handlers of specific named properties
  handlers: {
    // Don't get mistaken for an ES6 module by loaders
    __esModule: () => undefined,
    // The `user` property starts a path with the current user as subject
    user: new UserPathHandler(subjectPathFactory),
    // The `resolve` method interprets a string expression as an LDflex path
    resolve: new StringToLDflexHandler(),
  },
  // Handlers of all remaining properties
  resolvers: [
    // `data[url]` starts a path with the property as subject
    new SubjectPathResolver(subjectPathFactory),
  ],
}).create();
