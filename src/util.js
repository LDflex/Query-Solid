import { SparqlHandler } from 'ldflex';

export const { termToString } = SparqlHandler.prototype;

export function replaceVariables(template, terms) {
  for (const name in terms)
    template = template.replace(new RegExp(`_:${name}`, 'g'), termToString(terms[name]));
  return template;
}

// Imitate Comunica's response for bindings as a Immutable.js object.
export function createBindings(...items) {
  return {
    size: items.length,
    values: () => ({
      next: () => ({ value: items.shift() }),
    }),
  };
}
