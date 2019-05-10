import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import InputLabel from '~/components/commons/InputLabel';
import InputStyles from '~/components/commons/InputStyles';

import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  numberContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 17,
  },
  numberStyle: {
    marginVertical: 12,
  },
});

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    const currentNumber = props.startValue ? props.startValue : 0;

    this.state = {
      currentNumber,
    };
  }

  handleSubmit = (type) => {
    let { currentNumber } = this.state;

    if (type === 'minus') {
      currentNumber -= 1;
    }

    if (type === 'add') {
      currentNumber += 1;
    }

    this.setState({ currentNumber });
    return currentNumber;
  };

  render() {
    const { label } = this.props;
    const { currentNumber } = this.state;
    return (
      <View>
        <View
          style={[
            InputStyles.containerStyle,
            InputStyles.inputContainerStyle,
            styles.numberContainerStyle,
          ]}
        >
          <TouchableOpacity onPress={() => this.handleSubmit('minus')}>
            <Icon name="remove" size={24} color={Colors.tintColor} />
          </TouchableOpacity>
          <Text style={[InputStyles.inputStyle, styles.numberStyle]}>{currentNumber}</Text>
          <TouchableOpacity onPress={() => this.handleSubmit('add')}>
            <Icon name="add" size={24} color={Colors.tintColor} />
          </TouchableOpacity>
        </View>
        <InputLabel>{label}</InputLabel>
      </View>
    );
  }
}

export default NumberInput;
