import React from 'react';

import ListItem from '~/components/ListItem';
import ListContentBox from '~/components/ListContentBox';

import {
  Container, Header, HeaderIcon, HeaderTitle,
} from './styles';

const list = [
  {
    id: '1',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '2',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '3',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '4',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '5',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '6',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '7',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
  {
    id: '8',
    title: 'Barclays Premier',
    pictureURI: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
  },
];

const renderChampionships = ({ item }) => {
  const ballImage = 'https://media.tmicdn.com/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/s/o/soccer-ball-temporary-tattoo_1701.jpg';
  return <ListItem name={item.title} forePictureURI={item.pictureURI} backPictureURI={ballImage} />;
};

const Championship = () => (
  <Container>
    <Header>
      <HeaderIcon name="arrow-back" />
      <HeaderTitle>iLab</HeaderTitle>
    </Header>
    <ListContentBox
      title="Times"
      onAction={() => console.log('Vai para tela de ADD time')}
      data={list}
      renderItem={renderChampionships}
    />
    <ListContentBox
      title="Jogos"
      onAction={() => console.log('Vai para tela de ADD jogo')}
      data={list}
      renderItem={renderChampionships}
    />
  </Container>
);

export default Championship;
