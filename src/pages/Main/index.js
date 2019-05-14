import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';

const Main = ({ navigation, championshipsList }) => {
  // eslint-disable-next-line react/prop-types
  const renderChampionships = ({ item: championship }) => {
    const ballImage = 'https://media.tmicdn.com/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/s/o/soccer-ball-temporary-tattoo_1701.jpg';

    return (
      <ListItem
        name={championship.name}
        forePictureURI={championship.pictureURI}
        backPictureURI={ballImage}
        onPress={navigation.navigate('Championship', { championship })}
      />
    );
  };

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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Main.defaultProps = {
  championshipsList: [],
};

export default Main;
