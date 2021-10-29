import {Storage} from '../src/storage.js';

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

        localStorage.__STORE__.clear();
    });

    test('Test add data to storage', () => {
        const localStorageHandle = new Storage();

        expect(localStorageHandle.get(testOptions.cacheKey)).toBe(null);

        localStorageHandle.set(testOptions.data, testOptions.cacheKey, testOptions.cacheTime);

        expect(localStorageHandle.get(testOptions.cacheKey)).toBe(testOptions.data);
    });
});