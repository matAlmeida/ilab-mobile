import Realm from 'realm';
import * as uuid from 'uuid';
import database, {
  CHAMPIONSHIP_SCHEMA, TEAM_SCHEMA, GAME_SCHEMA, PLAYER_SCHEMA,
} from './config';

const proxyToArray = proxyObject => JSON.parse(JSON.stringify(proxyObject));

export default new Realm(database);

/**
 *
 * CHAMPIONSHIP HANDLERS
 */

export const insertNewChampionship = ({ name, pictureURI }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newChampionship = {
          id: uuid.v4(),
          name,
          pictureURI,
          createdAt: new Date(),
        };

        realm.create(CHAMPIONSHIP_SCHEMA, newChampionship);
        resolve(newChampionship);
      });
    })
    .catch(error => reject(error));
});

export const deleteChampionship = ({ championshipId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const championship = realm.objectForPrimaryKey(CHAMPIONSHIP_SCHEMA, championshipId);
        realm.delete(championship);
        resolve();
      });
    })
    .catch(error => reject(error));
});

export const getChampionship = ({ championshipId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const championship = realm.objectForPrimaryKey(CHAMPIONSHIP_SCHEMA, championshipId);

        const retChampionship = proxyToArray(championship);
        retChampionship.teams = proxyToArray(Array.from(championship.teams));
        Array.from(championship.teams).map((team, index) => {
          retChampionship.teams[index].players = proxyToArray(Array.from(team.players));
        });
        retChampionship.games = proxyToArray(Array.from(championship.games));

        resolve(retChampionship);
      });
    })
    .catch(error => reject(error));
});

export const getAllChampionships = () => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      const allChampionships = proxyToArray(Array.from(realm.objects(CHAMPIONSHIP_SCHEMA)));

      resolve(allChampionships);
    })
    .catch(error => reject(error));
});

/**
 *
 * TEAM HANDLERS
 */

export const insertNewTeam = ({ championshipId, name, pictureURI }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newTeam = {
          id: uuid.v4(),
          championshipId,
          name,
          pictureURI,
          createdAt: new Date(),
        };

        const championship = realm.objectForPrimaryKey(CHAMPIONSHIP_SCHEMA, championshipId);
        championship.teams.push(newTeam);

        resolve(newTeam);
      });
    })
    .catch(error => reject(error));
});

export const deleteTeam = ({ teamId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const team = realm.objectForPrimaryKey(TEAM_SCHEMA, teamId);
        realm.delete(team);
        resolve();
      });
    })
    .catch(error => reject(error));
});

export const getTeam = ({ teamId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const team = realm.objectForPrimaryKey(TEAM_SCHEMA, teamId);

        const retTeam = proxyToArray(team);
        retTeam.players = proxyToArray(Array.from(team.players));

        resolve(proxyToArray(retTeam));
      });
    })
    .catch(error => reject(error));
});

/**
 *
 * GAME HANDLERS
 */

export const insertNewGame = ({
  championshipId, homeId, awayId, date,
}) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newGame = {
          id: uuid.v4(),
          championshipId,
          homeId,
          awayId,
          date,
          createdAt: new Date(),
        };

        const championship = realm.objectForPrimaryKey(CHAMPIONSHIP_SCHEMA, championshipId);
        championship.games.push(newGame);

        resolve(newGame);
      });
    })
    .catch(error => reject(error));
});

export const updateGame = ({
  id, homeDone, awayDone, homePlays, awayPlays, finishedAt,
}) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        if (!id) reject(new Error('You need to inform the Game Id to update'));

        const updatedGame = {
          id,
          homeDone,
          awayDone,
          homePlays,
          awayPlays,
          finishedAt,
        };

        realm.create(GAME_SCHEMA, updatedGame, 'modified');

        resolve();
      });
    })
    .catch(error => reject(error));
});

export const deleteGame = ({ gameId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const game = realm.objectForPrimaryKey(GAME_SCHEMA, gameId);
        realm.delete(game);
        resolve();
      });
    })
    .catch(error => reject(error));
});

export const getGame = ({ gameId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const game = realm.objectForPrimaryKey(GAME_SCHEMA, gameId);

        const retGame = proxyToArray(game);
        retGame.homePlays = proxyToArray(Array.from(game.homePlays));
        retGame.awayPlays = proxyToArray(Array.from(game.awayPlays));

        resolve(proxyToArray(retGame));
      });
    })
    .catch(error => reject(error));
});

export const getPlays = ({ gameId, teamId, filter = '' }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const game = realm.objectForPrimaryKey(GAME_SCHEMA, gameId);
        const plays = game.homeId === teamId ? game.homePlays : game.awayPlays;

        if (filter) {
          const filtered = plays.filtered(filter);

          resolve(proxyToArray(Array.from(filtered)));
        }

        resolve(proxyToArray(Array.from(plays)));
      });
    })
    .catch(error => reject(error));
});

/**
 *
 * PLAYER HANDLERS
 */

export const insertNewPlayer = ({
  teamId, name, pictureURI, number,
}) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newPlayer = {
          id: uuid.v4(),
          teamId,
          name,
          pictureURI,
          number,
          xPos: 0,
          yPos: 0,
          createdAt: new Date(),
        };

        const team = realm.objectForPrimaryKey(TEAM_SCHEMA, teamId);
        team.players.push(newPlayer);

        resolve(newPlayer);
      });
    })
    .catch(error => reject(error));
});

export const updatePlayerPos = ({ id, xPos, yPos }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        if (!id) reject(new Error('You need to inform the Player Id to update'));

        const updatedPlayer = {
          id,
          xPos,
          yPos,
        };

        realm.create(PLAYER_SCHEMA, updatedPlayer, 'modified');

        resolve();
      });
    })
    .catch(error => reject(error));
});

export const deletePlayer = ({ playerId }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const player = realm.objectForPrimaryKey(PLAYER_SCHEMA, playerId);
        realm.delete(player);
        resolve();
      });
    })
    .catch(error => reject(error));
});
