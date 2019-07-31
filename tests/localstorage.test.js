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

	expect(localsorageHandle.options.transientKey).toBe(KEY + '_transient');
	expect(localsorageHandle.get(KEY)).toBe(DATA);
});

test('shouldUpdateStorage() do update', () => {
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);
});

test('shouldUpdateStorage() do not update', () => {
	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);
});

test('shouldUpdateStorage() transient timout after 10s', () => {
	let then = new Date().getTime() + TIME;
	let loop = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7,];

	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);
	// wait
	for(let i = 0; i < loop.length; i++){	}
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);


});
