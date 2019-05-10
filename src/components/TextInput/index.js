import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import InputLabel from '~/components/commons/InputLabel';
import InputStyles from '~/components/commons/InputStyles';

import Colors from '~/constants/Colors';

class TextInput extends React.PureComponent {
  state = { visible: false };

  handleSubmit = text => text;

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
          keyboardType={type == 'password' ? 'default' : type}
          containerStyle={[InputStyles.containerStyle, rest.containerStyle]}
          inputStyle={InputStyles.inputStyle}
          inputContainerStyle={[InputStyles.inputContainerStyle, { paddingVertical: 15 }]}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={this.handleSubmit}
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
