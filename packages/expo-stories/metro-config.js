const { initAsync } = require('./build/src/cli/commands/watch');
const { getStoriesDir, getStoriesFile } = require('./build/src/cli/shared');

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
