const localsorageHandle = require('../localstorage.js');

const spyError = jest.spyOn( console, 'error' );
const spyWarn = jest.spyOn( console, 'warn' );

beforeEach( () => {
  spyError.mockReset();
  spyWarn.mockReset();
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


test('should update localStorage', () => {
 	localsorageHandle.update(KEY, DATA);

	expect(localsorageHandle.options.transientKey).toBe(KEY + '_transient');
	expect(localsorageHandle.get(KEY)).toBe(DATA);
});

test('shouldUpdateStorage() do not update', () => {
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);
});

test('should save to localStorage', () => {
	console.log(localStorage.__STORE__);
});