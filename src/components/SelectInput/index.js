import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Picker,
  ActionSheetIOS,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';

import InputLabel from '~/components/commons/InputLabel';
import InputStyles from '~/components/commons/InputStyles';

const styles = StyleSheet.create({
  iosSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default class SelectInput extends React.Component {
  state = { selectedValue: 'none', selectedIndex: 0 };

  handleSubmit = value => value;

  onIosPress = () => {
    const { items = [] } = this.props;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: items.map(item => item.label),
      },
      (itemIndex) => {
        this.setState({
          selectedValue: items[itemIndex].value,
          selectedIndex: itemIndex,
        });
        this.handleSubmit(items[itemIndex].value);
      },
    );
  };

  render() {
    const { label, items, containerStyle } = this.props;
    const { selectedValue, selectedIndex } = this.state;

    return (
      <View>
        <View style={[InputStyles.containerStyle, InputStyles.inputContainerStyle, containerStyle]}>
          {Platform.OS === 'ios' && (
            <TouchableWithoutFeedback onPress={this.onIosPress}>
              <View style={[InputStyles.containerStyle, styles.iosSelectContainer]}>
                <Text style={InputStyles.inputStyle}>{items[selectedIndex].label}</Text>
                <Icon name="arrow-drop-down" size={24} containerStyle={{ paddingRight: 7 }} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {Platform.OS === 'android' && (
            <Picker
              selectedValue={selectedValue}
              itemStyle={InputStyles.inputStyle}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  selectedValue: itemValue,
                  selectedIndex: itemIndex,
                });
                this.handleSubmit(itemValue);
              }}
            >
              {items.map(item => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          )}
        </View>
        <InputLabel>{label}</InputLabel>
      </View>
    );
  }
}

SelectInput.propTypes = {
  items: PropTypes.arrayOf({ label: PropTypes.string, value: PropTypes.string }),
};

SelectInput.defaultProps = {
  items: [],
};
