import { Input as ElementInput } from 'react-native-elements';
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

export const Input = styled(ElementInput).attrs({
  containerStyle: {
    marginVertical: 15,
    width: '90%',
  },
  inputStyle: {
    fontSize: 18,
  },
  inputContainerStyle: {
    width: '100%',
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: Colors.tintColor,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
})``;
