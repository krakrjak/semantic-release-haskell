import { fc, it } from '@fast-check/vitest';
import { describe, expectTypeOf } from 'vitest';

import { PluginConfig } from './PluginConfig';

describe('Test the PluginConfig interface', () => {
  it.concurrent.prop([
    fc.boolean(),
    fc.boolean(),
    fc.stringMatching(/\w+-\w+/),
    fc.stringMatching(/\w+-\w+/),
  ])(
    'should accept all valid configurations',
    (cabal, hpack, cabalFileBasename, hpackFileBasename) => {
      const cabalFile = `${cabalFileBasename}.cabal`;
      const hpackFile = `${hpackFileBasename}.yaml`;
      // cabal and hpack are required, therefore they show up in every test
      expectTypeOf({ cabal, hpack }).toMatchTypeOf<PluginConfig>();
      expectTypeOf({ cabal, hpack, cabalFile }).toMatchTypeOf<PluginConfig>();
      expectTypeOf({ cabal, hpack, hpackFile }).toMatchTypeOf<PluginConfig>();
      expectTypeOf({ cabal, hpack, hpackFile, cabalFile }).toMatchTypeOf<PluginConfig>();
    },
  );
});
