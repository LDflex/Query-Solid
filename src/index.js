import { PathFactory, defaultHandlers } from 'ldflex';
import context from './context.json';
import SolidDeleteFunctionHandler from './SolidDeleteFunctionHandler';
import FindActivityHandler from './FindActivityHandler';
import CreateActivityHandler from './CreateActivityHandler';
import SourcePathHandler from './SourcePathHandler';
import UserPathHandler from './UserPathHandler';
import SubjectPathResolver from './SubjectPathResolver';
import ComunicaUpdateEngine from './ComunicaUpdateEngine';

const { as } = context['@context'];

let rootPath;

// Creates data paths that start from a given subject
const subjectPathFactory = new PathFactory({
  context,
  handlers: {
    ...defaultHandlers,

    // Custom delete handler to match node-solid-server behavior
    delete: new SolidDeleteFunctionHandler(),

    // Find activities
    likes: new FindActivityHandler({ type: `${as}Like` }),
    dislikes: new FindActivityHandler({ type: `${as}Dislike` }),
    follows: new FindActivityHandler({ type: `${as}Follow` }),

    // Create activities
    like: new CreateActivityHandler({ type: `${as}Like` }),
    dislike: new CreateActivityHandler({ type: `${as}Dislike` }),
    follow: new CreateActivityHandler({ type: `${as}Follow` }),

    // The `root` property restarts the path from the root
    root: () => rootPath,
  },
});

// Export the root path that resolves the first property access
export default rootPath = new PathFactory({
  // Handlers of specific named properties
  handlers: {
    ...defaultHandlers,

    // The `from` property takes a source URI as input
    from: new SourcePathHandler(subjectPathFactory),
    // The `user` property starts a path with the current user as subject
    user: new UserPathHandler(subjectPathFactory),

    // Clears the cache for the given document (or everything, if undefined)
    clearCache: ({ settings }) => doc => settings.queryEngine.clearCache(doc),
  },
  // Handlers of all remaining properties
  resolvers: [
    // `data[url]` starts a path with the property as subject
    new SubjectPathResolver(subjectPathFactory),
  ],
  // Global query engine (currently only used for clearing the cache)
  queryEngine: new ComunicaUpdateEngine(),
}).create();
