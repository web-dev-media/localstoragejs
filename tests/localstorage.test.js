const localsorageHandle = require('../localstorage.js');

const spyError = jest.spyOn( console, 'error' );
const spyWarn = jest.spyOn( console, 'warn' );

beforeEach( () => {
  spyError.mockReset();
  spyWarn.mockReset();

	localStorage.__STORE__.clear();
} );

const KEY = "foo",
			TIME = 10,
			DATA = "bar";

test('should set cacheKey', () => {
	localsorageHandle.options.cacheKey = KEY;
	expect(localsorageHandle.options.cacheKey).toBe(KEY);
});

test('should set cacheTime', () => {
	localsorageHandle.options.cacheTime = TIME;
	expect(localsorageHandle.options.cacheTime).toBe(10);
});

test('update localStorage', () => {
 	localsorageHandle.update(KEY, DATA);

	expect(localsorageHandle.options.cacheTimetKey).toBe(KEY + '_cacheTime');
	expect(localsorageHandle.get(KEY)).toBe(DATA);
});

test('shouldUpdateStorage() do update', () => {
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);
});

test('shouldUpdateStorage() do not update', () => {
	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);
});

test('shouldUpdateStorage() do update on timeout ', (done) => {
	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);

	setTimeout(() => {
		expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);
		done();
	}, 11);
});

test('purge storage by key', () => {
	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);

	localsorageHandle.purge(KEY);
	expect(localsorageHandle.get(KEY)).toBe(null);
});