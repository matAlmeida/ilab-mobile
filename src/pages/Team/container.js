import React from 'react';

import { getTeam, deletePlayer } from '~/services/database';

function withTeamData(WrappedComponent) {
  return class extends React.Component {
    state = { team: {}, loadingTeam: false };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadTeamInfo();

      navigation.addListener('willFocus', () => {
        this.reloadTeamInfo();
      });
    }

    handleDelete = ({ player }) => {
      deletePlayer({ playerId: player.id })
        .then(() => {
          this.reloadTeamInfo();
        })
        .catch(error => console.error(error));
    };

    reloadTeamInfo = () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      const { id } = navigation.state.params.team;

      this.setState({ loadingTeam: true });
      getTeam({ teamId: id })
        .then((team) => {
          navigation.setParams({ team });
          this.setState({ team, loadingTeam: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingTeam: false, team: {} });
        });
    };

    render() {
      const { team, loadingTeam } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          playersList={team.players}
          onRefresh={this.reloadTeamInfo}
          refresing={loadingTeam}
          onDelete={this.handleDelete}
        />
      );
    }
  };
}

export { withTeamData };
