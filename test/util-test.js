import { serializeTerm } from '../src/util';
import { namedNode, literal } from '@rdfjs/data-model';

describe('serializeTerm', () => {
  test('it serializes a named node', () => {
    const term = namedNode('http://ex.org/');
    expect(serializeTerm(term)).toBe('<http://ex.org/>');
  });

  test('it serializes a literal with a type', () => {
    const term = literal('abc', 'http://ex.org/#type');
    expect(serializeTerm(term)).toBe('"abc"^^<http://ex.org/#type>');
  });

  test('it does not serialize literals of an unknown type', () => {
    const term = { termType: 'other' };
    expect(() => serializeTerm(term)).toThrow(new Error('Unknown term type: other'));
  });
});
