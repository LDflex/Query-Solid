import { PathFactory, defaultHandlers } from 'ldflex';
import contextDocument from './context.json';
import SolidDeleteFunctionHandler from './SolidDeleteFunctionHandler';
import FindActivityHandler from './FindActivityHandler';
import CreateActivityHandler from './CreateActivityHandler';
import DeleteActivityHandler from './DeleteActivityHandler';
import SourcePathHandler from './SourcePathHandler';
import UserPathHandler from './UserPathHandler';
import SubjectPathResolver from './SubjectPathResolver';
import ComunicaUpdateEngine from './ComunicaUpdateEngine';

const context = contextDocument['@context'];
const { as } = context;

let rootPath;

// Creates data paths that start from a given subject
const subjectPathFactory = new PathFactory({
  context,
  handlers: {
    ...defaultHandlers,

    // Custom delete handler to match node-solid-server behavior
    delete: new SolidDeleteFunctionHandler(),

    // Find activities
    findActivity: new FindActivityHandler(),
    likes: (_, path) => path.findActivity(`${as}Like`),
    dislikes: (_, path) => path.findActivity(`${as}Dislike`),
    follows: (_, path) => path.findActivity(`${as}Follow`),

    // Create activities
    createActivity: new CreateActivityHandler(),
    like: (_, path) => () => path.createActivity(`${as}Like`),
    dislike: (_, path) => () => path.createActivity(`${as}Dislike`),
    follow: (_, path) => () => path.createActivity(`${as}Follow`),

    // Delete activities
    deleteActivity: new DeleteActivityHandler(),
    unlike: (_, path) => () => path.deleteActivity(`${as}Like`),
    undislike: (_, path) => () => path.deleteActivity(`${as}Dislike`),
    unfollow: (_, path) => () => path.deleteActivity(`${as}Follow`),

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

    // Expose the JSON-LD context
    context: () => context,
  },
  // Handlers of all remaining properties
  resolvers: [
    // `data[url]` starts a path with the property as subject
    new SubjectPathResolver(subjectPathFactory),
  ],
  // Global query engine (currently only used for clearing the cache)
  queryEngine: new ComunicaUpdateEngine(),
}).create();
