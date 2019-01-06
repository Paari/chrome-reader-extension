import React, { Component } from 'react';

export default class Popup extends Component {
  render() {
    const { editLineHeight } = this.props;
    return (
      <div className="rr-popup__wrapper">
        <h5>Line Height</h5>
        <p>
          <button
            className="rr-popup__control"
            onClick={() => editLineHeight(false)}
          >
            -
          </button>

          <button
            className="rr-popup__control"
            onClick={() => editLineHeight(true)}
          >
            +
          </button>
        </p>
      </div>
    )
  }
}