import { JSONLDResolver } from 'ldflex';

/**
 * A ContextResolver is a combined resolver/handler that:
 * - resolves a JSON-LD context
 * - handles by returning an object that
 *   - is the initial context passed to the constructor
 *   - allows extending that context by calling `.extend`
 *   - when `await`ed, resolves to the expanded context
 */
export default class ContextResolver extends JSONLDResolver {
  constructor(context) {
    super(context);

    // Create an exposed version of the initial context, with additional functionality
    const exposedContext = this._exposedContext = Object.create(context['@context']);
    // Allow extending the context
    Object.defineProperty(exposedContext, 'extend', {
      value: (...contexts) => this.extendContext(...contexts),
    });
    // Resolve to the expanded context
    Object.defineProperty(exposedContext, 'then', {
      value: (resolve, reject) => this._context
        .then(ctx => ctx.contextRaw).then(resolve, reject),
    });
  }

  handle() {
    return this._exposedContext;
  }
}
