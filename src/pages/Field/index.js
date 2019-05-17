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
        { name: 'play-circle-filled', onPress: this.handleEditScreen },
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

  renderPlayers = () => this.props.playersList.map(player => (
    <Draggable
      key={player.id}
      disableDrag={this.state.disableDrag}
      x={player.xPos}
      y={player.yPos}
      pressDragRelease={value => this.handleReleasePlayer(player.id, value)}
    >
      <PlayerChip {...player} />
    </Draggable>
  ));

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
