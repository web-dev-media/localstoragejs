const localStorageHandle = require('../localstorage.js');

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

describe('Test handle options', () => {
	test('should set option cacheTime', () => {
		localStorageHandle.options.cacheTime = TIME;
		expect(localStorageHandle.options.cacheTime).toBe(10);
	});

	test('should set multiple cacheTimeKeys', () => {
		let keys = ['key1', 'key2', 'key3'];

		for (var i = 0; i < keys.length; i++) {
			let cacheKey = 'multiple_' + keys[i];
			localStorageHandle.update(cacheKey, keys);
			expect(localStorageHandle.options.cacheTimeKey).toBe(cacheKey + '_cacheTime');
		}
	});

	test('should set cacheKey directly', () => {
		localStorageHandle.options.cacheKey = KEY;
		expect(localStorageHandle.options.cacheKey).toBe(KEY);
	});

});

describe('Receiving data from localStorage', () => {
	test( 'typeof string', () => {
		let key = 'stringTest';
		let data = 'bar';

		localStorageHandle.update( key, data );
		let recevied = localStorageHandle.get( key );

		expect( typeof recevied ).toBe( "string" );
		expect( recevied ).toStrictEqual( data );
	} );

	test( 'typeof array', () => {
		let key = 'arrayTest';
		let data = ['key1', 'key2', 'key3'];

		localStorageHandle.update( key, data );
		let recevied = localStorageHandle.get( key );

		expect( Array.isArray(recevied) ).toBe( true );
		expect( recevied ).toStrictEqual( data );
	} );


	test( 'typeof object', () => {
		let key = 'objectTest';
		let data = {
			key1: 'foo',
			key2: 'bar',
			key3: 'foobar',
		};

		localStorageHandle.update( key, data );
		let recevied = localStorageHandle.get( key );

		expect( typeof recevied ).toBe( "object" );
		expect( recevied ).toStrictEqual( data );
	} );

});

describe('test shouldUpdateStorage', () => {
	test('do update', () => {
		expect(localStorageHandle.shouldUpdateStorage(KEY)).toBe(true);
	});

	test('do not update', () => {
		localStorageHandle.update(KEY, DATA);
		expect(localStorageHandle.shouldUpdateStorage(KEY)).toBe(false);
	});

	test('do update on timeout ', (done) => {
		localStorageHandle.update(KEY, DATA);
		expect(localStorageHandle.shouldUpdateStorage(KEY)).toBe(false);

		setTimeout(() => {
			expect(localStorageHandle.shouldUpdateStorage(KEY)).toBe(true);
			done();
		}, 11);
	});
});

test('purge storage by getKey', () => {
	localStorageHandle.update(KEY, DATA);
	expect(localStorageHandle.shouldUpdateStorage(KEY)).toBe(false);

	localStorageHandle.purge(KEY);
	expect(localStorageHandle.get(KEY)).toBe(null);
});
