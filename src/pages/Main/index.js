import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';
import { withChampionshipData } from './container';

import ballImage from '~/assets/soccer-ball.jpg';

const Main = ({
  navigation, championshipsList, onRefresh, refreshing,
}) => {
  // eslint-disable-next-line react/prop-types
  const renderChampionships = ({ item: championship }) => (
    <ListItem
      name={championship.name}
      forePicture={{ uri: championship.pictureURI }}
      backPicture={ballImage}
      onPress={() => navigation.navigate('Championship', { championship })}
    />
  );

  return (
    <Container>
      <Header title="iLab" />
      <ListContentBox
        title="Campeonatos"
        onAction={() => navigation.navigate('NewChampionship')}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={championshipsList}
        renderItem={renderChampionships}
      />
    </Container>
  );
};

Main.propTypes = {
  championshipsList: PropTypes.array,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Main.defaultProps = {
  championshipsList: [],
  onRefresh: undefined,
  refreshing: false,
};

export default withChampionshipData(Main);
