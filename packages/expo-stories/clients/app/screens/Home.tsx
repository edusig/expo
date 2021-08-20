import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'expo-stories/components';
import * as React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';

import { getStoryData } from '../getStoryData';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

const storyData = getStoryData();

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export function Home({ navigation }: HomeProps) {
  const parentStories: any[] = [];

  Object.keys(storyData).forEach(key => {
    const parentStory: any = storyData[key];
    parentStories.push(parentStory);
  });

  function onStorySelected(story) {
    navigation.navigate('Selected Stories', { parentStoryId: story.id, title: story.title });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <ScrollView style={styles.storyButtonsContainer}>
          {parentStories.map((story: any) => {
            return (
              <Button key={story.id} label={story.title} onPress={() => onStorySelected(story)} />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
