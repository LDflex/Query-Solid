import RootPath from '../RootPath';
import SolidUpdateEngine from '../SolidUpdateEngine';
import RdflibQueryEngine from '@ldflex/rdflib';

// Export the root path with rdflib.js as query engine
export default new RootPath({
  createQueryEngine: sources =>
    new SolidUpdateEngine(sources, new RdflibQueryEngine(sources)),
});
