const { initAsync } = require('./build/server/commands/init');
const { getStoriesDir, getStoriesFile } = require('./build/server/shared');

function withExpoStories(metroConfig) {
  initAsync({
    projectRoot: metroConfig.projectRoot,
  });

  const storiesDir = getStoriesDir(metroConfig);
  const storyFile = getStoriesFile(metroConfig);

  metroConfig.resolver.extraNodeModules['generated-expo-stories'] = storyFile;

  metroConfig.watchFolders.push(storiesDir);

  return metroConfig;
}

module.exports = withExpoStories;
