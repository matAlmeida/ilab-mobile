import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FieldHeader from '~/components/FieldHeader';
import FieldBackground from '~/components/FieldBackground';
import PlayerChip from '~/components/PlayerChip';
import Draggable from '~/components/Draggable';

import { Container } from './styles';
import { withGameData } from './container';

import { backAction } from '~/utils/navigation';

const Field = ({ playersList, navigation, savePlayers }) => {
  const [disableDrag, setDisableDrag] = useState(false);
  const [pageTitle, setPageTitle] = useState('Prepare a Formação!');
  const [formation, setFormation] = useState({});

  const newFormation = {};

  const handleSaveFormation = () => {
    savePlayers(formation);

    setDisableDrag(true);
    setPageTitle('Começar partida?');
  };

  const handleReleasePlayer = (playerId, value) => {
    const { x, y } = value;

    playersList.map((player) => {
      if (player.id === playerId) {
        newFormation[playerId] = {
          xPos: player.xPos + x,
          yPos: player.yPos + y,
        };

        setFormation(newFormation);
      }
    });
  };

  const renderPlayers = () => playersList.map(player => (
    <Draggable
      key={player.id}
      disableDrag={disableDrag}
      x={player.xPos}
      y={player.yPos}
      pressDragRelease={value => handleReleasePlayer(player.id, value)}
    >
      <PlayerChip {...player} />
    </Draggable>
  ));

  return (
    <Container>
      <FieldBackground />
      <FieldHeader
        title={pageTitle}
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
        rightIcon={{ name: 'save', onPress: handleSaveFormation }}
      />
      {renderPlayers()}
    </Container>
  );
};

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
