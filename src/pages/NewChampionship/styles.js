import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const AddButton = styled.TouchableOpacity`
  height: 44px;
  background-color: ${props =>
    props.disabled ? Colors.lightGray : Colors.tintColor};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-radius: 4px;
`;

export const AddButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;
