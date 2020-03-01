export default {
  currentSession: jest.fn(),
  fetch: jest.fn((request, init) => ({
    ok: !init || !/error/.test(init.body),
    status: 123,
    statusText: 'Status',
  })),
};
