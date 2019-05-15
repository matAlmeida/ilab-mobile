/* eslint react/prop-types: 0 */
/* eslint react-native/split-platform-components: 0 */
import React from 'react';
import { ActionSheetIOS, Platform, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  Container,
  InputLabel,
  InputContainer,
  IosPickerBox,
  IosPickerText,
  Picker,
} from './styles';

class SelectInput extends React.Component {
  state = { selectedValue: 'none', selectedIndex: 0 };

  handleChange = (value) => {
    const { onChange, name } = this.props;

    onChange(name, value);
  };

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
        this.handleChange(items[itemIndex].value, itemIndex);
      },
    );
  };

  render() {
    // onValueChange receive 2 values, (ItemValue, ItemIndex)
    // items is a list of objects with {label, value}. The value must be unique
    const { label, items = [] } = this.props;
    const { selectedValue, selectedIndex } = this.state;

    return (
      <Container>
        <InputContainer>
          {Platform.OS === 'ios' && (
            <TouchableWithoutFeedback onPress={this.onIosPress}>
              <IosPickerBox>
                <IosPickerText>{items[selectedIndex].label}</IosPickerText>
                <Icon name="arrow-drop-down" size={24} containerStyle={{ paddingRight: 7 }} />
              </IosPickerBox>
            </TouchableWithoutFeedback>
          )}
          {Platform.OS === 'android' && (
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  selectedValue: itemValue,
                  selectedIndex: itemIndex,
                });
                this.handleChange(itemValue, itemIndex);
              }}
            >
              {items.map(item => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          )}
        </InputContainer>
        <InputLabel>{label}</InputLabel>
      </Container>
    );
  }
}

export default SelectInput;
