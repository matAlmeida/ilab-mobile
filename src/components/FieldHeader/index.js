import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, HeaderButton, HeaderIcon, HeaderTitle,
} from './styles';

const Header = ({ title, leftIcon, rightIcons }) => (
  <Container>
    {!!leftIcon && (
      <HeaderButton onPress={leftIcon.onPress}>
        <HeaderIcon name={leftIcon.name} />
      </HeaderButton>
    )}
    <HeaderTitle>{title}</HeaderTitle>
    {!!rightIcons
      && rightIcons.map(icon => (
        <HeaderButton key={icon.name} onPress={icon.onPress}>
          <HeaderIcon name={icon.name} type={icon.type} />
        </HeaderButton>
      ))}
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
  rightIcons: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
  ),
};

Header.defaultProps = {
  leftIcon: {},
  rightIcons: [],
};

export default Header;
