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

import noImage from '~/assets/no-image.png';

const ListGameItem = ({ homeTeam, awayTeam, ...rest }) => (
  <Container {...rest}>
    <ListItemNameBox>
      <ListItemName>{homeTeam.name}</ListItemName>
    </ListItemNameBox>
    <ListItemImageBox>
      <ListItemSportPicture
        source={awayTeam.pictureURI ? { uri: awayTeam.pictureURI } : noImage}
      />
      <ListItemPicture
        source={homeTeam.pictureURI ? { uri: homeTeam.pictureURI } : noImage}
      />
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

export default ListGameItem;
