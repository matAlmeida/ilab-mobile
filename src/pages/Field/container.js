import React from 'react';

import { getGame, getTeam, updatePlayerPos } from '~/services/database';

function withGameData(WrappedComponent) {
  return class extends React.Component {
    state = {
      game: {},
      team: {},
      loadingGame: false,
      loadingTeam: false,
      savingPlayers: false,
    };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadGameInfo();

      navigation.addListener('willFocus', () => {
        this.reloadGameInfo();
      });
    }

    reloadGameInfo = () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const {
        game: { id: gameId },
        team: { id: teamId },
      } = navigation.state.params;

      this.setState({ loadingGame: true, loadingTeam: true });
      getGame({ gameId })
        .then((game) => {
          navigation.setParams({ game });
          this.setState({ game, loadingGame: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingGame: false, game: {} });
        });

      getTeam({ teamId })
        .then((team) => {
          navigation.setParams({ team });
          this.setState({ team, loadingTeam: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingTeam: false, team: {} });
        });
    };

    handleUpdatePlayers = async (players) => {
      this.setState({ savingPlayers: true });

      await Promise.all(
        Object.keys(players).map(async (playerId) => {
          try {
            await updatePlayerPos({ ...players[playerId], id: playerId });
          } catch (error) {
            console.error(error);
          }
        }),
      );

      this.setState({ savingPlayers: false });
    };

    render() {
      const { loadingGame, team } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          savePlayers={this.handleUpdatePlayers}
          playersList={team.players}
          refresing={loadingGame}
        />
      );
    }
  };
}

export { withGameData };
