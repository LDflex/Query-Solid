import { PathFactory, defaultHandlers } from 'ldflex';
import SubjectPathResolver from '../resolvers/SubjectPathResolver';

export default class SourcePathHandler {
  constructor(pathFactory) {
    this._paths = pathFactory;
  }

  handle({ settings }) {
    return source => new PathFactory({
      handlers: { ...defaultHandlers },
      resolvers: [new SubjectPathResolver(this._paths, source)],
    }).create(settings, {});
  }
}
