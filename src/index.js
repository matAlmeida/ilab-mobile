import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import '~/config/ReactotronConfig';

import { Provider } from 'react-redux';
import store from './store';

import Routes from '~/routes';

const App = () => {
  // Dependencies Warnings
  YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
  YellowBox.ignoreWarnings(['Require cycle: node_modules/rn-fetch-blob/index.js']);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <Routes />
    </Provider>
  );
};

export default App;
