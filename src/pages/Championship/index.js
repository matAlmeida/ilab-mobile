import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import timer from 'react-native-timer';

import Header from '~/components/Header';
import ListItem from '~/components/ListItem';
import ListGameItem from '~/components/ListGameItem';
import ListContentBox from '~/components/ListContentBox';

import { Container } from './styles';
import { withChampionshipData } from './container';

import Colors from '~/constants/Colors';
import teamIcon from '~/assets/team-icon.png';
import { backAction } from '~/utils/navigation';

const Championship = ({
  teamsList, gamesList, navigation, onRefresh, refreshing, onDelete,
}) => {
  const showToster = ({ message, type = 'error' }) => {
    const toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: type === 'error' ? 'red' : Colors.tintColor,
      textStyle: { fontWeight: 'bold' },
      backgroundColor: '#fff',
      opacity: 1,
      containerStyle: { borderRadius: 40, borderWidth: StyleSheet.hairlineWidth },
    });

    timer.setTimeout(
      'hideToaster',
      () => {
        Toast.hide(toast);
      },
      3000,
    );
  };

  const removeItem = (item, type) => {
    Alert.alert(
      `Remover ${type}`,
      `Tem certeza que deseja remover "${item.name}"?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => onDelete({ [type.toLowerCase()]: item }),
        },
      ],
      { cancelable: true },
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = path => ({ item }) => (
    <ListItem
      name={item.name}
      forePicture={{ uri: item.pictureURI }}
      backPicture={teamIcon}
      onPress={() => navigation.navigate(path, { [path.toLowerCase()]: item })}
      onLongPress={() => removeItem(item, path)}
    />
  );

  // eslint-disable-next-line react/prop-types
  const renderGameItem = (path, teams) => ({ item }) => {
    const { homeId, awayId } = item;
    const homeTeam = teams.find(team => team.id === homeId);
    const awayTeam = teams.find(team => team.id === awayId);

    const gameName = `${homeTeam.name} x ${awayTeam.name}`;

    const homeHasMinPlayersNumber = homeTeam.players.length >= 11;
    const onPress = homeHasMinPlayersNumber
      ? () => navigation.navigate(path, { item })
      : () => showToster({
        message: `O time "${homeTeam.name}" não tem o número minímo de jogadores.`,
      });

    return (
      <ListGameItem
        canPlay={homeHasMinPlayersNumber}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        onPress={onPress}
        onLongPress={() => removeItem({ ...item, name: gameName }, path)}
      />
    );
  };

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
        onAction={() => navigation.navigate('NewGame', { championship })}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={gamesList}
        renderItem={renderGameItem('Game', teamsList)}
      />
    </Container>
  );
};

Championship.propTypes = {
  teamsList: PropTypes.array,
  gamesList: PropTypes.array,
  onRefresh: PropTypes.func,
  onDelete: PropTypes.func,
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
  onDelete: undefined,
  refreshing: false,
};

export default withChampionshipData(Championship);
