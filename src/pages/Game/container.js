import React from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import Mailer from 'react-native-mail';
import RNFetchBlob from 'rn-fetch-blob';

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
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Permissão para salvar o Arquivo',
        message: 'O InterativeLab precisa da permissão de armazenamento para salvar o arquivo.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      })
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNFetchBlob.fs
              .writeFile(pathToWrite, udaCsv, 'utf8')
              .then(() => {
                this.handleEmail({ title: gameName, filePath: pathToWrite });
              })
              .catch(error => console.error(error));
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
