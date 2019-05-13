import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Championship from '~/pages/Championship';

const Navigator = createSwitchNavigator(
  { Main, Championship },
  { order: ['Main', 'Championship'] },
);

const Routes = createAppContainer(Navigator);

export default Routes;
