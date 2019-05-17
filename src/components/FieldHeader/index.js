import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, HeaderButton, HeaderIcon, HeaderTitle,
} from './styles';

const Header = ({ title, leftIcon, rightIcon }) => (
  <Container>
    {!!leftIcon && (
      <HeaderButton onPress={leftIcon.onPress}>
        <HeaderIcon name={leftIcon.name} />
      </HeaderButton>
    )}
    <HeaderTitle>{title}</HeaderTitle>
    {!!rightIcon && (
      <HeaderButton onPress={rightIcon.onPress}>
        <HeaderIcon name={rightIcon.name} />
      </HeaderButton>
    )}
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
  rightIcon: PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
};

Header.defaultProps = {
  leftIcon: {},
  rightIcon: {},
};

export default Header;
