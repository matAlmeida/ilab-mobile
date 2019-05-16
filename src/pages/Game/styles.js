import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  flex: 1;
`;

export const TeamInfoContainer = styled.View`
  flex-direction: row;
  height: 125px;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const TeamInfoImage = styled.Image`
  height: 125px;
  width: 125px;
`;

export const TeamInfoBox = styled.View`
  justify-content: space-around;
  margin-left: 20px;
`;

export const TeamName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const TitleBox = styled.View`
  flex-direction: row;
`;

export const TeamButtonBox = styled.View`
  flex-direction: row;
`;

export const TeamPlayButton = styled.TouchableOpacity`
  height: 44px;
  background-color: ${props => (props.disabled ? Colors.lightGray : Colors.tintColor)};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-radius: 4px;
  margin-right: 20px;
`;

export const TeamPlayButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

export const WarningIcon = styled(Icon).attrs({
  size: 30,
  color: 'red',
  name: 'warning',
})``;

export const WarningButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
