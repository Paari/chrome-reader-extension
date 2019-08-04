/*global chrome*/
/*global document*/

import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Readability from './libs/Readability';
import './App.css';
import Popup from './component/popup';

class App extends Component {
  state = {
    title: '',
    content: '',
    wrapperWidth: 800,
    readerView: true,
    theme: 0,
    sizeFont: 18,
    lineHeight: 1.6,
    popupMenu: false,
    speedReading: false,
  };

  componentWillMount() {
    var documentClone = document.cloneNode(true); 
    var article = new Readability(documentClone).parse();
    this.setState({
      title: article.title,
      content: article.content,
    });

    chrome.storage.sync.get(['theme', 'sizeFont', 'lineHeight'], (data) => {
      this.setState((state) => {
        return {
          theme: isNaN(data.theme) ? state.theme : data.theme,
          sizeFont: isNaN(data.sizeFont) ? state.sizeFont : data.sizeFont,
          lineHeight: isNaN(data.lineHeight) ? state.lineHeight : data.lineHeight,
        }
      })
    })
  }

  closeReader() {
    this.setState({
      readerView: false
    });

    // remove scroll stop style from body
    const bodyElement = document.getElementsByTagName('body')
    bodyElement[0].removeAttribute('style');
  }

  increaseFontSize() {
    this.setState((state) => {
      return { sizeFont: state.sizeFont + 1 }
    });

    this.saveFont(this.state.sizeFont);
  }

  decreaseFontSize() {
    this.setState((state) => {
      return { sizeFont: state.sizeFont - 1 }
    });

    this.saveFont(this.state.sizeFont);
  }

  /**
   * Change the state of theme to update the view
   * @param {number} themeIndex 
   */
  toggleTheme(themeIndex) {
    this.setState({
      theme: themeIndex,
    });
    this.saveTheme(themeIndex);
  }

  // open and close popup options
  togglePopup() {
    this.setState((state) => {
      return { popupMenu: !state.popupMenu }
    })
  }

  /**
   * Increase or decrease line height
   * True: increase line height by 0.1
   * False: decrease line height by 0.1
   * @param {boolean} action 
   */
  editLineHeight(action) {
    if(action) {
      this.setState((state) => {
        return { lineHeight: state.lineHeight + 0.1 }
      });
    } else {
      this.setState((state) => {
        return { lineHeight: state.lineHeight - 0.1 }
      });
    }

    this.saveLineHeight(this.state.lineHeight);
  }

  toggleSpeedReading() {
    this.setState((state) => {
      return {
        speedReading: !state.speedReading
      }
    })
  }

  /**
   * Save the theme number to Chrome storage
   * @param {number} theme 
   */
  saveTheme(theme) {
    chrome.storage.sync.set({theme});
  }

  /**
   * Save base font size to Chrome storage
   * @param {number} sizeFont 
   */
  saveFont(sizeFont) {
    chrome.storage.sync.set({sizeFont});
  }

  /**
   * Save line height to Chrome storage
   * @param {number} lineHeight 
   */
  saveLineHeight(lineHeight) {
    chrome.storage.sync.set({lineHeight});
  }

  render() {
    if(this.state.readerView) {
      let activeTheme = 'theme-white';
      // if the theme is not white
      if(this.state.theme > 0) {
        activeTheme = this.state.theme === 1 ? 'theme-yellow' : 'theme-dark';
      }

      const speedIcon = this.state.theme === 2 ? chrome.runtime.getURL('images/icon-speed-light.png') : chrome.runtime.getURL('images/icon-speed.png');

      return (
        <div
          className={`rr-app ${activeTheme} ${this.state.speedReading ? 'rr-speed' : ''}`}
          style={{fontSize: `${this.state.sizeFont}px`}}
        >
          <section
            className="rr-app-wrapper"
            style={{maxWidth: `${this.state.wrapperWidth}px`}}
          >
            <header className={`rr-app-header ${activeTheme}`}>
              <div className="rr-app-header__content">
                <span className="rr-button--close" onClick={() => this.closeReader()}>Close</span>
                <div className="rr-theme--toggle">
                  <span
                    onClick={() => this.toggleSpeedReading()}
                    className={this.state.speedReading ? "dr-button--action dr-active dr-speed--toggle" : "dr-button--action dr-speed--toggle"}
                  >
                    <img src={speedIcon} className="dr-icons" title="Speed Reading" />
                  </span>
                  <span className="rr-font--update rr-dec" onClick={() => this.decreaseFontSize()}>A</span>
                  <span className="rr-font--update rr-inc" onClick={() => this.increaseFontSize()}>A</span>

                  <span className="rr-theme--change theme-white" onClick={() => this.toggleTheme(0)}></span>
                  <span className="rr-theme--change theme-yellow" onClick={() => this.toggleTheme(1)}></span>
                  <span className="rr-theme--change theme-dark" onClick={() => this.toggleTheme(2)}></span>
                  <div className="rr-popup-toggle__wrapper">
                    <div className="rr-popup-toggle--button" onClick={() => this.togglePopup()}>
                      <figure></figure>
                      <figure></figure>
                      <figure></figure>
                    </div>
                    {this.state.popupMenu && <Popup theme={this.state.theme} editLineHeight={(action) => this.editLineHeight(action)} />}
                  </div>
                </div>
              </div>
            </header>
            <article 
              className="rr-content__wrapper"
              style={{lineHeight: `${this.state.lineHeight}em`}}
            >
              <h1>{this.state.title}</h1>
              {ReactHtmlParser(this.state.content)}
            </article>
          </section>
        </div>
      );
    }

    return null;
  }
}

export default App;
