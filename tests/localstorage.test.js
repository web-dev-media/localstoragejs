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

describe('Test handle options', () => {
	test('should set option cacheTime', () => {
		localsorageHandle.options.cacheTime = TIME;
		expect(localsorageHandle.options.cacheTime).toBe(10);
	});

	test('should set multiple cacheTimeKeys', () => {
		let keys = ['key1', 'key2', 'key3'];

		for (var i = 0; i < keys.length; i++) {
			let cacheKey = 'multiple_' + keys[i];
			localsorageHandle.update(cacheKey, keys);
			expect(localsorageHandle.options.cacheTimetKey).toBe(cacheKey + '_cacheTime');
		}
	});

	test('should set cacheKey directly', () => {
		localsorageHandle.options.cacheKey = KEY;
		expect(localsorageHandle.options.cacheKey).toBe(KEY);
	});

});

describe('Receiving data from localStorage add fromLocalstorage = true', () => {
	test( 'typeof string', () => {
		let key = 'stringTest';
		let data = 'bar';

		localsorageHandle.update( key, data );
		let recevied = localsorageHandle.get( key );

		expect( typeof recevied ).toBe( "object" );
		expect( recevied.fromLocalstorage ).toBe( true );

		expect( typeof recevied.entry ).toBe( "string" );
		expect( recevied.entry ).toStrictEqual( data );
	} );

	test( 'typeof array', () => {
		let key = 'arrayTest';
		let data = ['key1', 'key2', 'key3'];

		localsorageHandle.update( key, data );
		let recevied = localsorageHandle.get( key );

		expect( typeof recevied ).toBe( "object" );
		expect( recevied.fromLocalstorage ).toBe( true );

		expect( Array.isArray(recevied.entry) ).toBe( true );
		expect( recevied.entry ).toStrictEqual( data );
	} );


	test( 'typeof object', () => {
		let key = 'objectTest';
		let data = {
			key1: 'foo',
			key2: 'bar',
			key3: 'foobar',
		};

		localsorageHandle.update( key, data );
		let recevied = localsorageHandle.get( key );

		expect( typeof recevied ).toBe( "object" );
		expect( recevied.fromLocalstorage ).toBe( true );

		expect( typeof recevied.entry ).toBe( "object" );
		expect( recevied.entry ).toStrictEqual( data );
	} );

});

describe('test shouldUpdateStorage', () => {
	test('do update', () => {
		expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);
	});

	test('do not update', () => {
		localsorageHandle.update(KEY, DATA);
		expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);
	});

	test('do update on timeout ', (done) => {
		localsorageHandle.update(KEY, DATA);
		expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);

		setTimeout(() => {
			expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(true);
			done();
		}, 11);
	});
});

test('purge storage by getKey', () => {
	localsorageHandle.update(KEY, DATA);
	expect(localsorageHandle.shouldUpdateStorage(KEY)).toBe(false);

	localsorageHandle.purge(KEY);
	expect(localsorageHandle.get(KEY)).toBe(null);
});
