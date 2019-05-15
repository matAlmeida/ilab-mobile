import React from 'react';

import { getTeam } from '~/services/database';

function fetchGame(WrappedComponent) {
  return class extends React.Component {
    state = {
      homeTeam: { name: '...' },
      awayTeam: { name: '...' },
    };

    componentDidMount = () => {
      // eslint-disable-next-line react/prop-types
      const { game } = this.props;

      getTeam({ teamId: game.homeId })
        .then(homeTeam => this.setState({ homeTeam }))
        .catch(error => console.error(error));
      getTeam({ teamId: game.awayId })
        .then(awayTeam => this.setState({ awayTeam }))
        .catch(error => console.error(error));
    };

    render() {
      const { homeTeam, awayTeam } = this.state;

      return <WrappedComponent {...this.props} homeTeam={homeTeam} awayTeam={awayTeam} />;
    }
  };
}

export { fetchGame };
