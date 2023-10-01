import { PathLike } from 'fs';
import { readFile } from 'fs/promises';
import { type NextRelease } from 'semantic-release';
import { describe, expect, it } from 'vitest';
import { modifyFile, versionRE } from './modifyFile';

describe('', () => {
  it.concurrent.each([
    'version: 1.0.0',
    'version: 1.0.0 ',
    'version:    0.1.0',
    'version:    0.1.0 ',
    'version:    0.1.0.1',
    'version:    0.1.0.1.72',
    'version:    0.1.0.1.72   ',
  ])('"%s" should match versionRE', (str) => {
    expect(str.match(versionRE) == null).toBe(false);
  });

  it.concurrent.each(['./fixtures/fake-package.cabal', './fixtures/package.yaml'])(
    'Update %s to version 1.0.0',
    async (file: PathLike) => {
      const nextRelease: NextRelease = {
        type: 'major',
        version: '1.0.0',
        name: 'The Relaease!',
        channel: '@latest',
        gitTag: 'v1.0.0',
        gitHead: 'someshathatdoesnotmatter',
      };
      // Update the fixtures to version 1.0.0
      await modifyFile(file, nextRelease);
      const fileContents = await readFile(file, 'utf-8');
      const fileMatch = fileContents.match(versionRE);
      expect(fileMatch == null).toBe(false);
      expect(fileMatch![2]).toBe(nextRelease.version);

      // Note, if tests fail at this point and you can't make progess,
      // double check that the fixtures are OK. git reset --head them if
      // they have modifications. This test should both update and revert
      // the package fixture files.
      // Set them back to 0.1.0
      const oldRelease = { ...nextRelease, version: '0.1.0' };
      await modifyFile(file, oldRelease);
      const fixedContents = await readFile(file, 'utf-8');
      const fixedMatch = fixedContents.match(versionRE);
      expect(fixedMatch == null).toBe(false);
      expect(fixedMatch![2]).toBe(oldRelease.version);
    },
  );
});
