import RootPath from '../RootPath';
import SolidUpdateEngine from '../SolidUpdateEngine';
import ComunicaEngine from 'ldflex-comunica';

export default new RootPath({
  createQueryEngine: sources =>
    new SolidUpdateEngine(sources, new ComunicaEngine(sources)),
});
