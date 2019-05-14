import React from 'react';
import PropTypes from 'prop-types';
import * as uuid from 'uuid';

import Header from '~/components/Header';

import { Container } from './styles';

import { backAction } from '~/utils/navigation';
import { insertNewChampionship } from '~/services/database';

const addChampionship = () => {
  insertNewChampionship({
    id: uuid.v4(),
    name: 'Barclays Premier',
    pictureURI:
      'https://www.webcup.com.br/static/images/league/200x200/barclays-premier-league-1461774804.jpg',
  })
    .then(item => console.log(item))
    .catch(error => console.error(error));
};

const NewChampionship = ({ navigation }) => (
  <Container>
    <Header
      title="Novo Campeonato"
      leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
    />
  </Container>
);

NewChampionship.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default NewChampionship;
