import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, HeaderButton, HeaderIcon, HeaderTitle,
} from './styles';

const Header = ({ title, leftIcon }) => (
  <Container>
    {!!leftIcon && (
      <HeaderButton onPress={leftIcon.onPress}>
        <HeaderIcon name={leftIcon.name} />
      </HeaderButton>
    )}
    <HeaderTitle>{title}</HeaderTitle>
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
};

Header.defaultProps = {
  leftIcon: {},
};

export default Header;
