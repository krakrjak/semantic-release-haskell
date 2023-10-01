import { expect, test } from 'vitest';

// Checking the important exports for semantic-release
import { foo, prepare } from './index';

// prepare's properties
test('prepare function is exported', () => {
  expect(prepare != undefined).toBe(true);
  expect(typeof prepare === 'function').toBe(true);
});

// foo's properties
test('foo outputs a specific goldent string', () => {
  expect(foo()).toBe(`There's your monkey`);
});

test('foo outputs a value of type string', () => {
  expect(typeof foo() == 'string').toBe(true);
});
test('foo is a function', () => {
  expect(typeof foo === 'function').toBe(true);
});
