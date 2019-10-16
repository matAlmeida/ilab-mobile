import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

import Header from '~/components/Header';
import SelectModal from '~/components/SelectModal';
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
  FilterBox,
  FilterTitle,
  SliderBox,
  SliderValueBox,
  SliderValueText,
} from './styles';

import { udaEnds } from '~/pages/Field';
import { withTeamData } from './container';

import Colors from '~/constants/Colors';
import { backAction } from '~/utils/navigation';

const Game = ({ navigation, onExtractChoose, extractionOptions }) => {
  const { game, homeTeam, awayTeam } = navigation.state.params;
  const gameName = `${homeTeam.name} x ${awayTeam.name}`;

  const homeCanPlay = homeTeam.players.length >= 11;
  const awayCanPlay = awayTeam.players.length >= 11;

  const initialFilters = udaEnds.reduce(
    (agg, end) => ({ ...agg, [end.value]: true }),
    {},
  );

  const gameDuration = parseInt(game.finishedAt / 60, 10) + 1;

  const [selectedFilter, setSelectedFilter] = useState(initialFilters);
  const [initialTimerFilter, setInitialTimerFilter] = useState(0);
  const [finalTimerFilter, setFinalTimerFilter] = useState(gameDuration);
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = teamName =>
    toast({
      message: `O time "${teamName}" não tem o número minímo de jogadores.`,
    });

  return (
    <Container>
      <Header
        title={gameName}
        leftIcon={{
          name: 'arrow-back',
          onPress: () => navigation.dispatch(backAction()),
        }}
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
              <TeamPlayButton
                onPress={() => navigation.navigate('Team', { team: homeTeam })}>
                <TeamPlayButtonText>Arrumar</TeamPlayButtonText>
              </TeamPlayButton>
            )}
            {homeCanPlay && (
              <>
                <TeamPlayButton
                  onPress={() => {
                    navigation.navigate('Field', { game, team: homeTeam });
                  }}
                  disabled={game.homeDone}>
                  <TeamPlayButtonText>Jogar</TeamPlayButtonText>
                </TeamPlayButton>
                <TeamPlayButton
                  onPress={() => setModalVisible(true)}
                  disabled={!game.homeDone}>
                  <TeamPlayButtonText>Extrair</TeamPlayButtonText>
                </TeamPlayButton>
                <SelectModal
                  title="Extrair Matriz de Adjacência"
                  onClose={() => setModalVisible(false)}
                  onChoose={option => {
                    onExtractChoose(option, {
                      game,
                      gameName,
                      team: homeTeam,
                      filters: {
                        ...selectedFilter,
                        initialTimer: initialTimerFilter,
                        finalTimer: finalTimerFilter,
                      },
                    });
                  }}
                  visible={modalVisible}
                  options={extractionOptions}>
                  <FilterBox>
                    {udaEnds.map(end => (
                      <CheckBox
                        key={end.value}
                        title={end.label}
                        checked={selectedFilter[end.value]}
                        onPress={() =>
                          setSelectedFilter({
                            ...selectedFilter,
                            [end.value]: !selectedFilter[end.value],
                          })
                        }
                      />
                    ))}
                    <FilterTitle>Tempo Inicial (minutos)</FilterTitle>
                    <SliderBox>
                      <SliderValueBox>
                        <SliderValueText>{initialTimerFilter}</SliderValueText>
                      </SliderValueBox>
                      <View style={{ flex: 1 }}>
                        <Slider
                          value={initialTimerFilter}
                          onValueChange={value => setInitialTimerFilter(value)}
                          thumbTintColor={Colors.tintColor}
                          minimumValue={0}
                          maximumValue={gameDuration}
                          step={1}
                        />
                      </View>
                    </SliderBox>
                    <FilterTitle>Tempo Final (minutos)</FilterTitle>
                    <SliderBox>
                      <SliderValueBox>
                        <SliderValueText>{finalTimerFilter}</SliderValueText>
                      </SliderValueBox>
                      <View style={{ flex: 1 }}>
                        <Slider
                          value={finalTimerFilter}
                          onValueChange={value => setFinalTimerFilter(value)}
                          thumbTintColor={Colors.tintColor}
                          minimumValue={0}
                          maximumValue={gameDuration}
                          step={1}
                        />
                      </View>
                    </SliderBox>
                  </FilterBox>
                </SelectModal>
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
              <TeamPlayButton
                onPress={() => navigation.navigate('Team', { team: awayTeam })}>
                <TeamPlayButtonText>Arrumar</TeamPlayButtonText>
              </TeamPlayButton>
            )}
            {awayCanPlay && (
              <>
                <TeamPlayButton
                  onPress={() => {
                    navigation.navigate('Field', { game, team: awayTeam });
                  }}
                  disabled={game.awayDone}>
                  <TeamPlayButtonText>Jogar</TeamPlayButtonText>
                </TeamPlayButton>
                <TeamPlayButton
                  onPress={() => setModalVisible(true)}
                  disabled={!game.awayDone}>
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
  onExtractChoose: PropTypes.func.isRequired,
  extractionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

Game.defaultProps = {};

export default withTeamData(Game);
