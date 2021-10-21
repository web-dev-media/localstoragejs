import {Storage} from '../src/storage.js';

const test_options = {
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

        expect(localStorageHandle.get(test_options.cacheKey)).toBe(null);

        localStorageHandle.set(test_options.data, test_options.cacheKey, test_options.cacheTime);

        expect(localStorageHandle.get(test_options.cacheKey)).toBe(test_options.data);
    });
});