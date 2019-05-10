import React, { Component } from 'react';
import {
  View, Text, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import InputLabel from '~/components/commons/InputLabel';
import InputStyles from '~/components/commons/InputStyles';

import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  date: { textAlign: 'center' },
  picker: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
});

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleSubmit = (date) => {
    const newDate = moment(date).toDate();

    this.setState({ selectedDate: newDate });
    this.hideDateTimePicker();
    return newDate;
  };

  render() {
    const { label } = this.props;
    const { isDateTimePickerVisible, selectedDate } = this.state;

    const formatedDate = moment(selectedDate).format('LL');

    return (
      <>
        <View>
          <View style={[InputStyles.containerStyle, InputStyles.inputContainerStyle]}>
            <TouchableWithoutFeedback onPress={this.showDateTimePicker}>
              <View style={[InputStyles.containerStyle, styles.picker]}>
                <Icon name="event" size={24} color={Colors.tintColor} />
                <Text style={[InputStyles.inputStyle, styles.date]}>{formatedDate}</Text>
                <Icon name="arrow-drop-down" size={24} containerStyle={{ paddingRight: 22 }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <InputLabel>{label}</InputLabel>
        </View>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleSubmit}
          onCancel={this.hideDateTimePicker}
          titleIOS="Escolha uma data"
          mode="datetime"
          is24Hour
        />
      </>
    );
  }
}
