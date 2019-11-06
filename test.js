const { default: data } = require('.');
const solid = { data };
const { asyncMap } = require('iter-tools');

(async function() {
  let container = solid.data["http://localhost:8080/users.jsonld"];
  await container.ldp_contains;
  for (var i=0; i < 10; i++) {
    console.time(container.toString())
    for await (const r of container.ldp_contains) {
      await r['rdfs:label']
      await r['http://happy-dev.fr/owl/#username']
      await r['http://happy-dev.fr/owl/#email']
    }
    console.timeEnd(container.toString())
  }
}())
