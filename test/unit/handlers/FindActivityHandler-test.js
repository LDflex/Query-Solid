import FindActivityHandler from '../../../src/handlers/FindActivityHandler';
import { asList } from '../../../src/util';
import { namedNode } from '@rdfjs/data-model';

describe('a FindActivityHandler instance', () => {
  const queryEngine = {
    execute: jest.fn(async function*() {
      yield asList(namedNode('http://ex.org/likes/#1'));
    }),
  };
  let handler;
  beforeEach(() => (handler = new FindActivityHandler()));

  describe('finding a like', () => {
    let results;

    beforeEach(async () => {
      // create a mock path
      const path = (async function* path() {
        yield { value: 'http://example.org/#thing1', termType: 'NamedNode' };
        yield { value: 'http://example.org/#thing2', termType: 'NamedNode' };
        yield 0;
      }());
      const user = Promise.resolve('http://user.example/#me');
      user.pim$storage = 'http://user.storage/';
      path.root = {
        user,
        'http://ex.org/likes/#1': { path: 1 },
      };

      // perform the activity
      const findActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = findActivity();
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("queries the user's activities document", () => {
      expect(queryEngine.execute).toHaveBeenCalledTimes(2);
      const args = queryEngine.execute.mock.calls;
      expect(args[0][0].trim()).toBe(`
SELECT ?activity WHERE {
  ?activity a <https://www.w3.org/ns/activitystreams#Like>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>.
}
`.trim());
      expect(args[0][1]).toBe('http://user.storage/public/activities');
      expect(args[1][0].trim()).toBe(`
SELECT ?activity WHERE {
  ?activity a <https://www.w3.org/ns/activitystreams#Like>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>.
}
`.trim());
      expect(args[1][1]).toBe('http://user.storage/public/activities');
    });

    it('returns result paths', () => {
      expect(results).toEqual([
        { path: 1 },
        { path: 1 },
      ]);
    });
  });

  describe('finding a follow when no user storage link is available', () => {
    let results;

    beforeEach(async () => {
      // create a mock path
      const path = (async function* path() {
        yield { value: 'http://example.org/#thing1', termType: 'NamedNode' };
        yield { value: 'http://example.org/#thing2', termType: 'NamedNode' };
        yield 0;
      }());
      const user = Promise.resolve('http://user.example/#me');
      path.root = {
        user,
        'http://ex.org/likes/#1': { path: 1 },
      };

      // perform the activity
      const findActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = findActivity('https://www.w3.org/ns/activitystreams#Follow');
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("queries the user's activities document", () => {
      expect(queryEngine.execute).toHaveBeenCalledTimes(2);
      const args = queryEngine.execute.mock.calls;
      expect(args[0][0].trim()).toBe(`
SELECT ?activity WHERE {
  ?activity a <https://www.w3.org/ns/activitystreams#Follow>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>.
}
`.trim());
      expect(args[0][1]).toBe('http://user.example/public/activities');
      expect(args[1][0].trim()).toBe(`
SELECT ?activity WHERE {
  ?activity a <https://www.w3.org/ns/activitystreams#Follow>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>.
}
`.trim());
      expect(args[1][1]).toBe('http://user.example/public/activities');
    });

    it('returns result paths', () => {
      expect(results).toEqual([
        { path: 1 },
        { path: 1 },
      ]);
    });
  });
});
