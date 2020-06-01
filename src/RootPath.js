import { PathFactory, defaultHandlers } from 'ldflex';
import context from '@solid/context';
import PutHandler from './handlers/PutHandler';
import SolidDeleteFunctionHandler from './handlers/SolidDeleteFunctionHandler';
import FindActivityHandler from './handlers/FindActivityHandler';
import CreateActivityHandler from './handlers/CreateActivityHandler';
import DeleteActivityHandler from './handlers/DeleteActivityHandler';
import SourcePathHandler from './handlers/SourcePathHandler';
import UserPathHandler from './handlers/UserPathHandler';
import ContextResolver from './resolvers/ContextResolver';
import SubjectPathResolver from './resolvers/SubjectPathResolver';

const { as } = context['@context'];
const contextResolver = new ContextResolver(context);

// Handlers for subject paths
const subjectHandlers = {
  ...defaultHandlers,

  // HTTP PUT handler
  put: new PutHandler(),

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
};

// Creates an LDflex for Solid root path with the given settings
export default function createRootPath(defaultSettings) {
  let rootPath = null;

  // Factory for data paths that start from a given subject
  const subjectPathFactory = new PathFactory({
    handlers: { ...subjectHandlers, root: () => rootPath },
    resolvers: [contextResolver],
  });

  // Root path that resolves the first property access
  rootPath = new PathFactory({
    // Handlers of specific named properties
    handlers: {
      ...defaultHandlers,

      // The `from` function takes a source as input
      from: new SourcePathHandler(subjectPathFactory),
      // The `user` property starts a path with the current user as subject
      user: new UserPathHandler(subjectPathFactory),

      // Clears the cache for the given document (or everything, if undefined)
      clearCache: ({ settings }) => doc =>
        settings.createQueryEngine().clearCache(doc),

      // Expose the JSON-LD context
      context: contextResolver,
    },
    // Resolvers for all remaining properties
    resolvers: [
      // `data[url]` starts a path with the property as subject
      new SubjectPathResolver(subjectPathFactory),
    ],
    ...defaultSettings,
  }).create();
  return rootPath;
}
