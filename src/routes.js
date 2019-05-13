import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import Main from '~/pages/Main';
import Championship from '~/pages/Championship';

const Routes = createAppContainer(createSwitchNavigator({ Championship }));

export default Routes;
