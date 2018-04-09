import React from 'react';

class Step extends React.Component {

  render() {

    const stepProps = {};
    return (
      this.props.render(this.state, stepProps)
    )
  }
}
