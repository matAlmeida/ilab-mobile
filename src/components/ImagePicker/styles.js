import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View``;

export const AddImageButton = styled.TouchableOpacity`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: ${StyleSheet.hairlineWidth}px solid black;
  background-color: ${Colors.lightGray};
  justify-content: center;
  align-items: center;
`;

export const CameraIcon = styled(Icon).attrs({
  color: '#fff',
  size: 50,
  name: 'camera-alt',
})``;

export const Picture = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;
