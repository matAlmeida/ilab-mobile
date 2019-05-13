import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 44px;
  margin-bottom: 20px;
`;

export const HeaderListCounter = styled.Text`
  color: #222;
  font-size: 18px;
  font-weight: bold;
`;

export const HeaderActionButton = styled.TouchableOpacity``;

export const HeaderIcon = styled(Icon).attrs({
  color: Colors.tintColor,
  size: 24,
})``;

export const HeaderTitle = styled.Text`
  color: #222;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
