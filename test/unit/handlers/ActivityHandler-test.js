import ActivityHandler from '../../../src/handlers/ActivityHandler';

const loggedOutPath = {
  root: {
    get user() {
      throw new Error('no user');
    },
  },
};

describe('an ActivityHandler', () => {
  let handler;

  describe('with default settings', () => {
    beforeEach(() => {
      handler = new ActivityHandler();
    });

    it('errors if the user is not logged in', async () => {
      const findActivity = handler.handle({ settings: {} }, loggedOutPath);
      const iterator = findActivity();
      const results = [];
      await expect((async () => {
        for await (const result of iterator)
          results.push(result);
      })()).rejects.toThrow('no user');
      expect(results).toHaveLength(0);
    });
  });

  describe('with requireUser set to false', () => {
    beforeEach(() => {
      handler = new ActivityHandler();
      handler.requireUser = false;
    });

    it('returns no returns if the user is not logged in', async () => {
      const findActivity = handler.handle({ settings: {} }, loggedOutPath);
      const iterator = findActivity();
      const results = [];
      for await (const result of iterator)
        results.push(result);
      expect(results).toHaveLength(0);
    });
  });
});
