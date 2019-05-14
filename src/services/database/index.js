import Realm from 'realm';
import database, { CHAMPIONSHIP_SCHEMA } from './config';

export const insertNewChampionship = ({ name, pictureURI, id }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      realm.write(() => {
        const newChampionship = {
          id,
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

export const deleteChampionship = ({ id }) => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      console.log('deleting...');
      realm.write(() => {
        const championship = realm.objectForPrimaryKey(CHAMPIONSHIP_SCHEMA, id);
        console.log('deleting:', championship);
        realm.delete(championship);
        console.log('deleted!');
        resolve();
      });
    })
    .catch(error => reject(error));
});

export const getAllChampionships = () => new Promise((resolve, reject) => {
  Realm.open(database)
    .then((realm) => {
      const allChampionships = Array.from(realm.objects(CHAMPIONSHIP_SCHEMA));

      resolve(JSON.parse(JSON.stringify(allChampionships)));
    })
    .catch(error => reject(error));
});

export default new Realm(database);
