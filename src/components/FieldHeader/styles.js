import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${getStatusBarHeight() + 20}px 20px 20px 0;
  background-color: #fff;
`;

export const HeaderButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const HeaderIcon = styled(Icon).attrs({
  color: Colors.tintColor,
  size: 24,
})``;

export const HeaderTitle = styled.Text`
  color: #222;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
  flex: 1;
`;
