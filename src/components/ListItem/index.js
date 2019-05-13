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

const ListItem = ({ name, forePictureURI, backPictureURI }) => (
  <Container>
    <ListItemImageBox>
      <ListItemSportPicture
        source={{
          uri: backPictureURI,
        }}
      />
      <ListItemPicture
        source={{
          uri: forePictureURI,
        }}
      />
    </ListItemImageBox>
    <ListItemNameBox>
      <ListItemName>{name}</ListItemName>
    </ListItemNameBox>
  </Container>
);

export default ListItem;

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  forePictureURI: PropTypes.string.isRequired,
  backPictureURI: PropTypes.string.isRequired,
};
