import React from 'react';

import { getAllChampionships } from '~/services/database';

function withChampionshipData(WrappedComponent) {
  return class extends React.Component {
    state = { championshipsList: [], loadingChampionship: false };

    componentDidMount() {
      this.reloadChampionships();
    }

    reloadChampionships = () => {
      this.setState({ loadingChampionship: true });
      getAllChampionships()
        .then((newChampionshipsList) => {
          this.setState({ championshipsList: newChampionshipsList, loadingChampionship: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingChampionship: false });
        });
    };

    render() {
      const { championshipsList, loadingChampionship } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          championshipsList={championshipsList}
          onRefresh={this.reloadChampionships}
          refresing={loadingChampionship}
        />
      );
    }
  };
}

export { withChampionshipData };
