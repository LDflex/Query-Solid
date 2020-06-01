import PutHandler from '../../../src/handlers/PutHandler';
import auth from 'solid-auth-client';

describe('a PutHandler', () => {
  let handler;

  beforeEach(() => {
    handler = new PutHandler();
  });

  describe('when called on a path with a body', () => {
    const root = {
      'http://example.org/doc1': {},
      'https://example.org/doc2': {},
    };

    let path;
    beforeEach(() => {
      // Create a mock path
      path = (async function* () {
        yield { value: 'http://example.org/doc1', termType: 'NamedNode' };
        yield { value: 'https://example.org/doc2#thing2', termType: 'NamedNode' };
        yield { value: 'http://example.org/doc1#thing1', termType: 'NamedNode' };
        yield null;
      }());
      path.root = root;
    });

    describe('with a body and a content type', () => {
      const body = 'result body';
      const contentType = 'text/plain';

      let results;
      beforeEach(async () => {
        const put = handler.handle({}, path);
        const iterator = put(body, contentType);
        results = [];
        for await (const result of iterator)
          results.push(result);
      });

      it('returns a path for every document', () => {
        expect(results).toHaveLength(2);
        expect(results[0]).toBe(root['http://example.org/doc1']);
        expect(results[1]).toBe(root['https://example.org/doc2']);
      });

      it('executes a PUT request with Turtle for every HTTP URL on the path', () => {
        const requestDetails = {
          method: 'PUT',
          body,
          headers: { 'Content-Type': contentType },
        };
        expect(auth.fetch).toHaveBeenCalledTimes(2);
        expect(auth.fetch).toHaveBeenCalledWith('http://example.org/doc1', requestDetails);
        expect(auth.fetch).toHaveBeenCalledWith('https://example.org/doc2', requestDetails);
      });
    });

    describe('without a content type', () => {
      beforeEach(async () => {
        const put = handler.handle({}, path);
        await put();
      });

      it('executes an empty PUT request for every HTTP URL on the path', () => {
        const requestDetails = {
          method: 'PUT',
          body: '',
          headers: { 'Content-Type': 'text/turtle' },
        };
        expect(auth.fetch).toHaveBeenCalledTimes(2);
        expect(auth.fetch).toHaveBeenCalledWith('http://example.org/doc1', requestDetails);
        expect(auth.fetch).toHaveBeenCalledWith('https://example.org/doc2', requestDetails);
      });
    });

    describe('with a body', () => {
      const body = 'result body';

      beforeEach(async () => {
        const put = handler.handle({}, path);
        await put(body);
      });

      it('executes a PUT request with Turtle for every HTTP URL on the path', () => {
        const requestDetails = {
          method: 'PUT',
          body,
          headers: { 'Content-Type': 'text/turtle' },
        };
        expect(auth.fetch).toHaveBeenCalledTimes(2);
        expect(auth.fetch).toHaveBeenCalledWith('http://example.org/doc1', requestDetails);
        expect(auth.fetch).toHaveBeenCalledWith('https://example.org/doc2', requestDetails);
      });
    });
  });
});
