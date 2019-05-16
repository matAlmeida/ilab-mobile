import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Header from '~/components/Header';
import TextInput from '~/components/TextInput';

import { Container, AddButton, AddButtonText } from './styles';

import { backAction } from '~/utils/navigation';
import { insertNewPlayer } from '~/services/database';

const addPlayer = ({
  team, name, number, pictureURI,
}, dispatch) => {
  insertNewPlayer({
    teamId: team.id,
    name,
    number: parseInt(number, 10),
    pictureURI,
  })
    .then(() => {
      dispatch(backAction());
    })
    .catch(error => console.error(error));
};

const NewPlayer = ({ navigation }) => (
  <Container>
    <Header
      title="Novo Time"
      leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
    />
    <Formik
      initialValues={{
        team: navigation.state.params.team,
        name: '',
        number: '',
        pictureURI:
          'https://static1.purepeople.com.br/articles/7/77/83/7/@/1063017-de-acordo-com-jornal-ronaldinho-950x0-4.png',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        number: Yup.number().required(),
      })}
      onSubmit={values => addPlayer(values, navigation.dispatch)}
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
            label="Nome do Jogador"
            name="name"
            type="default"
            value={values.name}
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            autoCapitalize="words"
            errorMessage={touched.name && errors.name}
          />
          <TextInput
            label="Número do Jogador"
            name="number"
            type="phone-pad"
            value={values.number}
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            errorMessage={touched.number && errors.number}
          />
          <AddButton onPress={handleSubmit} disabled={!isValid}>
            <AddButtonText>ADICIONAR</AddButtonText>
          </AddButton>
        </>
      )}
    />
  </Container>
);

NewPlayer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default NewPlayer;
