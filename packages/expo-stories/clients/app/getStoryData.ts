export function getStoryData() {
  // this is resolved via customization (extraNodeModules) in metro-config / webpack-config
  const stories = require('generated-expo-stories');

  // aggregate stories
  const storyData = {};

  Object.keys(stories).forEach(key => {
    const story = stories[key];
    const storyConfig = story.storyConfig;
    const parentConfig = story.parentConfig;

    if (!storyData[parentConfig.id]) {
      storyData[parentConfig.id] = {
        ...parentConfig,
        stories: [],
      };
    }

    storyData[parentConfig.id].stories.push({
      ...storyConfig,
      parentId: parentConfig.id,
    });
  });

  return storyData;
}
