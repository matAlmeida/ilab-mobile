import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Colors from '~/constants/Colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListBox = styled.ScrollView`
  width: 100%;
`;

export const List = styled(FlatList)`
  flex: 1;
  width: 100%;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.lightGray};
  text-align: center;
`;

export const RefreshButton = styled.TouchableOpacity`
  padding: 0 20px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 44px;
  margin-bottom: 20px;
`;

export const HeaderListCounter = styled.Text`
  color: #222;
  font-size: 18px;
  font-weight: bold;
`;

export const HeaderActionButton = styled.TouchableOpacity``;

export const HeaderIcon = styled(Icon).attrs({
  color: Colors.tintColor,
  size: 40,
})``;

export const HeaderTitle = styled.Text`
  color: #222;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
