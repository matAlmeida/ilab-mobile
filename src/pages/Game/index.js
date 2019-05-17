import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import toast from '~/components/Toast';

import {
  Container,
  TeamInfoContainer,
  TeamInfoImage,
  TeamInfoBox,
  TeamName,
  TeamPlayButton,
  TeamPlayButtonText,
  TeamButtonBox,
  WarningIcon,
  WarningButton,
  TitleBox,
} from './styles';

import { withTeamData } from './container';

import { backAction } from '~/utils/navigation';

const Game = ({ navigation }) => {
  const showToast = teamName => toast({
    message: `O time "${teamName}" não tem o número minímo de jogadores.`,
  });

  const { game, homeTeam, awayTeam } = navigation.state.params;
  const gameName = `${homeTeam.name} x ${awayTeam.name}`;

  const homeCanPlay = homeTeam.players.length >= 11;
  const awayCanPlay = awayTeam.players.length >= 11;

  return (
    <Container>
      <Header
        title={gameName}
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
      />
      <TeamInfoContainer>
        <TeamInfoImage source={{ uri: homeTeam.pictureURI }} />
        <TeamInfoBox>
          <TitleBox>
            <TeamName>{homeTeam.name}</TeamName>
            {!homeCanPlay && (
              <WarningButton onPress={() => showToast(homeTeam.name)}>
                <WarningIcon />
              </WarningButton>
            )}
          </TitleBox>
          <TeamButtonBox>
            {!homeCanPlay && (
              <TeamPlayButton onPress={() => navigation.navigate('Team', { team: homeTeam })}>
                <TeamPlayButtonText>Arrumar</TeamPlayButtonText>
              </TeamPlayButton>
            )}
            {homeCanPlay && (
              <>
                <TeamPlayButton
                  onPress={() => navigation.navigate('Field', { game, team: homeTeam })}
                  disabled={game.homeDone}
                >
                  <TeamPlayButtonText>Jogar</TeamPlayButtonText>
                </TeamPlayButton>
                <TeamPlayButton disabled={!game.homeDone}>
                  <TeamPlayButtonText>Extrair</TeamPlayButtonText>
                </TeamPlayButton>
              </>
            )}
          </TeamButtonBox>
        </TeamInfoBox>
      </TeamInfoContainer>

      <TeamInfoContainer>
        <TeamInfoImage source={{ uri: awayTeam.pictureURI }} />
        <TeamInfoBox>
          <TitleBox>
            <TeamName>{awayTeam.name}</TeamName>
            {!awayCanPlay && (
              <WarningButton onPress={() => showToast(awayTeam.name)}>
                <WarningIcon />
              </WarningButton>
            )}
          </TitleBox>
          <TeamButtonBox>
            {!awayCanPlay && (
              <TeamPlayButton onPress={() => navigation.navigate('Team', { team: awayTeam })}>
                <TeamPlayButtonText>Arrumar</TeamPlayButtonText>
              </TeamPlayButton>
            )}
            {awayCanPlay && (
              <>
                <TeamPlayButton
                  onPress={() => navigation.navigate('Field', { game, team: awayTeam })}
                  disabled={game.awayDone}
                >
                  <TeamPlayButtonText>Jogar</TeamPlayButtonText>
                </TeamPlayButton>
                <TeamPlayButton disabled={!game.awayDone}>
                  <TeamPlayButtonText>Extrair</TeamPlayButtonText>
                </TeamPlayButton>
              </>
            )}
          </TeamButtonBox>
        </TeamInfoBox>
      </TeamInfoContainer>
    </Container>
  );
};

Game.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Game.defaultProps = {};

export default withTeamData(Game);
