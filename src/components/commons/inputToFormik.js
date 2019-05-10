import React, { Component } from 'react';

function inputToFormik(WrappedComponent) {
  return class extends Component {
    handleChange = (value) => {
      const { onChange, name } = this.props;

      onChange(name, value);
    };

    handleSubmit = (value) => {
      const submitedValue = WrappedComponent.handleSubmit(value);
      this.handleChange(submitedValue);
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export { inputToFormik };
