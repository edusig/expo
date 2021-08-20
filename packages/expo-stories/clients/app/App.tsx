import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { getStoryData } from './getStoryData';
import { Home } from './screens/Home';
import { SelectedStoriesDetail } from './screens/SelectedStoryDetails';
import { SelectedStoriesList } from './screens/SelectedStoryList';
import { RootStackParamList } from './types';

const storyData = getStoryData();

const RNStack = createStackNavigator<RootStackParamList>();

export function App({ title = '' }) {
  const parentStoryIds = Object.keys(storyData);

  return (
    <RNStack.Navigator>
      {parentStoryIds.length > 1 && (
        <RNStack.Screen name="Home" component={Home} options={{ title }} />
      )}
      <RNStack.Screen
        name="Selected Stories"
        component={SelectedStoriesList}
        options={({ route }) => {
          return {
            title: route.params?.title || '',
          };
        }}
        initialParams={{
          title: parentStoryIds.length === 1 ? storyData[parentStoryIds[0]].title : '',
          parentStoryId: parentStoryIds.length === 1 ? parentStoryIds[0] : undefined,
        }}
      />
      <RNStack.Screen
        name="Stories Detail"
        component={SelectedStoriesDetail}
        options={({ route }) => {
          return {
            title: route.params.title || '',
          };
        }}
      />
    </RNStack.Navigator>
  );
}
