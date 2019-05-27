import ImagePicker from 'react-native-image-crop-picker';

const openImagePicker = () => new Promise((resolve, reject) => {
  ImagePicker.openPicker({
    cropping: true,
    mediaType: 'photo',
    compressImageQuality: 0.8,
    includeBase64: true,
  })
    .then((image) => {
      resolve(`data:${image.mime};base64,${image.data}`);
    })
    .catch(error => reject(error));
});

export { openImagePicker };
