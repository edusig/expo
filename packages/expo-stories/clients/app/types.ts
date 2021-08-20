export type RootStackParamList = {
  ['Story Files']: undefined;
  ['Selected Stories']: {
    title: string;
    storyFileIds: string[];
  };
  ['Stories Detail']: {
    title: string;
    selectedStoryIds: string[];
    displayStoryTitle?: boolean;
  };
};
