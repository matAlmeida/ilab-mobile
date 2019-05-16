import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ListItemImageBox,
  ListItemPicture,
  ListItemSportPicture,
  ListItemNameBox,
  ListItemName,
  ListItemHomeName,
} from './styles';

const ListGameItem = ({
  homeTeam, awayTeam, canPlay, ...rest
}) => (
  <Container {...rest}>
    <ListItemNameBox>
      <ListItemHomeName canPlay={canPlay}>{homeTeam.name}</ListItemHomeName>
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
  canPlay: PropTypes.bool.isRequired,
};

export default ListGameItem;
