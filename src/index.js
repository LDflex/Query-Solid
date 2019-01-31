import { PathFactory, defaultHandlers } from 'ldflex';
import context from './context.json';
import UserPathHandler from './UserPathHandler';
import SubjectPathResolver from './SubjectPathResolver';
import CreateActivityHandler from './CreateActivityHandler';

const { as } = context['@context'];

let rootPath;

// Creates data paths that start from a given subject
const subjectPathFactory = new PathFactory({
  context,
  handlers: {
    ...defaultHandlers,
    // Activities on paths
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
    // The `user` property starts a path with the current user as subject
    user: new UserPathHandler(subjectPathFactory),
  },
  // Handlers of all remaining properties
  resolvers: [
    // `data[url]` starts a path with the property as subject
    new SubjectPathResolver(subjectPathFactory),
  ],
}).create();
