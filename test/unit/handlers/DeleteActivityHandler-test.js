import DeleteActivityHandler from '../../../src/handlers/DeleteActivityHandler';
import { namedNode, literal } from '@rdfjs/data-model';

describe('a DeleteActivityHandler instance', () => {
  const queryEngine = {
    execute: jest.fn(async function*() {
      const components = {
        '?subject': namedNode('http://ex.org/likes/#1'),
        '?predicate': namedNode('http://ex.org/#prop'),
        '?object': literal('abc'),
      };
      yield { get: c => components[c] };
    }),
    executeUpdate: jest.fn(() => ({ next: jest.fn() })),
  };
  let handler;
  beforeEach(() => (handler = new DeleteActivityHandler()));

  describe('deleting a like', () => {
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
      const createActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = createActivity();
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("queries the user's activities document", () => {
      expect(queryEngine.execute).toHaveBeenCalledTimes(2);
      const args = queryEngine.execute.mock.calls;
      expect(args[0][0].trim()).toBe(`
SELECT ?subject ?predicate ?object WHERE {
  ?subject a <https://www.w3.org/ns/activitystreams#Like>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>.
  ?subject ?predicate ?object.
}
`.trim());
      expect(args[0][1]).toBe('http://user.storage/public/activities');
      expect(args[1][0].trim()).toBe(`
SELECT ?subject ?predicate ?object WHERE {
  ?subject a <https://www.w3.org/ns/activitystreams#Like>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>.
  ?subject ?predicate ?object.
}
`.trim());
      expect(args[1][1]).toBe('http://user.storage/public/activities');
    });

    it('deletes the activities', () => {
      expect(queryEngine.executeUpdate).toHaveBeenCalledTimes(1);
      const args = queryEngine.executeUpdate.mock.calls;
      expect(args[0][0].trim()).toBe(`
DELETE {
<http://ex.org/likes/#1> <http://ex.org/#prop> "abc".
<http://ex.org/likes/#1> <http://ex.org/#prop> "abc".
}
`.trim());
      expect(args[0][1]).toBe('http://user.storage/public/activities');
    });

    it('returns no results', () => {
      expect(results).toEqual([]);
    });
  });

  describe('deleting a follow when no user storage link is available', () => {
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
      const createActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = createActivity('https://www.w3.org/ns/activitystreams#Follow');
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("queries the user's activities document", () => {
      expect(queryEngine.execute).toHaveBeenCalledTimes(2);
      const args = queryEngine.execute.mock.calls;
      expect(args[0][0].trim()).toBe(`
SELECT ?subject ?predicate ?object WHERE {
  ?subject a <https://www.w3.org/ns/activitystreams#Follow>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>.
  ?subject ?predicate ?object.
}
`.trim());
      expect(args[0][1]).toBe('http://user.example/public/activities');
      expect(args[1][0].trim()).toBe(`
SELECT ?subject ?predicate ?object WHERE {
  ?subject a <https://www.w3.org/ns/activitystreams#Follow>;
      <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
      <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>.
  ?subject ?predicate ?object.
}
`.trim());
      expect(args[1][1]).toBe('http://user.example/public/activities');
    });

    it('deletes the activities', () => {
      expect(queryEngine.executeUpdate).toHaveBeenCalledTimes(1);
      const args = queryEngine.executeUpdate.mock.calls;
      expect(args[0][0].trim()).toBe(`
DELETE {
<http://ex.org/likes/#1> <http://ex.org/#prop> "abc".
<http://ex.org/likes/#1> <http://ex.org/#prop> "abc".
}
`.trim());
      expect(args[0][1]).toBe('http://user.example/public/activities');
    });

    it('returns no results', () => {
      expect(results).toEqual([]);
    });
  });
});
