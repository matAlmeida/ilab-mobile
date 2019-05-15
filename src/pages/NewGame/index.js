import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Header from '~/components/Header';
import SelectInput from '~/components/SelectInput';

import { Container, AddButton, AddButtonText } from './styles';

import { backAction } from '~/utils/navigation';
import { insertNewGame } from '~/services/database';

const addGame = ({
  championship, homeId, awayId, date,
}, dispatch) => {
  insertNewGame({
    championshipId: championship.id,
    homeId,
    awayId,
    date,
  })
    .then(() => {
      dispatch(backAction());
    })
    .catch(error => console.error(error));
};

const convertTeamToOptions = (teams) => {
  if (!teams) {
    return [{ label: null, value: -1 }];
  }
  return teams.map(({ id, name }) => ({ label: name, value: id }));
};

const NewGame = ({ navigation }) => {
  const { championship } = navigation.state.params;
  const teamOptions = convertTeamToOptions(championship.teams);

  return (
    <Container>
      <Header
        title="Novo Time"
        leftIcon={{ name: 'arrow-back', onPress: () => navigation.dispatch(backAction()) }}
      />
      <Formik
        initialValues={{
          championship,
          homeId: teamOptions[0].value,
          awayId: teamOptions[0].value,
          date: new Date(),
        }}
        onSubmit={values => addGame(values, navigation.dispatch)}
        render={({ handleSubmit, setFieldValue, isValid }) => (
          <>
            <SelectInput
              label="Time de Casa"
              name="homeId"
              onChange={setFieldValue}
              items={teamOptions}
            />
            <SelectInput
              label="Time de Fora"
              name="awayId"
              onChange={setFieldValue}
              items={teamOptions}
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

NewGame.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default NewGame;
