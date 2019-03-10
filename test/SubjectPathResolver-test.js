import { PathFactory } from 'ldflex';
import SubjectPathResolver from '../src/SubjectPathResolver';
import ComunicaUpdateEngine from '../src/ComunicaUpdateEngine';

jest.mock('ldflex');
jest.mock('../src/ComunicaUpdateEngine');

describe('a SubjectPathResolver', () => {
  const source = {};
  let resolver;

  beforeEach(() => {
    resolver = new SubjectPathResolver(new PathFactory(), source);
  });

  it('supports strings', () => {
    expect(resolver.supports('apple')).toBe(true);
  });

  it('does not support Symbols', () => {
    expect(resolver.supports(Symbol('apple'))).toBe(false);
  });

  it('resolves to a path that uses the given source', () => {
    resolver.resolve('apple');
    expect(ComunicaUpdateEngine).toHaveBeenCalledTimes(1);
    expect(ComunicaUpdateEngine.mock.calls[0][0]).toBe(source);

    const { create } = PathFactory.mock.instances[0];
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0].queryEngine).toBe(ComunicaUpdateEngine.mock.instances[0]);
    expect(create.mock.calls[0][1].subject.value).toBe('apple');
  });
});
