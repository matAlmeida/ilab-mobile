import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ListItemImageBox,
  ListItemPicture,
  ListItemSportPicture,
  ListItemNameBox,
  ListItemName,
} from './styles';
import { fetchGame } from './container';

const ListGameItem = ({ homeTeam, awayTeam, ...rest }) => (
  <Container {...rest}>
    <ListItemNameBox>
      <ListItemName>{homeTeam.name}</ListItemName>
    </ListItemNameBox>
    <ListItemImageBox>
      <ListItemSportPicture source={{ uri: homeTeam.pictureURI }} />
      <ListItemPicture source={{ uri: awayTeam.pictureURI }} />
    </ListItemImageBox>
    <ListItemNameBox>
      <ListItemName>{awayTeam.name}</ListItemName>
    </ListItemNameBox>
  </Container>
);

ListGameItem.propTypes = {
  homeTeam: PropTypes.object.isRequired,
  awayTeam: PropTypes.object.isRequired,
};

export default fetchGame(ListGameItem);
