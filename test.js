const { default: data } = require('.');
const solid = { data };

(async function() {
  const container = solid.data["https://apiprod.happy-dev.fr/clients/"];
  console.time('total');
  console.time(container);
  await container.ldp_contains;
  console.timeEnd(container)
  for await (const r of container.ldp_contains) {
    console.time(r);
    await r['rdfs:label'];
    console.timeEnd(r);
  }
  console.timeEnd('total');
})()
