import React from 'react';

import { getAllChampionships, deleteChampionship } from '~/services/database';

function withChampionshipData(WrappedComponent) {
  return class extends React.Component {
    state = { championshipsList: [], loadingChampionship: false };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;

      this.reloadChampionships();

      navigation.addListener('willFocus', () => {
        this.reloadChampionships();
      });
    }

    handleDelete = (championship) => {
      deleteChampionship({ championshipId: championship.id })
        .then(() => {
          this.reloadChampionships();
        })
        .catch(error => console.error(error));
    };

    reloadChampionships = () => {
      this.setState({ loadingChampionship: true });
      getAllChampionships()
        .then((newChampionshipsList) => {
          this.setState({
            championshipsList: newChampionshipsList,
            loadingChampionship: false,
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loadingChampionship: false, championshipsList: [] });
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
          onDelete={this.handleDelete}
        />
      );
    }
  };
}

export { withChampionshipData };
