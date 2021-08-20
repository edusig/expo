import glob from 'glob';

import { addStoriesAsync } from '../addStoriesAsync';

export async function buildAsync(config: any) {
  const { watchRoot } = config;

  const relPaths = glob.sync('**/*.stories.{tsx,ts,js,jsx}', {
    cwd: watchRoot,
    ignore: ['**/node_modules/**', '**/ios/**', '**/android/**'],
  });

  await addStoriesAsync(relPaths, config);
}
