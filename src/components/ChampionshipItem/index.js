import React from 'react';

import {
  Container,
  ChampionshipImageBox,
  ChampionshipPicture,
  ChampionshipSportPicture,
  ChampionshipNameBox,
  ChampionshipName,
} from './styles';

const ChampionshipItem = () => (
  <Container>
    <ChampionshipImageBox>
      <ChampionshipSportPicture
        source={{
          uri: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
        }}
      />
      <ChampionshipPicture
        source={{
          uri: 'http://cdn.24.co.za/files/Cms/General/d/2634/0c47acf0bbff4208837c1b6e6706d478.jpg',
        }}
      />
    </ChampionshipImageBox>
    <ChampionshipNameBox>
      <ChampionshipName>Nome do Campeonato</ChampionshipName>
    </ChampionshipNameBox>
  </Container>
);

export default ChampionshipItem;
