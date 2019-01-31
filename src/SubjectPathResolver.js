import { namedNode } from '@rdfjs/data-model';
import ComunicaUpdateEngine from './ComunicaUpdateEngine';

/**
 * LDflex property resolver that returns a new path
 * starting from the property name as a subject.
 *
 * For example, when triggered as
 *     data['http://person.example/#me'].friends.firstName
 * it will create a path with `http://person.example/#me` as subject
 * and then resolve `friends` and `firstName` against the JSON-LD context.
 */
export default class SubjectPathResolver {
  constructor(pathFactory) {
    this._paths = pathFactory;
  }

  /** Resolve all string properties (not Symbols) */
  supports(property) {
    return typeof property === 'string';
  }

  resolve(property) {
    return this._createSubjectPath(namedNode(property));
  }

  _createSubjectPath(subject) {
    const queryEngine = new ComunicaUpdateEngine(subject);
    return this._paths.create({ queryEngine }, { subject });
  }
}
