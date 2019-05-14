import React from 'react';
import { ViewPropTypes, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  ListBox,
  List,
  EmptyText,
  RefreshButton,
  HeaderContainer,
  HeaderListCounter,
  HeaderTitle,
  HeaderActionButton,
  HeaderIcon,
} from './styles';

const defaultKeyExtractor = item => item.id;

const ListContentBox = ({
  title,
  data,
  renderItem,
  onAction,
  keyExtractor,
  style,
  onRefresh,
  refreshing,
}) => (
  <Container style={style}>
    <HeaderContainer>
      <HeaderListCounter>{data.length}</HeaderListCounter>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderActionButton onPress={onAction}>
        <HeaderIcon name="add-circle" />
      </HeaderActionButton>
    </HeaderContainer>
    <ListBox>
      {data.length > 0 ? (
        <List
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        />
      ) : (
        <RefreshButton onPress={onRefresh}>
          <EmptyText>Nenhum item nessa lista. Recarregar?</EmptyText>
        </RefreshButton>
      )}
    </ListBox>
  </Container>
);

ListContentBox.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onAction: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  keyExtractor: PropTypes.func,
  style: ViewPropTypes.style,
};

ListContentBox.defaultProps = {
  data: [],
  renderItem: undefined,
  onAction: undefined,
  onRefresh: undefined,
  refreshing: false,
  keyExtractor: defaultKeyExtractor,
  style: {},
};

export default ListContentBox;
