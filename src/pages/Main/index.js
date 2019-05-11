import React from 'react';

import ChampionshipItem from '~/components/ChampionshipItem';

import {
  Container,
  AppTitle,
  ChampionshipsBox,
  ChampionshipsTitle,
  ChampionshipsList,
} from './styles';

const Main = () => (
  <Container>
    <AppTitle>iLab</AppTitle>
    <ChampionshipsBox>
      <ChampionshipsTitle>Campeonatos</ChampionshipsTitle>
      <ChampionshipsList>
        <ChampionshipItem />
        <ChampionshipItem />
        <ChampionshipItem />
        <ChampionshipItem />
        <ChampionshipItem />
      </ChampionshipsList>
    </ChampionshipsBox>
  </Container>
);

export default Main;
