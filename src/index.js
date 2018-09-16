import { QueryPathFactory } from 'ldflex';
import ComunicaEngine from 'ldflex-comunica';
import context from './context';

const factory = new QueryPathFactory({ context });

/**
 * Starts a query path from the given subject
 */
export function node(subject) {
  const queryEngine = new ComunicaEngine(subject);
  return factory.create({ queryEngine }, { subject });
}
