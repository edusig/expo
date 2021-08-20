export type RootStackParamList = {
  Home: undefined;
  ['Selected Stories']: {
    title: string;
    parentStoryId: string;
  };
  ['Stories Detail']: {
    title: string;
    selectedStoryId: string;
    displayStoryTitle?: boolean;
  };
};
