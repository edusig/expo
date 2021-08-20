export type StoriesExport = Record<
  string,
  {
    storyConfig: {
      id: string;
      name: string;
    };
    file: {
      id: string;
      title: string;
    };
  }
>;

export type StoryConfig = {
  id: string;
  name: string;
  parentId: string;
};

export type StoryFile = {
  id: string;
  stories: StoryConfig[];
  title: string;
};

export function getStoryData(stories: StoriesExport) {
  const storyData: Record<string, StoryFile> = {};

  Object.keys(stories).forEach(key => {
    const story = stories[key];

    const storyConfig = story.storyConfig;
    const file = story.file;

    if (!storyData[file.id]) {
      storyData[file.id] = {
        ...file,
        stories: [],
      };
    }

    storyData[file.id].stories.push({
      ...storyConfig,
      parentId: file.id,
    });
  });

  return storyData;
}
