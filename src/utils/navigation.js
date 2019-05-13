import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = routeName => StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName })],
});

const backAction = () => StackActions.pop({
  n: 1,
});

export { resetAction, backAction };
