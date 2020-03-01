import { SparqlHandler } from 'ldflex';

export const { termToString } = SparqlHandler.prototype;

export function replaceVariables(template, terms) {
  for (const name in terms)
    template = template.replace(new RegExp(`_:${name}`, 'g'), termToString(terms[name]));
  return template;
}

// Transforms the arguments into an Immutable.js-style list
export function asList(...items) {
  return {
    size: items.length,
    values: () => ({
      next: () => ({ value: items.shift() }),
    }),
  };
}
