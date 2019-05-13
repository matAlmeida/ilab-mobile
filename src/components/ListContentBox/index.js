import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  ListBox,
  List,
  EmptyText,
  HeaderContainer,
  HeaderListCounter,
  HeaderTitle,
  HeaderActionButton,
  HeaderIcon,
} from './styles';

const defaultKeyExtractor = item => item.id;

const ListContentBox = ({
  title, data, renderItem, onAction, keyExtractor, style,
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
      {!data && <EmptyText>Nenhum Item nessa Lista</EmptyText>}
      {!!data && <List data={data} renderItem={renderItem} keyExtractor={keyExtractor} />}
    </ListBox>
  </Container>
);

ListContentBox.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onAction: PropTypes.func,
  keyExtractor: PropTypes.func,
  style: ViewPropTypes.style,
};

ListContentBox.defaultProps = {
  data: [],
  renderItem: undefined,
  onAction: undefined,
  keyExtractor: defaultKeyExtractor,
  style: {},
};

export default ListContentBox;
