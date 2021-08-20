import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListRow } from 'expo-stories/components';
import * as React from 'react';
import { SafeAreaView, ScrollView, Button } from 'react-native';

import { getStoryData, StoriesExport, StoryConfig, StoryFile } from '../getStoryData';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

type SelectedStoriesListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Selected Stories'>;
  route: RouteProp<RootStackParamList, 'Selected Stories'>;
};

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config
// duplication is required as wrapping the require in a function breaks fast refresh
const stories: StoriesExport = require('generated-expo-stories');
const storyData = getStoryData(stories);

const storiesByFile = Object.keys(stories).reduce((acc, key) => {
  const story = stories[key];

  if (!acc[story.file.id]) {
    acc[story.file.id] = [];
  }

  acc[story.file.id].push(key);

  return acc;
}, {});

const storiesById = Object.keys(stories).reduce((acc, id) => {
  const story = stories[id];

  acc[story.storyConfig.id] = {
    ...story.storyConfig,
    component: stories[story.storyConfig.id] || null,
  };

  return acc;
}, {});

export function SelectedStoriesList({ navigation, route }: SelectedStoriesListProps) {
  const [multiSelectActive, setSelectMultipleStories] = React.useState(false);
  const [selectedStoryIds, setSelectedStoryIds] = React.useState<string[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const label = multiSelectActive ? 'Cancel' : 'Select';

        function handlePress() {
          setSelectedStoryIds([]);
          setSelectMultipleStories(!multiSelectActive);
        }

        return <Button title={label} onPress={handlePress} />;
      },
    });
  }, [navigation, multiSelectActive]);

  const storyFiles: StoryFile[] = [];

  const { storyFileIds = [] } = route.params || {};

  const availableStoryIds: string[] = [];

  storyFileIds.forEach(fileId => {
    const matchingStories = storiesByFile[fileId];
    availableStoryIds.push(...matchingStories);
  });

  Object.keys(storyData).forEach(key => {
    if (storyFileIds.includes(key)) {
      storyFiles.push(storyData[key]);
    }
  });

  function onStorySelected(story: StoryConfig) {
    if (multiSelectActive) {
      setSelectedStoryIds(currIds =>
        currIds.includes(story.id) ? currIds.filter(i => i !== story.id) : [...currIds, story.id]
      );
    } else {
      navigation.navigate('Stories Detail', {
        selectedStoryIds: [story.id],
        title: story.name,
      });
    }
  }

  function onSeeMultipleSelected() {
    navigation.navigate('Stories Detail', {
      selectedStoryIds: multiSelectActive ? selectedStoryIds : availableStoryIds,
      title: '',
    });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={styles.flexContainer}>
        {availableStoryIds.map(id => {
          const s = storiesById[id];
          const isSelected = selectedStoryIds.includes(s.id);
          return (
            <ListRow
              key={s.id}
              label={s.name}
              variant="ghost"
              isSelected={isSelected}
              multiSelectActive={multiSelectActive}
              onPress={() => onStorySelected(s)}
            />
          );
        })}
        {availableStoryIds.length > 1 && (
          <ListRow
            label={multiSelectActive ? 'See Selected' : 'See All'}
            variant="tertiary"
            onPress={onSeeMultipleSelected}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
