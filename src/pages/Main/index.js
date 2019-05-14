import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';
import { withChampionshipData } from './container';

import ballImage from '~/assets/soccer-ball.jpg';

const Main = ({ navigation, championshipsList, onRefresh }) => {
  // eslint-disable-next-line react/prop-types
  const renderChampionships = ({ item: championship }) => (
    <ListItem
      name={championship.name}
      forePicture={{ uri: championship.pictureURI }}
      backPicture={ballImage}
      onPress={() => navigation.navigate('Championship', { championship })}
      onRefresh={onRefresh}
    />
  );

  return (
    <Container>
      <Header title="iLab" />
      <ListContentBox
        title="Campeonatos"
        onAction={() => navigation.navigate('NewChampionship')}
        data={championshipsList}
        renderItem={renderChampionships}
      />
    </Container>
  );
};

Main.propTypes = {
  championshipsList: PropTypes.array,
  onRefresh: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Main.defaultProps = {
  championshipsList: [],
  onRefresh: undefined,
};

export default withChampionshipData(Main);
