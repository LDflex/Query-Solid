import ComunicaEngine from 'ldflex-comunica/lib/comunica-engine';
import { Store } from 'n3';

const sparql = `
SELECT ?label WHERE {
  <https://api.alpha.happy-dev.fr/users/25/> <http://www.w3.org/2000/01/rdf-schema#label> ?label.
}
`;

(async function() {
  console.time('query')
  for (var i = 0; i < 500; i++) {
    const result = await ComunicaEngine.query(sparql, {
      source: { value: new Store(), type: 'rdfjsSource' },
    });
    const bindings = result.bindingsStream;
    await readBindings(bindings);
  }
  console.timeEnd('query')
}())

function readBindings(bindings) {
  return new Promise(resolve => {
    bindings.on('data', () => {})
    bindings.on('end', resolve);
  });
}
