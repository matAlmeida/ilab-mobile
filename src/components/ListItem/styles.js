import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: 75px;
  width: 100%;
  justify-content: center;
  padding: 20px;
`;

export const ListItemImageBox = styled.View`
  flex-direction: row;
  height: 55px;
  width: 92px;
`;

export const ListItemPicture = styled.Image`
  height: 55px;
  width: 55px;
  border-radius: 27px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: #222;
`;

export const ListItemSportPicture = styled.Image`
  height: 55px;
  width: 55px;
  border-radius: 27px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: #222;
  position: absolute;
  left: 38px;
`;

export const ListItemNameBox = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ListItemName = styled.Text`
  color: #222;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;
