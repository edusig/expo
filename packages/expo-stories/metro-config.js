const { initAsync } = require('./build/cli/commands/init');
const { getStoriesDir, getStoriesFile } = require('./build/cli/shared');

async function withExpoStories(metroConfig) {
  await initAsync({
    projectRoot: metroConfig.projectRoot,
  });

  // TODO - add build async

  const storiesDir = getStoriesDir(metroConfig);
  const storyFile = getStoriesFile(metroConfig);

  metroConfig.resolver.extraNodeModules['generated-expo-stories'] = storyFile;
  metroConfig.watchFolders.push(storiesDir);

  return metroConfig;
}

module.exports = withExpoStories;
