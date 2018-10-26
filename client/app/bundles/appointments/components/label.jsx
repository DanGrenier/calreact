import React from 'react'

export default class Label extends React.Component {
  render () {
    return (
      <div>
        <div>{this.props.label}</div>
      </div>
    );
  }
}



