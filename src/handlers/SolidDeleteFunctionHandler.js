import { DeleteFunctionHandler } from 'ldflex';

/**
 * node-solid-server deviates from the SPARQL UPDATE spec:
 * whereas the spec asks for DELETE on non-existing triples to silently succeed,
 * node-solid-server will only DELETE if exactly one triple matches.
 *
 * This delete handler works around that limitation
 * by first requesting all existing values for a path,
 * and then only issuing DELETE statements for those that exist.
 */
export default class SolidDeleteFunctionHandler extends DeleteFunctionHandler {
  async extractObjects(pathData, path, args) {
    // Obtain all values whose deletion was requested
    const objects = await super.extractObjects(pathData, path, args);

    // Obtain all values that currently exist
    const existing = [];
    for await (const term of path) {
      if (term.termType !== 'BlankNode')
        existing.push(term);
    }

    // Perform deletions only for values that exist
    return !objects ? existing : existing.filter(e => objects.some(o => o.equals(e)));
  }
}
