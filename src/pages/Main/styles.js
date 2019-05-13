import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const AppTitle = styled.Text`
  color: #222;
  height: 44px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 40px 0;
`;

export const ChampionshipsBox = styled.View`
  flex: 1;
  align-items: center;
`;

export const ChampionshipsListBox = styled.ScrollView`
  width: 100%;
`;

export const ChampionshipsList = styled(FlatList)`
  flex: 1;
  width: 100%;
`;
