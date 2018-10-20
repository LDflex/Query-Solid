const ComunicaEngine = jest.genMockFromModule('ldflex-comunica').default;

const noResults = { next: async () => ({ done: true }) };
ComunicaEngine.prototype.execute.mockReturnValue(noResults);

export default ComunicaEngine;
