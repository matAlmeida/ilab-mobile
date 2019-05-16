import React from 'react';
import PropTypes from 'prop-types';

import FieldHeader from '~/components/FieldHeader';
import FieldBackground from '~/components/FieldBackground';

import { Container } from './styles';

import { backAction } from '~/utils/navigation';

const Field = ({ playersList, navigation }) => (
  <Container>
    <FieldBackground />
    <FieldHeader
      title="Partida"
      leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
    />
  </Container>
);

Field.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Field.defaultProps = {};

export default Field;
