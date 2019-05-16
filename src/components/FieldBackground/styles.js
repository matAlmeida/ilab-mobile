import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  style: {
    ...StyleSheet.absoluteFill,
  },
})`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
