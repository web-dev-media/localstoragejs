const localsorage = require('../localstorage.js');

const spyError = jest.spyOn( console, 'error' );
const spyWarn = jest.spyOn( console, 'warn' );

beforeEach( () => {
  spyError.mockReset();
  spyWarn.mockReset();
} );

test('a test', () => {
  const testObj = 42;
});
