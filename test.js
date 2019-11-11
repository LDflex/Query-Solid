const { default: data } = require('.');
const solid = { data };

(async function() {
  let container = solid.data["http://localhost:8080/users.jsonld"];

  console.time('fetch');
  await container.ldp_contains;
  console.timeEnd('fetch');

  const items = container.ldp_contains;
  for (var i=0; i < 10; i++) {
    console.time('preload')
    await items.preload('rdfs:label', 'http://happy-dev.fr/owl/#username', 'http://happy-dev.fr/owl/#email');
    console.timeEnd('preload')

    console.time('items')
    for await (const r of items) {
      await r['rdfs:label']
      await r['http://happy-dev.fr/owl/#username']
      await r['http://happy-dev.fr/owl/#email']
    }
    console.timeEnd('items')
  }
}())
