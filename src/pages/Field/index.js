import React from 'react';
import PropTypes from 'prop-types';
import timer from 'react-native-timer';
import * as uuid from 'uuid';

import FieldHeader from '~/components/FieldHeader';
import FieldBackground from '~/components/FieldBackground';
import PlayerChip from '~/components/PlayerChip';
import Draggable from '~/components/Draggable';
import SelectModal from '~/components/SelectModal';

import { Container } from './styles';
import { withGameData } from './container';

import { backAction } from '~/utils/navigation';

export const udaEnds = [
  { label: 'Gol', value: 'goal' },
  { label: 'Finalização', value: 'finisher', color: '#f4aa42' },
  { label: 'Interceptação', value: 'intercept', color: '#41d0f4' },
  {
    label: 'Bola Saiu do Jogo',
    value: 'out-of-game',
    color: '#f45241',
  },
];

export const gameEnds = [
  { label: 'Finalizar Jogo', value: 'end-game', color: '#f4aa42' },
  { label: 'Cancelar', value: 'cancel', color: '#f45241' },
];

class Field extends React.Component {
  state = {
    disableDrag: false,
    pageTitle: '',
    formation: {},
    headerButtons: [],
    gameStarted: false,
    currentPlayerId: null,
    gameTime: 0,
    allPlays: [],
    currentPlay: [],
    finishUdaModalVisible: false,
    finishGameModalVisible: false,
  };

  newFormation = {};

  componentDidMount = () => {
    this.handleEditScreen();
  };

  componentWillUnmount = () => {
    timer.clearInterval('gameTimeInterval');
  };

  toogleModal = modalType => () => {
    const modalName = `finish${modalType}ModalVisible`;

    this.setState(prevState => ({ [modalName]: !prevState[modalName] }));
  };

  handleEditScreen = () => {
    this.setState(prevState => ({
      ...prevState,
      disableDrag: false,
      pageTitle: 'Prepare a Formação!',
      headerButtons: [{ name: 'save', onPress: this.handleSaveFormation }],
    }));
  };

  handleSaveFormation = () => {
    const { formation } = this.state;
    const { savePlayers } = this.props;

    savePlayers(formation);

    this.setState(prevState => ({
      ...prevState,
      disableDrag: true,
      pageTitle: 'Começar partida?',
      headerButtons: [
        { name: 'edit', onPress: this.handleEditScreen },
        { name: 'play-circle-filled', onPress: this.handleStartGame },
      ],
    }));
  };

  incrementGameTime = () => this.setState(prevState => ({
    ...prevState,
    gameTime: prevState.gameTime + 1,
  }));

  handleStartGame = () => {
    this.setState(prevState => ({
      ...prevState,
      readyToPlay: true,
      pageTitle: '00:00',
      headerButtons: [
        {
          name: 'whistle',
          onPress: this.toogleModal('Game'),
          type: 'material-community',
        },
        {
          name: 'soccer',
          onPress: this.toogleModal('Uda'),
          type: 'material-community',
        },
      ],
    }));

    timer.setInterval('gameTimeInterval', this.incrementGameTime, 1000);
  };

  handleSavePlay = (choosedOption) => {
    const { currentPlay, allPlays, gameTime } = this.state;
    const {
      navigation: {
        state: {
          params: { game },
        },
      },
    } = this.props;

    if (currentPlay !== []) {
      const newPlay = {
        id: uuid.v4(),
        gameId: game.id,
        type: choosedOption,
        finishedAt: gameTime,
        udas: currentPlay,
      };

      const newAllPlays = [...allPlays, newPlay];

      this.setState({
        allPlays: newAllPlays,
        currentPlay: [],
        currentPlayerId: null,
        finishUdaModalVisible: false,
      });
    }

    this.toogleModal('Uda');
  };

  handleFinishGame = (choosedOption) => {
    const { navigation } = this.props;

    switch (choosedOption) {
      case 'end-game':
        this.saveGame();
        navigation.dispatch(backAction());
        break;
      default:
        break;
    }
  };

  saveGame = () => {
    const {
      navigation: {
        state: {
          params: { game, team },
        },
      },
      updateGame,
    } = this.props;

    const { allPlays } = this.state;

    const newGame = {
      id: game.id,
    };

    if (game.homeId === team.id) {
      newGame.homeDone = true;
      newGame.homePlays = allPlays;
    } else if (game.awayId === team.id) {
      newGame.awayDone = true;
      newGame.awayPlays = allPlays;
    } else {
      console.error(new Error("The gameId and teamId doesn't matches!"));
      return;
    }

    updateGame(newGame);
    this.setState({ allPlays: [], currentPlay: [] });

    timer.clearInterval('gameTimeInterval');
  };

  handleReleasePlayer = (playerId, value) => {
    const { x, y } = value;
    const { playersList } = this.props;

    playersList.map((player) => {
      if (player.id === playerId) {
        this.newFormation[playerId] = {
          xPos: player.xPos + x,
          yPos: player.yPos + y,
        };

        this.setState(prevState => ({
          ...prevState,
          formation: this.newFormation,
        }));
      }
    });
  };

  handlePlayerPress = (playerId) => {
    const { readyToPlay, currentPlayerId, currentPlay } = this.state;

    if (readyToPlay) {
      const uda = {
        receiverId: playerId,
        senderId: currentPlayerId,
      };

      if (currentPlayerId !== null) {
        const newUDA = [...currentPlay, uda];

        this.setState({ currentPlay: newUDA });
      }

      this.setState({ currentPlayerId: playerId });
    }
  };

  renderPlayers = () => {
    const { currentPlayerId, disableDrag } = this.state;
    const { playersList } = this.props;

    return playersList.map(player => (
      <Draggable
        key={player.id}
        disableDrag={disableDrag}
        x={player.xPos}
        y={player.yPos}
        pressDrag={() => this.handlePlayerPress(player.id)}
        pressDragRelease={value => this.handleReleasePlayer(player.id, value)}
      >
        <PlayerChip hasBall={currentPlayerId === player.id} {...player} />
      </Draggable>
    ));
  };

  render() {
    const {
      pageTitle,
      headerButtons,
      finishUdaModalVisible,
      finishGameModalVisible,
    } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <FieldBackground />
        <FieldHeader
          title={pageTitle}
          leftIcon={{
            name: 'arrow-back',
            onPress: () => navigation.dispatch(backAction()),
          }}
          rightIcons={headerButtons}
        />
        {this.renderPlayers()}
        <SelectModal
          title="Finalizar Unidade"
          onClose={this.toogleModal('Uda')}
          onChoose={this.handleSavePlay}
          visible={finishUdaModalVisible}
          options={udaEnds}
        />
        <SelectModal
          title="Finalizar Jogo"
          onClose={this.toogleModal('Game')}
          onChoose={this.handleFinishGame}
          visible={finishGameModalVisible}
          options={gameEnds}
        />
      </Container>
    );
  }
}

Field.propTypes = {
  playersList: PropTypes.array,
  savePlayers: PropTypes.func.isRequired,
  updateGame: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Field.defaultProps = {
  playersList: [],
};

export default withGameData(Field);
