/* eslint react/prop-types: 0 */
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { InputLabel, Input } from './styles';

import Colors from '~/constants/Colors';

class TextInput extends React.PureComponent {
  state = { visible: false };

  handleChange = (value) => {
    const { onChange, name } = this.props;

    onChange(name, value);
  };

  handleTouch = () => {
    const { onTouch, name } = this.props;

    onTouch(name);
  };

  render() {
    const {
      icon, type, label, value, secure, autoCapitalize = 'none', ...rest
    } = this.props;

    const { visible } = this.state;

    const leftIcon = icon ? <Icon name={icon} size={24} color={Colors.tintColor} /> : {};

    const rightIcon = secure ? (
      <TouchableWithoutFeedback onPress={() => this.setState({ visible: !visible })}>
        <Icon name={visible ? 'eye-slash' : 'eye'} size={24} color={Colors.tintColor} />
      </TouchableWithoutFeedback>
    ) : (
      {}
    );

    return (
      <View>
        <Input
          secureTextEntry={secure && !visible}
          keyboardType={type === 'password' ? 'default' : type}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={this.handleChange}
          onBlur={this.handleTouch}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          rightIconContainerStyle={{ paddingRight: 15 }}
          underlineColorAndroid="transparent"
          {...rest}
        />

        <InputLabel>{label}</InputLabel>
      </View>
    );
  }
}

export default TextInput;
