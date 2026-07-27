

export type TabParamList = {
  About : undefined;
  History: undefined;
  Tourism: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}