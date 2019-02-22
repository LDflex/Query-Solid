export default class ComunicaEngineMock {
  constructor(subject, source) {
    this._source = source;
    this._engine = {
      invalidateHttpCache: jest.fn(() => Promise.resolve(true)),
    };
  }

  getDocument() {
    return 'https://example.org/';
  }
}
