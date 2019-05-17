import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FieldHeader from '~/components/FieldHeader';
import FieldBackground from '~/components/FieldBackground';
import PlayerChip from '~/components/PlayerChip';
import Draggable from '~/components/Draggable';

import { Container } from './styles';
import { withGameData } from './container';

import { backAction } from '~/utils/navigation';

class Field extends React.Component {
  state = {
    disableDrag: false,
    pageTitle: '',
    formation: {},
    headerButtons: [],
    gameStarted: false,
    currentPlayerId: null,
    currentUDA: [],
  };

  newFormation = {};

  componentDidMount = () => {
    this.handleEditScreen();
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

  handleStartGame = () => {
    this.setState(prevState => ({
      ...prevState,
      readyToPlay: true,
      pageTitle: '00:00',
      headerButtons: [
        { name: 'soccer', onPress: this.handleStartGame, type: 'material-community' },
        { name: 'whistle', onPress: this.handleStartGame, type: 'material-community' },
      ],
    }));
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

        this.setState(prevState => ({ ...prevState, formation: this.newFormation }));
      }
    });
  };

  handlePlayerPress = (playerId) => {
    const { readyToPlay, currentPlayerId, currentUDA } = this.state;

    if (readyToPlay) {
      const uda = {
        receiverId: playerId,
        senderId: null,
      };

      if (currentPlayerId !== playerId) {
        uda.senderId = currentPlayerId;
      }

      const newUDA = [...currentUDA, uda];

      this.setState({ currentPlayerId: playerId, currentUDA: newUDA });
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
    const { pageTitle, headerButtons } = this.state;
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
      </Container>
    );
  }
}

Field.propTypes = {
  playersList: PropTypes.array,
  savePlayers: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Field.defaultProps = {
  playersList: [],
};

export default withGameData(Field);
