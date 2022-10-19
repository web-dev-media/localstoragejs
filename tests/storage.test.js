import {Storage} from '../src/storage.js';

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] ?? null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
global.localStorage = localStorageMock;

const testOptions = {
  cacheTime: 24 * 60,
  cacheKey: 'fooo_bar',
  data: 'foo_abcd',
};

const SPY_ERROR = jest.spyOn(console, 'error');
const SPY_WARN = jest.spyOn(console, 'warn');

describe('LocalStorage', () => {
  beforeEach(() => {
    SPY_ERROR.mockReset();
    SPY_WARN.mockReset();
  });

  test('Test add data to storage', () => {
    const localStorageHandle = new Storage();

    expect(localStorageHandle.get(testOptions.cacheKey)).toBe(null);

    localStorageHandle.set(testOptions.cacheKey, testOptions.data, testOptions.cacheTime);

    expect(localStorageHandle.get(testOptions.cacheKey)).toBe(testOptions.data);
  });

  test('Test clear storage', () => {
    const localStorageHandle = new Storage();

    expect(localStorageHandle.get(testOptions.cacheKey)).toBe(testOptions.data);

    localStorageHandle.remove(testOptions.cacheKey);

    expect(localStorageHandle.get(testOptions.cacheKey)).toBe(null);
  });
});
