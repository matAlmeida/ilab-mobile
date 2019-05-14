import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';

import { backAction } from '~/utils/navigation';

const Championship = ({ teamsList, gamesList, navigation }) => {
  // eslint-disable-next-line react/prop-types
  const renderItem = path => ({ item }) => {
    const ballImage = 'https://media.tmicdn.com/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/s/o/soccer-ball-temporary-tattoo_1701.jpg';
    return (
      <ListItem
        name={item.title}
        forePictureURI={item.pictureURI}
        backPictureURI={ballImage}
        onPress={navigation.navigate(path, { item })}
      />
    );
  };

  const { name } = navigation.state.params.championship;

  return (
    <Container>
      <Header
        title={name}
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
      />
      <ListContentBox
        title="Times"
        onAction={() => navigation.navigate('NewTeam')}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Championship.defaultProps = {
  teamsList: [],
  gamesList: [],
};

export default Championship;
