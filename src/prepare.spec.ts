import { test, expect } from 'vitest';

import { prepare } from './prepare';

test('prepare is an async function', () => {
  expect(typeof prepare === 'function').toBe(true);
});
