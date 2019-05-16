import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex-direction: column-reverse;
`;

export const NumberBox = styled.View`
  background-color: #6e72ef;
  padding: 5px;
  margin-top: -5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const NumberText = styled.Text`
  color: #fff;
`;

export const PlayerPicture = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border-width: 2;
  border-color: #6e72ef;
`;
