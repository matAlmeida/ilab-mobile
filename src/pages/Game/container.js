import React from 'react';

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
      return <WrappedComponent {...this.props} />;
    }
  };
}

export { withTeamData };
