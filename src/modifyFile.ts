import { PathLike } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { type NextRelease } from 'semantic-release';

export const versionRE = /version: (\s*)(\d+\.(\d+\.)+\d+)\s*/;

export const modifyFile = async (file: PathLike, nextRelease: NextRelease): Promise<void> => {
  const fileContents = await readFile(file, 'utf-8');
  await writeFile(
    file,
    fileContents.replace(versionRE, `version: $1${nextRelease.version}\n`),
    'utf-8',
  );
};
