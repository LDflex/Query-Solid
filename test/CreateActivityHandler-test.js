import CreateActivityHandler from '../src/CreateActivityHandler';

describe('a CreateActivityHandler instance', () => {
  const queryEngine = {
    executeUpdate: jest.fn(() => ({ next: jest.fn() })),
  };
  let handler;
  beforeEach(() => (handler = new CreateActivityHandler()));

  describe('creating a like', () => {
    beforeEach(async () => {
      // create a mock path
      const path = (async function* path() {
        yield 'http://example.org/#thing1';
        yield { value: 'http://example.org/#thing2', termType: 'NamedNode' };
        yield 0;
      }());
      const user = Promise.resolve('http://user.example/#me');
      user.pim_storage = 'http://user.example/';
      path.root = { user };

      // perform the activity
      const like = handler.handle({ settings: { queryEngine } }, path);
      expect(like).toBeInstanceOf(Function);
      await like();
    });

    it("sends an update to the user's activities document", () => {
      expect(queryEngine.executeUpdate).toHaveBeenCalledTimes(1);

      // assert that it passes the right query
      const [args] = queryEngine.executeUpdate.mock.calls;
      expect(args[0]).toMatch(new RegExp(`
^INSERT {
<#[^>]+> a <https://www.w3.org/ns/activitystreams#Like>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing1>;
    <https://www.w3.org/ns/activitystreams#published> "[^"]+"\\^\\^<http://www.w3.org/2001/XMLSchema#dateTime>\\.
<#[^>]+> a <https://www.w3.org/ns/activitystreams#Like>;
    <https://www.w3.org/ns/activitystreams#actor> <http://user.example/#me>;
    <https://www.w3.org/ns/activitystreams#object> <http://example.org/#thing2>;
    <https://www.w3.org/ns/activitystreams#published> "[^"]+"\\^\\^<http://www.w3.org/2001/XMLSchema#dateTime>\\.
}$`.trim()));
      expect(args[1]).toEqual(new URL('http://user.example/public/activities'));

      // assert that it calls the `next` function to execute the query
      const [{ value: { next } }] = queryEngine.executeUpdate.mock.results;
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
