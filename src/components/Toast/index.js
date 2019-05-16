import { StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import timer from 'react-native-timer';

import Colors from '~/constants/Colors';

const showToster = ({ message, type = 'error' }) => {
  const toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textColor: type === 'error' ? 'red' : Colors.tintColor,
    textStyle: { fontWeight: 'bold' },
    backgroundColor: '#fff',
    opacity: 1,
    containerStyle: { borderRadius: 40, borderWidth: StyleSheet.hairlineWidth },
  });

  timer.setTimeout(
    'hideToaster',
    () => {
      Toast.hide(toast);
    },
    3000,
  );
};

export default showToster;
