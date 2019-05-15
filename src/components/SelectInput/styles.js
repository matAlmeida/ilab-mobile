import { Picker as RNPicker } from 'react-native';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const InputLabel = styled.Text`
  position: absolute;
  text-align: center;
  font-weight: normal;
  color: ${Colors.tintColor};
  background-color: white;
  padding: 5px;
  margin-left: 20px;
`;

export const InputContainer = styled.View`
  margin: 15px 0;
  width: 100%;
  border-bottom-width: 2px;
  border-width: 2px;
  border-color: ${Colors.tintColor};
  border-radius: 5px;
  padding: 15px 5px;
`;

export const IosPickerBox = styled.View`
  margin: 15px 0;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

export const IosPickerText = styled.Text`
  font-size: 18px;
`;

export const Picker = styled(RNPicker).attrs({
  itemStyle: {
    fontSize: 18,
  },
})``;
