import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const createFile = async ({ path, data, encoding = 'utf8' }) => {
  const ask4PermissionAlert = {
    title: 'Permissão para criar um arquivo',
    message:
      'O InterativeLab precisa da permissão de armazenamento para criar o arquivo a ser extraido.',
    buttonNegative: 'Cancelar',
    buttonPositive: 'OK',
  };

  const permissionType = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const granted = await PermissionsAndroid.request(permissionType, ask4PermissionAlert).catch(
    error => console.error(error),
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    await RNFetchBlob.fs.writeFile(path, data, encoding).catch(error => console.error(error));

    return true;
  }

  return false;
};

export { createFile };
