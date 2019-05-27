import ImagePicker from 'react-native-image-picker';

const openImagePicker = () => new Promise((resolve, reject) => {
  const options = {
    title: 'Selecionar Imagem',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      reject(new Error('User cancelled image picker'));
    } else if (response.error) {
      reject(new Error('ImagePicker Error: ', response.error));
    } else {
      resolve(`data:image/jpeg;base64,${response.data}`);
    }
  });
});

export { openImagePicker };
