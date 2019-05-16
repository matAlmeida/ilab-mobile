import React from 'react';

import {
  Container, NumberBox, NumberText, PlayerPicture,
} from './styles';

// eslint-disable-next-line react/prop-types
const PlayerChip = ({ pictureURI, number }) => (
  <Container>
    <NumberBox>
      <NumberText>{`${number > 9 ? '' : '0'}${number}`}</NumberText>
    </NumberBox>
    <PlayerPicture source={{ uri: pictureURI }} />
  </Container>
);

export default PlayerChip;
