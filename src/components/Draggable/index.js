/**
 *	* https://github.com/tongyy/react-native-draggable
 *
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '~/constants/Layout';

export default class Draggable extends Component {
  static propTypes = {
    renderText: PropTypes.string,
    renderShape: PropTypes.string,
    renderSize: PropTypes.number,
    imageSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    renderColor: PropTypes.string,
    reverse: PropTypes.bool,
    pressDrag: PropTypes.func,
    onMove: PropTypes.func,
    pressDragRelease: PropTypes.func,
    longPressDrag: PropTypes.func,
    pressInDrag: PropTypes.func,
    pressOutDrag: PropTypes.func,
    z: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    disableDrag: PropTypes.bool,
    children: PropTypes.any.isRequired,
  };

  static defaultProps = {
    offsetX: 100,
    renderColor: 'transparent',
    renderText: '＋',
    renderSize: 40,
    offsetY: 100,
    reverse: false,
    disableDrag: false,
  };

  constructor(props, defaultProps) {
    super(props, defaultProps);
    const { pressDragRelease, reverse, onMove } = props;
    this.state = {
      pan: new Animated.ValueXY(),
      _value: { x: 0, y: 0 },
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        if (reverse == false) {
          this.state.pan.setOffset({
            x: this.state._value.x,
            y: this.state._value.y,
          });
          this.state.pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { listener: onMove },
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (pressDragRelease)
          pressDragRelease(this.state._value, e, gestureState);
        if (reverse === false) this.state.pan.flattenOffset();
        else this.reversePosition();
      },
    });
  }

  componentDidMount() {
    if (this.props.reverse === false)
      this.state.pan.addListener(c => this.setState({ _value: c }));
  }

  componentWillUnmount() {
    const { pan } = this.state;

    pan.removeAllListeners();
  }

  positionCss = () => {
    const { renderSize, offsetX, offsetY, x, y, z } = this.props;
    return Platform.select({
      ios: {
        zIndex: z != null ? z : 999,
        position: 'absolute',
        top: y != null ? y : Layout.window.height / 2 - renderSize + offsetY,
        left: x != null ? x : Layout.window.width / 2 - renderSize + offsetX,
      },
      android: {
        position: 'absolute',
        width: Layout.window.width,
        height: Layout.window.height,
        top: y != null ? y : Layout.window.height / 2 - renderSize + offsetY,
        left: x != null ? x : Layout.window.width / 2 - renderSize + offsetX,
      },
    });
  };

  dragItemCss = () => {
    const { renderSize, renderColor } = this.props;

    return {
      backgroundColor: renderColor,
      width: renderSize * 2,
      height: renderSize * 2,
      borderRadius: renderSize,
    };
  };

  reversePosition = () => {
    const { pan } = this.state;

    Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
  };

  render() {
    const {
      pressDrag,
      longPressDrag,
      pressInDrag,
      pressOutDrag,
      disableDrag,
      children,
    } = this.props;

    const { pan } = this.state;

    const draggProps = !disableDrag ? this.panResponder.panHandlers : {};

    return (
      <View style={this.positionCss()}>
        <Animated.View {...draggProps} style={[pan.getLayout()]}>
          <TouchableOpacity
            style={this.dragItemCss()}
            onPress={pressDrag}
            onLongPress={longPressDrag}
            onPressIn={pressInDrag}
            onPressOut={pressOutDrag}>
            {children}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
