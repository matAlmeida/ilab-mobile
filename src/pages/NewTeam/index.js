import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Header from '~/components/Header';
import TextInput from '~/components/TextInput';
import ImagePicker, { openImagePicker } from '~/components/ImagePicker';

import { Container, AddButton, AddButtonText } from './styles';

import { backAction } from '~/utils/navigation';
import { insertNewTeam } from '~/services/database';

const addTeam = ({ championship, name, pictureURI }, dispatch) => {
  insertNewTeam({
    championshipId: championship.id,
    name,
    pictureURI,
  })
    .then(() => {
      dispatch(backAction());
    })
    .catch(error => console.error(error));
};

const NewTeam = ({ navigation }) => {
  const [pictureURI, setPictureURI] = useState('');

  const updateURI = async () => {
    const uri = await openImagePicker();
    setPictureURI(uri);
  };

  return (
    <Container>
      <Header
        title="Novo Time"
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
      />
      <Formik
        initialValues={{
          championship: navigation.state.params.championship,
          name: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
        })}
        onSubmit={values => addTeam({ ...values, pictureURI }, navigation.dispatch)}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <ImagePicker onPress={updateURI} style={{ marginBottom: 10 }} value={pictureURI} />
            <TextInput
              label="Nome do Time"
              name="name"
              type="default"
              value={values.name}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              autoCapitalize="words"
              errorMessage={touched.name && errors.name}
            />
            <AddButton onPress={handleSubmit} disabled={!isValid}>
              <AddButtonText>ADICIONAR</AddButtonText>
            </AddButton>
          </>
        )}
      />
    </Container>
  );
};

NewTeam.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default NewTeam;
