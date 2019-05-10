import { StyleSheet } from 'react-native';

import Layout from '~/constants/Layout';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 15,
    width: Layout.window.width * 0.9,
  },
  inputContainerStyle: {
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: Colors.tintColor,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  inputStyle: {
    fontSize: 18,
  },
  labelStyle: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'normal',
    color: Colors.tintColor,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
});

export default styles;
