import { namedNode, literal, blankNode } from '@rdfjs/data-model';
import SolidDeleteFunctionHandler from '../../../src/handlers/SolidDeleteFunctionHandler';

describe('a SolidDeleteFunctionHandler instance', () => {
  let handler;
  beforeEach(() => (handler = new SolidDeleteFunctionHandler()));

  async function* createPath() {
    yield namedNode('https://ex.org/#1');
    yield namedNode('https://ex.org/#2');
    yield literal('3');
    yield blankNode('4');
  }

  describe('extractObjects', () => {
    it('returns all objects that exist on the path when args is empty', async () => {
      const objects = await handler.extractObjects(null, createPath(), []);
      expect(objects).toEqual([
        namedNode('https://ex.org/#1'),
        namedNode('https://ex.org/#2'),
        literal('3'),
      ]);
    });

    it('only returns objects that exist on the path when args are given', async () => {
      const objects = await handler.extractObjects(null, createPath(), [
        namedNode('https://ex.org/#2'),
        namedNode('https://ex.org/#3'),
        literal('2'),
        literal('3'),
      ]);
      expect(objects).toEqual([
        namedNode('https://ex.org/#2'),
        literal('3'),
      ]);
    });
  });
});
