import Realm from 'realm';
import * as uuid from 'uuid';
import database, { CHAMPIONSHIP_SCHEMA, TEAM_SCHEMA } from './config';

const proxyToArray = proxyObject => JSON.parse(JSON.stringify(Array.from(proxyObject)));

export default new Realm(database);

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

        resolve(proxyToArray(championship));
      });
    })
    .catch(error => reject(error));
});

export const getAllChampionships = () => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      const allChampionships = proxyToArray(realm.objects(CHAMPIONSHIP_SCHEMA));

      resolve(allChampionships);
    })
    .catch(error => reject(error));
});

export const insertNewTeam = ({ championshipId, name, pictureURI }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newTeam = {
          id: uuid.v4(),
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

        resolve(proxyToArray(team));
      });
    })
    .catch(error => reject(error));
});
