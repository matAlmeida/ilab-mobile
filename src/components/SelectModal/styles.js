import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 40px 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin: 40px 0;
`;

export const OptionButton = styled.TouchableOpacity`
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const OptionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
