import CreateActivityHandler from '../src/CreateActivityHandler';
import auth from 'solid-auth-client';

describe('a CreateActivityHandler instance', () => {
  let handler;
  beforeEach(() => (handler = new CreateActivityHandler()));

  describe('creating a like', () => {
    beforeEach(async () => {
      const like = handler.handle(null, createProxy());
      expect(like).toBeInstanceOf(Function);
      await like();
    });

    it('issues a PATCH request', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('method', 'PATCH');
    });

    it('sets the Content-Type to application/sparql-update', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('headers');
      expect(args[1].headers).toHaveProperty('Content-Type', 'application/sparql-update');
    });

    it('sends a patch document', () => {
      expect(auth.fetch).toHaveBeenCalledTimes(1);
      const args = auth.fetch.mock.calls[0];
      expect(args[1]).toHaveProperty('body');
      expect(args[1].body).toMatch(/INSERT/);
      expect(args[1].body).toMatch(/Like/);
    });
  });
});

function createProxy() {
  const user = { pim_storage: 'http://user.example/' };
  const root = { user };
  const proxy = (async function* proxy() {
    yield 'http://example.org/#user1';
    yield { termType: 'NamedNode' };
    yield 0;
  }());
  proxy.root = root;
  return proxy;
}
