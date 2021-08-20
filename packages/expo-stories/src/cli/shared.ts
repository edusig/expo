import path from 'path';

import { StoryOptions, StoryManifest } from '../../types';

export const storiesDirName = '__generated__/stories';

export const defaultConfig: StoryOptions = {
  projectRoot: process.cwd(),
  watchRoot: process.cwd(),
};

export function getManifestFilePath(projectRoot: string) {
  const manifestFilePath = path.resolve(projectRoot, storiesDirName, 'storyManifest.json');
  return manifestFilePath;
}

export function getStoryManifest(projectRoot: string): StoryManifest {
  const manifestFilePath = getManifestFilePath(projectRoot);
  const storyManifest = require(manifestFilePath);
  return storyManifest;
}

export function getStories(config: StoryOptions) {
  const storyManifest = getStoryManifest(config.projectRoot);
  const stories = Object.keys(storyManifest.files).map(key => {
    return storyManifest.files[key];
  });

  return stories;
}

export function getStoriesDir(config: StoryOptions) {
  const storiesDir = path.resolve(config.projectRoot, storiesDirName);
  return storiesDir;
}

export function getStoriesFile(config: StoryOptions) {
  const storiesDir = getStoriesDir(config);
  const storyFile = path.resolve(storiesDir, 'stories.js');
  return storyFile;
}

export function generateId(filePath: string) {
  // replaces all non-alphabet characters in the filePath
  const id = filePath.replace(/[^a-zA-Z]+/gi, '');
  return id;
}
