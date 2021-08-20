import { StackNavigationProp } from '@react-navigation/stack';
import { ListRow } from 'expo-stories/components';
import * as React from 'react';
import { View, SafeAreaView, ScrollView, Button } from 'react-native';

import { StoryFile } from '../getStoryData';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config
// duplication is required as wrapping the require in a function breaks fast refresh
const stories = require('generated-expo-stories');

const storiesByFile = Object.keys(stories).reduce((acc, key) => {
  const story = stories[key];

  if (!acc[story.file.id]) {
    acc[story.file.id] = {
      ...story.file,
    };
  }

  return acc;
}, {});

type StoryFilesListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Story Files'>;
};

export function StoryFilesList({ navigation }: StoryFilesListProps) {
  const [selectedFileIds, setSelectedFileIds] = React.useState([]);
  const [multiSelectActive, setSelectMultipleFiles] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const label = multiSelectActive ? 'Cancel' : 'Select';

        function handlePress() {
          setSelectedFileIds([]);
          setSelectMultipleFiles(!multiSelectActive);
        }

        return <Button title={label} onPress={handlePress} />;
      },
    });
  }, [navigation, multiSelectActive]);

  const storyFileIds = Object.keys(storiesByFile);

  function onFileSelected(storyFile: StoryFile) {
    if (multiSelectActive) {
      setSelectedFileIds(currIds =>
        currIds.includes(storyFile.id)
          ? currIds.filter(i => i !== storyFile.id)
          : [...currIds, storyFile.id]
      );
    } else {
      navigation.navigate('Selected Stories', {
        storyFileIds: [storyFile.id],
        title: storyFile.title,
      });
    }
  }

  function onSeeMultipleSelected() {
    navigation.navigate('Selected Stories', {
      storyFileIds: multiSelectActive ? selectedFileIds : storyFileIds,
      title: 'SelectedStories',
    });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <ScrollView>
          {storyFileIds.map(fileId => {
            const storyFile = storiesByFile[fileId];
            const isSelected = selectedFileIds.includes(fileId);
            return (
              <ListRow
                key={storyFile.id}
                label={storyFile.title}
                isSelected={isSelected}
                multiSelectActive={multiSelectActive}
                onPress={() => onFileSelected(storyFile)}
              />
            );
          })}
          {storyFileIds.length > 1 && (
            <ListRow
              label={multiSelectActive ? 'See Selected' : 'See All'}
              variant="tertiary"
              onPress={onSeeMultipleSelected}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
