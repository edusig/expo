import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { SelectedStoriesDetail } from './screens/SelectedStoryDetails';
import { SelectedStoryFilesList } from './screens/SelectedStoryFilesList';
import { StoryFilesList } from './screens/StoryFilesList';
import { RootStackParamList } from './types';

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config

const RNStack = createStackNavigator<RootStackParamList>();

export function App({ title = '' }) {
  return (
    <RNStack.Navigator>
      <RNStack.Screen name="Story Files" component={StoryFilesList} options={{ title }} />
      <RNStack.Screen
        name="Selected Stories"
        component={SelectedStoryFilesList}
        options={({ route }) => ({
          title: route.params?.title || '',
        })}
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

// // if there is only one story file, there is no need to show the home screen
// // instead pass this file by default to SelectedStoryFilesList
// function getDefaultFile() {
//   const storyFileIds = Object.keys(storyData);

//   let defaultStoryFile: StoryFile | undefined = undefined;

//   if (storyFileIds.length === 1) {
//     defaultStoryFile = storyData[storyFileIds[0]];
//   }

//   return defaultStoryFile;
// }
