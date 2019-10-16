import React from 'react';

import { sendEmail } from '~/components/EmailSender';
import { createPath, createFile } from '~/components/FileHandler';

import { udaEnds } from '~/pages/Field';

import { getTeam, getGame } from '~/services/database';
import { uda2matrix, matrix2csv } from '~/utils/extraction/matrix';

function withTeamData(WrappedComponent) {
  return class extends React.Component {
    state = {
      extractionOptions: [{ label: 'Matriz', value: 'full-matrix' }],
    };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadTeamInfo();

      navigation.addListener('willFocus', () => {
        this.reloadTeamInfo();
      });
    }

    extractSwitch = (option, plays, players) => {
      if (option === 'full-matrix') {
        const udaMatrix = uda2matrix(plays, players);
        const udaCsv = matrix2csv(udaMatrix);

        return udaCsv;
      }

      return new Error(`Extraction opntion "${option}" doesn't exist.`);
    };

    getFiltersLabel = ({ initialTimer, finalTimer, ...filters }) => {
      let string = `
        Tempo Inicial: ${initialTimer}
        Tempo Final: ${finalTimer}
      `;

      Object.keys(filters).map(filter => {
        const udaObj = udaEnds.filter(end => end.value === filter);

        string += `
          ${udaObj[0].label}: ${filters[filter] === true ? 'Sim' : 'Não'}\n
        `;
      });

      return string;
    };

    filterPlays = (plays, filters) => {
      const filteredPlays = [];
      const { initialTimer, finalTimer, ...typeFilters } = filters;

      let filterString = `${initialTimer}min-${finalTimer}min`;

      Object.keys(typeFilters).map(filter => {
        if (filters[filter]) {
          filterString += `-${filter}`;

          const newPlays = plays.filter(
            play =>
              play.type === filter &&
              play.finishedAt >= (initialTimer > 0 && initialTimer * 60) &&
              play.finishedAt <= finalTimer * 60,
          );

          filteredPlays.push(...newPlays);
        }
      });

      return [filteredPlays, filterString];
    };

    handleExtraction = (option, { game, gameName, team, filters }) => {
      let plays = [];
      if (game.homeId === team.id) {
        plays = game.homePlays;
      } else {
        plays = game.awayPlays;
      }

      const [filteredPlays, filterString] = this.filterPlays(plays, filters);

      const { extractionOptions } = this.state;
      const selectedOption = extractionOptions.find(
        selOption => selOption.value === option,
      );

      const udaCsv = this.extractSwitch(option, filteredPlays, team.players);

      const pathToWrite = createPath(
        `ilab-${selectedOption.value}-${team.name
          .toLowerCase()
          .replace(' ', '-')}-${game.id}-${filterString}.csv`,
      );

      const fileWasCreated = createFile({ path: pathToWrite, data: udaCsv });

      if (fileWasCreated) {
        sendEmail({
          subject: `Relatório InterativeLab | ${selectedOption.label}`,
          body: `
            Jogo: ${gameName}
            Time de casa: ${team.name}
            Formato de Extração: ${selectedOption.label}
            ${this.getFiltersLabel(filters)}
          `,
          attachment: { path: pathToWrite, type: 'csv' },
        });
      }
    };

    reloadTeamInfo = async () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const { id, homeId, awayId } = navigation.state.params.game;

      this.setState({ loadingTeam: true });

      const homeTeam = await getTeam({ teamId: homeId }).catch(error => {
        console.error(error);
      });

      const awayTeam = await getTeam({ teamId: awayId }).catch(error => {
        console.error(error);
      });

      const game = await getGame({ gameId: id }).catch(error => {
        console.error(error);
      });

      navigation.setParams({ homeTeam, awayTeam, game });
      this.setState({ loadingTeam: false });
    };

    render() {
      const { extractionOptions } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          extractionOptions={extractionOptions}
          onExtractChoose={this.handleExtraction}
        />
      );
    }
  };
}

export { withTeamData };
