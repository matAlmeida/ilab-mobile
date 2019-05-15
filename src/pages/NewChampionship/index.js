import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Header from '~/components/Header';
import TextInput from '~/components/TextInput';

import { Container, AddButton, AddButtonText } from './styles';

import { backAction } from '~/utils/navigation';
import { insertNewChampionship } from '~/services/database';

const addChampionship = ({ name, pictureURI }, dispatch) => {
  insertNewChampionship({
    name,
    pictureURI,
  })
    .then(() => {
      dispatch(backAction('Main'));
    })
    .catch(error => console.error(error));
};

const NewChampionship = ({ navigation }) => (
  <Container>
    <Header
      title="Novo Campeonato"
      leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
    />
    <Formik
      initialValues={{
        name: '',
        pictureURI:
          'https://www.webcup.com.br/static/images/league/200x200/barclays-premier-league-1461774804.jpg',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
      })}
      onSubmit={values => addChampionship(values, navigation.dispatch)}
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
          <TextInput
            label="Nome do Campeonato"
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

NewChampionship.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default NewChampionship;
