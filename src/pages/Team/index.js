import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';
import { withTeamData } from './container';

import playerIcon from '~/assets/player-icon.png';
import { backAction } from '~/utils/navigation';

const Team = ({
  playersList, navigation, onRefresh, refreshing, onDelete,
}) => {
  const removeItem = (item) => {
    Alert.alert(
      'Remover Jogador',
      `Tem certeza que deseja remover "${item.name}"?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => onDelete({ player: item }),
        },
      ],
      { cancelable: true },
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = path => ({ item }) => {
    const { number, name, pictureURI } = item;
    const playerName = `Nº ${number} - ${name}`;

    return (
      <ListItem
        name={playerName}
        forePicture={{ uri: pictureURI }}
        backPicture={playerIcon}
        onPress={() => navigation.navigate(path, { item })}
        onLongPress={() => removeItem(item)}
      />
    );
  };

  const { team } = navigation.state.params;

  return (
    <Container>
      <Header
        title={team.name}
        leftIcon={{
          name: 'arrow-back',
          onPress: () => navigation.dispatch(backAction()),
        }}
      />
      <ListContentBox
        title="Jogadores"
        onAction={() => navigation.navigate('NewPlayer', { team })}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={playersList}
        renderItem={renderItem('Player')}
      />
    </Container>
  );
};

Team.propTypes = {
  playersList: PropTypes.array,
  onRefresh: PropTypes.func,
  onDelete: PropTypes.func,
  refreshing: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Team.defaultProps = {
  playersList: [],
  onRefresh: undefined,
  onDelete: undefined,
  refreshing: false,
};

export default withTeamData(Team);
