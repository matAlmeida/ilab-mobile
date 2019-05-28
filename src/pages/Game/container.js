import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';

import { sendEmail } from '~/components/EmailSender';
import { createFile } from '~/components/FileHandler';

import { getTeam, getGame } from '~/services/database';
import { uda2matrix, matrix2csv } from '~/utils/extraction/matrix';

function withTeamData(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadTeamInfo();

      navigation.addListener('willFocus', () => {
        this.reloadTeamInfo();
      });
    }

    handleExtraction = (option, { game, gameName, team }) => {
      let plays = [];
      if (game.homeId === team.id) {
        plays = game.homePlays;
      } else {
        plays = game.awayPlays;
      }

      const udaMatrix = uda2matrix(plays, team.players);
      const udaCsv = matrix2csv(udaMatrix);

      const pathToWrite = `${
        RNFetchBlob.fs.dirs.DownloadDir
      }/ilab-${team.name.toLowerCase().replace(' ', '-')}-${game.id}.csv`;

      const fileWasCreated = createFile({ path: pathToWrite, data: udaCsv });

      if (fileWasCreated) {
        sendEmail({
          subject: 'Relatório InterativeLab',
          body: gameName,
          attachment: { path: pathToWrite, type: 'csv' },
        });
      }
    };

    reloadTeamInfo = () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const { id, homeId, awayId } = navigation.state.params.game;

      this.setState({ loadingTeam: true });
      getTeam({ teamId: homeId })
        .then((homeTeam) => {
          navigation.setParams({ homeTeam });
        })
        .catch((error) => {
          console.error(error);
        });

      getTeam({ teamId: awayId })
        .then((awayTeam) => {
          navigation.setParams({ awayTeam });
        })
        .catch((error) => {
          console.error(error);
        });

      getGame({ gameId: id })
        .then((game) => {
          navigation.setParams({ game });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    render() {
      return <WrappedComponent {...this.props} onExtractChoose={this.handleExtraction} />;
    }
  };
}

export { withTeamData };
