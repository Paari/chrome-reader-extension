/*global chrome*/
import React, { Component } from 'react';

export default class Popup extends Component {
  render() {
    const { theme, editLineHeight } = this.props;
    const incLineHeightIcon = theme === 2 ? chrome.runtime.getURL('images/icon-lineheight-inc-light.png') : chrome.runtime.getURL('images/icon-lineheight-inc.png');
    const decLineHeightIcon = theme === 2 ? chrome.runtime.getURL('images/icon-lineheight-dec-light.png') : chrome.runtime.getURL('images/icon-lineheight-dec.png');

    return (
      <div className="rr-popup__wrapper">
        <h5 className="dr-popup--label">Line Height</h5>
        <div className="rr-popup__action-wrapper">
          <span
            className="rr-popup__control dr-button--action"
            onClick={() => editLineHeight(false)}
          >
            <img src={decLineHeightIcon} title="Decrease line height" />
          </span>

          <span
            className="rr-popup__control dr-button--action"
            onClick={() => editLineHeight(true)}
          >
            <img src={incLineHeightIcon} title="Increase line height" />
          </span>
        </div>

        <div className="rr-popup__action-wrapper">
          <img src={incLineHeightIcon} src={chrome.runtime.getURL('images/logo.png')} />
        </div>
      </div>
    )
  }
}