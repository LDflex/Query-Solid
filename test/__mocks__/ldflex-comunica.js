const ComunicaEngine = jest.genMockFromModule('ldflex-comunica').default;

async function* noResults() { /* empty */ }
ComunicaEngine.prototype.execute.mockReturnValue(noResults());

export default ComunicaEngine;
