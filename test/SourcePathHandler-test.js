import SourcePathHandler from '../src/SourcePathHandler';
import { PathFactory } from 'ldflex';
import SubjectPathResolver from '../src/SubjectPathResolver';

jest.mock('ldflex');
jest.mock('../src/SubjectPathResolver');

const path = {};
PathFactory.prototype.create.mockReturnValue(path);

describe('a SourcePathHandler', () => {
  const factory = {}, source = {};
  let handler, subjectResolverFn;

  beforeEach(() => {
    handler = new SourcePathHandler(factory);
    subjectResolverFn = handler.handle();
  });

  it('returns a function', () => {
    expect(subjectResolverFn).toBeInstanceOf(Function);
  });

  describe('the function', () => {
    let result;
    beforeEach(() => {
      result = subjectResolverFn(source);
    });

    it('creates a path with a single resolver', () => {
      expect(PathFactory).toHaveBeenCalledTimes(1);
      const { resolvers } = PathFactory.mock.calls[0][0];
      expect(resolvers).toHaveLength(1);
      expect(resolvers[0]).toBeInstanceOf(SubjectPathResolver);
      expect(PathFactory.mock.instances[0].create).toHaveBeenCalledTimes(1);
      expect(result).toBe(path);
    });

    it('passes the source to the SubjectPathResolver', () => {
      expect(SubjectPathResolver).toHaveBeenCalledTimes(1);
      expect(SubjectPathResolver.mock.calls[0][0]).toBe(factory);
      expect(SubjectPathResolver.mock.calls[0][1]).toBe(source);
    });
  });
});
