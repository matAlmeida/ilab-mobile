import React from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import Mailer from 'react-native-mail';
import RNFetchBlob from 'rn-fetch-blob';

import { getTeam, getGame } from '~/services/database';

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

    handleEmail = ({ title, filePath }) => {
      Mailer.mail(
        {
          subject: 'Relatório InterativeLab',
          recipients: [],
          ccRecipients: [],
          bccRecipients: [],
          body: `${title}`,
          attachment: {
            path: `${filePath}`, // The absolute path of the file from which to read data.
            type: 'csv', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          },
        },
        (error, event) => {
          Alert.alert(
            error,
            event,
            [
              { text: 'Ok', onPress: () => console.tron.log('OK: Email Error Response') },
              { text: 'Cancel', onPress: () => console.tron.log('CANCEL: Email Error Response') },
            ],
            { cancelable: true },
          );
        },
      );
    };

    uda2matrix = (plays, players) => {
      const idMap = players.map((player, index) => ({ id: player.id, index }));
      const matrix = [];

      for (let i = 0; i < 11; i += 1) {
        const row = [];
        for (let j = 0; j < 11; j += 1) {
          const column = 0;
          row.push(column);
        }
        matrix.push(row);
      }

      plays.map(play => Object.keys(play.udas)
        .map(key => play.udas[key])
        .map((uda) => {
          const sender = idMap.find(mapped => mapped.id === uda.senderId);
          const receiver = idMap.find(mapped => mapped.id === uda.receiverId);

          matrix[sender.index][receiver.index] += 1;
        }));

      return matrix;
    };

    matrix2csv = (matrix) => {
      const csv = matrix.reduce((str1, row) => {
        const col = row.reduce((str2, column) => `${str2},${column}`, '');

        return `${str1}${col.substring(1)}\n`;
      }, '');

      return csv;
    };

    handleExtraction = (option, { game, gameName, team }) => {
      let plays = [];
      if (game.homeId === team.id) {
        plays = game.homePlays;
      } else {
        plays = game.awayPlays;
      }

      const udaMatrix = this.uda2matrix(plays, team.players);
      const udaCsv = this.matrix2csv(udaMatrix);

      const pathToWrite = `${
        RNFetchBlob.fs.dirs.DownloadDir
      }/ilab-${team.name.toLowerCase().replace(' ', '-')}-${game.id}.csv`;
      console.tron.log('pathToWrite', pathToWrite);
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Permissão para salvar o Arquivo',
        message: 'O InterativeLab precisa da permissão de' + 'armazenamento para salvar o arquivo.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      })
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNFetchBlob.fs
              .writeFile(pathToWrite, udaCsv, 'utf8')
              .then(() => {
                console.tron.log(`wrote file ${pathToWrite}`);
                this.handleEmail({ title: gameName, filePath: pathToWrite });
              })
              .catch(error => console.error(error));
          } else {
            console.tron.log('Camera permission denied');
          }
        })
        .catch(error => console.warn(error));
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
