import CreateActivityHandler from '../../../src/handlers/CreateActivityHandler';
import { v4 as uuidv4 } from 'uuid';

Date.prototype.toISOString = () => '2019-01-01T20:00:00.000Z';

describe('a CreateActivityHandler instance', () => {
  const queryEngine = {
    executeUpdate: jest.fn(() => ({ next: jest.fn() })),
  };
  let handler;
  beforeEach(() => (handler = new CreateActivityHandler()));

  describe('creating a like', () => {
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
        'http://user.storage/public/activities#1': { path: 1 },
        'http://user.storage/public/activities#2': { path: 2 },
      };

      // perform the activity
      uuidv4.reset();
      const createActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = createActivity();
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("sends an update to the user's activities document", () => {
      expect(queryEngine.executeUpdate).toHaveBeenCalledTimes(1);

      // assert that it passes the right query
      const [args] = queryEngine.executeUpdate.mock.calls;
      expect(args[0].trim()).toBe(`
INSERT {
<http://user.storage/public/activities#1> a <https://www.w3.org/ns/activitystreams#Like>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>;
    <https://www.w3.org/ns/activitystreams#published> "2019-01-01T20:00:00.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://user.storage/public/activities#2> a <https://www.w3.org/ns/activitystreams#Like>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>;
    <https://www.w3.org/ns/activitystreams#published> "2019-01-01T20:00:00.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
}`.trim());
      expect(args[1]).toBe('http://user.storage/public/activities');

      // assert that it calls the `next` function to execute the query
      const [{ value: { next } }] = queryEngine.executeUpdate.mock.results;
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('returns result paths', () => {
      expect(results).toEqual([
        { path: 1 },
        { path: 2 },
      ]);
    });
  });

  describe('creating a follow when no user storage link is available', () => {
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
        'http://user.example/public/activities#1': { path: 1 },
        'http://user.example/public/activities#2': { path: 2 },
      };

      // perform the activity
      uuidv4.reset();
      const createActivity = handler.handle({ settings: { queryEngine } }, path);
      const iterator = createActivity('https://www.w3.org/ns/activitystreams#Follow');
      results = [];
      for await (const result of iterator)
        results.push(result);
    });

    it("sends an update to the user's activities document", () => {
      expect(queryEngine.executeUpdate).toHaveBeenCalledTimes(1);

      // assert that it passes the right query
      const [args] = queryEngine.executeUpdate.mock.calls;
      expect(args[0].trim()).toBe(`
INSERT {
<http://user.example/public/activities#1> a <https://www.w3.org/ns/activitystreams#Follow>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>;
    <https://www.w3.org/ns/activitystreams#published> "2019-01-01T20:00:00.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://user.example/public/activities#2> a <https://www.w3.org/ns/activitystreams#Follow>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>;
    <https://www.w3.org/ns/activitystreams#published> "2019-01-01T20:00:00.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
}`.trim());
      expect(args[1]).toBe('http://user.example/public/activities');

      // assert that it calls the `next` function to execute the query
      const [{ value: { next } }] = queryEngine.executeUpdate.mock.results;
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('returns result paths', () => {
      expect(results).toEqual([
        { path: 1 },
        { path: 2 },
      ]);
    });
  });
});
