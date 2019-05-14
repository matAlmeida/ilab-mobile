import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  ListItemImageBox,
  ListItemPicture,
  ListItemSportPicture,
  ListItemNameBox,
  ListItemName,
} from './styles';

const ListItem = ({
  name, forePicture, backPicture, ...rest
}) => (
  <Container {...rest}>
    <ListItemImageBox>
      <ListItemSportPicture source={backPicture} />
      <ListItemPicture source={forePicture} />
    </ListItemImageBox>
    <ListItemNameBox>
      <ListItemName>{name}</ListItemName>
    </ListItemNameBox>
  </Container>
);

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  forePicture: Image.propTypes.source.isRequired,
  backPicture: Image.propTypes.source,
};

ListItem.defaultProps = {
  backPicture: {},
};

export default ListItem;
