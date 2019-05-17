import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex-direction: column-reverse;
`;

export const NumberBox = styled.View`
  background-color: ${props => (props.hasBall ? 'red' : '#6e72ef')};
  padding: 5px;
  margin-top: -5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const NumberText = styled.Text`
  color: #fff;
`;

export const PlayerPicture = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  border-width: 4;
  border-color: ${props => (props.hasBall ? 'red' : '#6e72ef')};
`;
