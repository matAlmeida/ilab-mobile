import React from 'react';

import { getGame } from '~/services/database';

function withGameData(WrappedComponent) {
  return class extends React.Component {
    state = { game: {}, loadingGame: false };

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
      const { id } = navigation.state.params.game;

      this.setState({ loadingGame: true });
      getGame({ gameId: id })
        .then((game) => {
          navigation.setParams({ game });
          this.setState({ game, loadingGame: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingGame: false, game: {} });
        });
    };

    render() {
      const { game, loadingGame } = this.state;

      return <WrappedComponent {...this.props} refresing={loadingGame} />;
    }
  };
}

export { withGameData };
