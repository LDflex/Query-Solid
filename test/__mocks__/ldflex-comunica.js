export default class ComunicaEngineMock {
  constructor(subject, source) {
    this._source = source;
  }

  getDocument() {
    return 'https://example.org/';
  }
}
