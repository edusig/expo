import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';

import { getStoryData } from '../getStoryData';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

type SelectedStory = {
  id: string;
  name: string;
  component: React.FunctionComponent;
};

type SelectedStoriesDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Stories Detail'>;
  route: RouteProp<RootStackParamList, 'Stories Detail'>;
};

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config
// duplication is required as wrapping the require in a function breaks fast refresh
const stories = require('generated-expo-stories');
const storyData = getStoryData(stories);

const storiesById = Object.keys(storyData).reduce((acc, key) => {
  storyData[key].stories.forEach(story => {
    acc[story.id] = {
      ...story,
      component: stories[story.id] || null,
    };
  });

  return acc;
}, {});

export function SelectedStoriesDetail({ navigation, route }: SelectedStoriesDetailProps) {
  const { selectedStoryIds = [], displayStoryTitle = true } = route.params || {};
  const selectedStories: SelectedStory[] = selectedStoryIds.map(storyId => storiesById[storyId]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView style={styles.flexContainer}>
          {selectedStories.map(story => {
            return (
              <View key={`${story.id}`} style={styles.storyRow}>
                {displayStoryTitle && <Text style={styles.storyTitle}>{story?.name || ''}</Text>}
                {React.createElement(story.component)}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
