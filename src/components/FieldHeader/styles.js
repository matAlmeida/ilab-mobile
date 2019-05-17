import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 20px 20px 20px 0px;
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
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
`;
