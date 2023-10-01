import { readdir } from 'fs/promises';
import { type PrepareContext } from 'semantic-release';

// Local imports
import { modifyFile } from './modifyFile';
import { PluginConfig } from './PluginConfig';

export const prepare = async (
  { hpack, cabal, cabalFile }: PluginConfig,
  { logger, nextRelease }: PrepareContext,
): Promise<void> => {
  if (hpack) {
    const candidateFile: string = `./package.yaml`;
    // Update the package.yaml version
    await modifyFile(candidateFile, nextRelease);
  }
  // if cabal is not requested, bail here!
  if (!cabal) {
    return;
  }

  // Time to hunt our .cabal file
  let candidateFile: string | undefined = undefined;
  if (cabalFile != null) {
    // Use the one provided by the user
    candidateFile = cabalFile;
  }

  // Well they want us to try Cabal so look for a .cabal file in this directory
  if (candidateFile == null) {
    const files = await readdir('./');
    for (const file of files) {
      if (file.endsWith(`.cabal`)) {
        candidateFile = file;
        // Stop when we find the first file
        // don't support multiple .cabal files (yet)
        break;
      }
    }
    // Tough break, we couldn't find one, maybe we aren't supposed to.
    if (candidateFile == null) {
      logger.info(`Cabal enabled, but couldn't find a .cabal file`);
      if (cabalFile != null) {
        logger.info(`Cabal file set to ${cabalFile}`);
      }
      return;
    }
  }
  // Update project .cabal file
  await modifyFile(candidateFile, nextRelease);
};
