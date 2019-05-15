import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import Main from '~/pages/Main';
import Championship from '~/pages/Championship';
import NewChampionship from '~/pages/NewChampionship';
import NewTeam from '~/pages/NewTeam';
import NewGame from '~/pages/NewGame';

const Navigator = createStackNavigator(
  {
    Main: { screen: Main, navigationOptions: { header: null } },
    Championship: { screen: Championship, navigationOptions: { header: null } },
    NewChampionship: { screen: NewChampionship, navigationOptions: { header: null } },
    NewTeam: { screen: NewTeam, navigationOptions: { header: null } },
    NewGame: { screen: NewGame, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'Main',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.step0,
        timing: Animated.timing,
      },
    }),
  },
);

const Routes = createAppContainer(Navigator);

export default Routes;
