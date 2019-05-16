import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

import { Container } from './styles';

import Layout from '~/constants/Layout';
import Colors from '~/constants/Colors';

const FieldBackground = () => {
  const { width, height } = Layout.window;
  const vbWidth = width / 2;
  const vbHeight = height / 2;

  return (
    <Container style={{ backgroundColor: Colors.tintColor }}>
      <Svg
        width={width + 1}
        height={height}
        viewBox={`-${vbWidth} -${vbHeight} ${width} ${height}`}
      >
        <Circle cx="0" cy="0" r="45" stroke="white" strokeWidth="7" fill="transparent" />
        <Circle cx="0" cy="0" r="10" fill="white" />
        <Line x1={`-${vbWidth}`} y1="0" x2={`${vbWidth}`} y2="0" stroke="white" strokeWidth="7" />
      </Svg>
    </Container>
  );
};

export default FieldBackground;
