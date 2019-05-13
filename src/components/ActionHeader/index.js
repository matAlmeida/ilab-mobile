import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  HeaderListCounter,
  HeaderTitle,
  HeaderActionButton,
  HeaderIcon,
} from './styles';

const ActionHeader = ({ counter, title, action: { icon, onPress } }) => (
  <Container>
    <HeaderListCounter>{counter}</HeaderListCounter>
    <HeaderTitle>{title}</HeaderTitle>
    <HeaderActionButton onPress={onPress}>
      <HeaderIcon name={icon} />
    </HeaderActionButton>
  </Container>
);

export default ActionHeader;

ActionHeader.propTypes = {
  counter: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.exact({ icon: PropTypes.string.isRequired, onPress: PropTypes.func })
    .isRequired,
};
