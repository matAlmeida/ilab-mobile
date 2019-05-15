import React from 'react';

import { getChampionship, deleteTeam, deleteGame } from '~/services/database';

function withChampionshipData(WrappedComponent) {
  return class extends React.Component {
    state = { championship: {}, loadingChampionship: false };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadChampionshipInfo();

      navigation.addListener('willFocus', () => {
        this.reloadChampionshipInfo();
      });
    }

    handleDelete = ({ team, game }) => {
      if (team) {
        deleteTeam({ teamId: team.id })
          .then(() => {
            this.reloadChampionshipInfo();
          })
          .catch(error => console.error(error));
      } else if (game) {
        deleteGame({ gameId: game.id })
          .then(() => {
            this.reloadChampionshipInfo();
          })
          .catch(error => console.error(error));
      }
    };

    reloadChampionshipInfo = () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const { id } = navigation.state.params.championship;

      this.setState({ loadingChampionship: true });
      getChampionship({ championshipId: id })
        .then((championship) => {
          this.setState({ championship, loadingChampionship: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingChampionship: false, championship: {} });
        });
    };

    render() {
      const { championship, loadingChampionship } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          teamsList={championship.teams}
          gamesList={championship.games}
          onRefresh={this.reloadChampionships}
          refresing={loadingChampionship}
          onDelete={this.handleDelete}
        />
      );
    }
  };
}

export { withChampionshipData };
