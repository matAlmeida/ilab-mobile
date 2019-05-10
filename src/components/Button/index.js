import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ElementButton } from 'react-native-elements';

import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: Colors.tintColor,
    elevation: 0,
  },
  wideStyle: {
    flex: 1,
    width: '100%',
  },
});

const Button = ({ style, ...rest }) => (
  <ElementButton
    {...rest}
    loadingProps={{ size: 'large', color: 'white' }}
    loadingStyle={styles.wideStyle}
    buttonStyle={[styles.buttonStyle, style]}
    titleStyle={styles.wideStyle}
  />
);

export default Button;
