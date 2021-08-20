import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'expo-stories/components';
import * as React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';

import { getStoryData } from '../getStoryData';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

type SelectedStoriesListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Selected Stories'>;
  route: RouteProp<RootStackParamList, 'Selected Stories'>;
};

const storyData: any = getStoryData();

export function SelectedStoriesList({ navigation, route }: SelectedStoriesListProps) {
  const parentStories: any = [];

  const { parentStoryId = '' } = route.params || {};

  Object.keys(storyData).forEach(key => {
    if (key === parentStoryId) {
      parentStories.push(storyData[key]);
    }
  });

  function onStorySelected(story, displayStoryTitle = false) {
    navigation.navigate('Stories Detail', {
      selectedStoryId: story.id,
      title: story.name,
      displayStoryTitle,
    });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={styles.flexContainer}>
        {parentStories.map(story => {
          return (
            <View key={story.id} style={styles.storyButtonRow}>
              {story.stories.map(s => {
                return <Button key={s.id} label={s.name} onPress={() => onStorySelected(s)} />;
              })}
              {story.stories.length > 1 && (
                <Button
                  label="See All"
                  variant="tertiary"
                  onPress={() => onStorySelected(story, true)}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
