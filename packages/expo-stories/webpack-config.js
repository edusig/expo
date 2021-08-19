const path = require('path');

const { initAsync } = require('./build/server/commands/init');
const { getStoriesFile } = require('./build/server/shared');

function withExpoStories(config, { projectRoot }) {
  initAsync({ projectRoot });

  const storyFile = getStoriesFile({ projectRoot });

  config.resolve.alias['generated-expo-stories'] = path.resolve(projectRoot, storyFile);

  return config;
}

module.exports = withExpoStories;
