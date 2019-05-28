import React from 'react';

import { sendEmail } from '~/components/EmailSender';
import { createPath, createFile } from '~/components/FileHandler';

import { getTeam, getGame } from '~/services/database';
import { uda2matrix, matrix2csv } from '~/utils/extraction/matrix';

function withTeamData(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.extractionOptions = [{ label: 'Matriz Completa', value: 'full-matrix' }];

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

    handleExtraction = (option, { game, gameName, team }) => {
      let plays = [];
      if (game.homeId === team.id) {
        plays = game.homePlays;
      } else {
        plays = game.awayPlays;
      }

      const udaCsv = this.extractSwitch(option, plays, team.players);

      const pathToWrite = createPath(
        `ilab-${team.name.toLowerCase().replace(' ', '-')}-${game.id}.csv`,
      );

      const fileWasCreated = createFile({ path: pathToWrite, data: udaCsv });

      if (fileWasCreated) {
        sendEmail({
          subject: 'Relatório InterativeLab',
          body: gameName,
          attachment: { path: pathToWrite, type: 'csv' },
        });
      }
    };

    reloadTeamInfo = async () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const { id, homeId, awayId } = navigation.state.params.game;

      this.setState({ loadingTeam: true });

      const homeTeam = await getTeam({ teamId: homeId }).catch((error) => {
        console.error(error);
      });

      const awayTeam = await getTeam({ teamId: awayId }).catch((error) => {
        console.error(error);
      });

      const game = await getGame({ gameId: id }).catch((error) => {
        console.error(error);
      });

      navigation.setParams({ homeTeam, awayTeam, game });
      this.setState({ loadingTeam: false });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          extractionOptions={this.extractionOptions}
          onExtractChoose={this.handleExtraction}
        />
      );
    }
  };
}

export { withTeamData };
