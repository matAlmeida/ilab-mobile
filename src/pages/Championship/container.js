import React from 'react';

import { getChampionship } from '~/services/database';

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
        />
      );
    }
  };
}

export { withChampionshipData };
