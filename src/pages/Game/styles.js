import { StyleSheet } from 'react-native';
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
  border-radius: 72px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: #222;
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
  background-color: ${props =>
    props.disabled ? Colors.lightGray : Colors.tintColor};
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

export const FilterBox = styled.View`
  margin-top: 10px;
  width: 90%;
`;

export const FilterTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

export const SliderBox = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const SliderValueBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 5px;
  border: 1px solid lightgray;
  align-items: center;
  justify-content: center;
`;

export const SliderValueText = styled.Text`
  font-size: 14px;
  color: black;
`;
