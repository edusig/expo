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

const stories = require('generated-expo-stories');
const storyData = getStoryData();

export function SelectedStoriesDetail({ navigation, route }: SelectedStoriesDetailProps) {
  const { selectedStoryId = '', displayStoryTitle = true } = route.params || {};

  let selectedStories: SelectedStory[] = [];

  if (selectedStoryId !== '') {
    Object.keys(storyData).forEach(parentId => {
      if (selectedStoryId.includes(parentId)) {
        const matchingStories =
          storyData[parentId].stories
            .map(story => {
              if (story.id.startsWith(selectedStoryId)) {
                return {
                  ...story,
                  component: stories[story.id],
                };
              }

              return null;
            })
            .filter(Boolean) ?? [];

        selectedStories = [...selectedStories, ...matchingStories];
      }
    });
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView style={styles.flexContainer}>
          {selectedStories.map((story, index) => {
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
