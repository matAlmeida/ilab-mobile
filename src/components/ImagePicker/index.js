/* eslint react/prop-types: 0 */
import React from 'react';
import RNImagePicker from 'react-native-image-crop-picker';

import {
  Container, AddImageButton, CameraIcon, Picture,
} from './styles';

const handleRejection = async (fn) => {
  const response = await fn().catch(error => error);

  return response;
};

const ImagePicker = ({ onPress, value, style }) => (
  <Container style={style}>
    <AddImageButton onPress={() => handleRejection(onPress)}>
      {!!value && <Picture source={{ uri: value }} />}
      {!value && <CameraIcon />}
    </AddImageButton>
  </Container>
);

export default ImagePicker;

const openImagePicker = () => new Promise((resolve, reject) => {
  RNImagePicker.openPicker({
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
