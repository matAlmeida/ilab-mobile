import React from 'react';

import { getAllChampionships } from '~/services/database';

function withChampionshipData(WrappedComponent) {
  return class extends React.Component {
    state = { championshipsList: [] };

    componentDidMount() {
      this.reloadChampionships();
    }

    reloadChampionships = () => {
      getAllChampionships()
        .then((newChampionshipsList) => {
          this.setState({ championshipsList: newChampionshipsList });
        })
        .catch(error => console.error(error));
    };

    render() {
      const { championshipsList } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          championshipsList={championshipsList}
          onRefresh={this.reloadChampionships}
        />
      );
    }
  };
}

export { withChampionshipData };
