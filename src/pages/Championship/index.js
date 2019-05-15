import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';
import { withChampionshipData } from './container';

import ballImage from '~/assets/soccer-ball.jpg';
import { backAction } from '~/utils/navigation';

const Championship = ({
  teamsList, gamesList, navigation, onRefresh, refreshing,
}) => {
  // eslint-disable-next-line react/prop-types
  const renderItem = path => ({ item }) => (
    <ListItem
      name={item.name}
      forePicture={{ uri: item.pictureURI }}
      backPicture={ballImage}
      onPress={() => navigation.navigate(path, { item })}
    />
  );

  const { championship } = navigation.state.params;

  return (
    <Container>
      <Header
        title={championship.name}
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
      />
      <ListContentBox
        title="Times"
        onAction={() => navigation.navigate('NewTeam', { championship })}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={teamsList}
        renderItem={renderItem('Team')}
        style={{ marginBottom: 20 }}
      />
      <ListContentBox
        title="Jogos"
        onAction={() => navigation.navigate('NewGame')}
        data={gamesList}
        renderItem={renderItem('Game')}
      />
    </Container>
  );
};

Championship.propTypes = {
  teamsList: PropTypes.array,
  gamesList: PropTypes.array,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Championship.defaultProps = {
  teamsList: [],
  gamesList: [],
  onRefresh: undefined,
  refreshing: false,
};

export default withChampionshipData(Championship);
