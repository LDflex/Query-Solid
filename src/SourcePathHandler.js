import { PathFactory, defaultHandlers } from 'ldflex';
import SubjectPathResolver from './SubjectPathResolver';

export default class SourcePathHandler {
  constructor(pathFactory) {
    this._paths = pathFactory;
  }

  handle() {
    return source => this._createSourcePathFactory(source);
  }

  _createSourcePathFactory(source) {
    return new PathFactory({
      handlers: { ...defaultHandlers },
      resolvers: [new SubjectPathResolver(this._paths, source)],
    }).create();
  }
}
