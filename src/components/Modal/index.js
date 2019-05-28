/* eslint react/prop-types: 0 */
import React from 'react';
import RNModal from 'react-native-modal';

import {
  Container, Title, OptionButton, OptionText,
} from './styles';

import Colors from '~/constants/Colors';

export default function Modal({
  visible = false, onClose, onChoose, title, options = [],
}) {
  return (
    <RNModal
      isVisible={visible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
    >
      <Container>
        <Title>{title}</Title>
        {options
          && options.map(option => (
            <OptionButton
              key={option.value}
              style={{ backgroundColor: option.color || Colors.tintColor }}
              onPress={() => onChoose(option.value)}
            >
              <OptionText>{option.label}</OptionText>
            </OptionButton>
          ))}
      </Container>
    </RNModal>
  );
}
