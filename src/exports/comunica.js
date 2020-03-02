import RootPath from '../RootPath';
import SolidUpdateEngine from '../SolidUpdateEngine';
import ComunicaEngine from '@ldflex/comunica';

// Export the root path with Comunica as query engine
export default new RootPath({
  createQueryEngine: sources =>
    new SolidUpdateEngine(sources, new ComunicaEngine(sources)),
});
