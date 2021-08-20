import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { getStoryData, StoryFile } from './getStoryData';
import { SelectedStoriesDetail } from './screens/SelectedStoryDetails';
import { SelectedStoriesList } from './screens/SelectedStoryList';
import { StoryFilesList } from './screens/StoryFilesList';
import { RootStackParamList } from './types';

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config
const stories = require('generated-expo-stories');
const storyData = getStoryData(stories);

const RNStack = createStackNavigator<RootStackParamList>();

export function App({ title = '' }) {
  const defaultStoryFile = getDefaultFile();

  return (
    <RNStack.Navigator>
      {Boolean(defaultStoryFile === undefined) && (
        <RNStack.Screen name="Story Files" component={StoryFilesList} />
      )}
      <RNStack.Screen
        name="Selected Stories"
        component={SelectedStoriesList}
        options={({ route }) => ({
          title: route.params?.title || '',
        })}
        initialParams={{
          title: defaultStoryFile?.title || '',
          storyFileIds: [defaultStoryFile?.id] || [],
        }}
      />
      <RNStack.Screen
        name="Stories Detail"
        component={SelectedStoriesDetail}
        options={({ route }) => ({
          title: route.params?.title || '',
        })}
      />
    </RNStack.Navigator>
  );
}

// if there is only one story file, there is no need to show the home screen
// instead pass this file by default to SelectedStoriesList
function getDefaultFile() {
  const storyFileIds = Object.keys(storyData);

  let defaultStoryFile: StoryFile | undefined = undefined;

  if (storyFileIds.length === 1) {
    defaultStoryFile = storyData[storyFileIds[0]];
  }

  return defaultStoryFile;
}
