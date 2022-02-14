import RootPath from '../RootPath';
// import SolidUpdateEngine from '../SolidUpdateEngine';
import ComunicaEngine from '@ldflex/comunica';
// I had to manually add the following line to node_modules/jose/dist/node/cjs/lib/buffer_utils.js:4:23
// const {TextDecoder, TextEncoder} = require("util");

// Export the root path with Comunica as query engine
// export default new RootPath({
//   createQueryEngine: sources =>
//     new SolidUpdateEngine(sources, new ComunicaEngine(sources)),
// });

export default new RootPath({
  createQueryEngine: sources => new ComunicaEngine(sources),
});
