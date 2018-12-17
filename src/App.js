/*global chrome*/

import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Readability from './libs/Readability';
import './App.css';

class App extends Component {
  state = {
    title: '',
    content: '',
    wrapperWidth: 800,
    readerView: true,
    theme: 0,
    sizeFont: 18,
  };

  componentWillMount() {
    var documentClone = document.cloneNode(true); 
    var article = new Readability(documentClone).parse();
    this.setState({
      title: article.title,
      content: article.content,
    });

    chrome.storage.sync.get(['theme', 'sizeFont'], (data) => {
      if(isNaN(data.sizeFont)) {
        this.setState({theme: data.theme});
      } else {
        this.setState({theme: data.theme, sizeFont: data.sizeFont});
      }
    })
  }

  closeReader() {
    this.setState({
      readerView: false
    });
  }

  increaseFontSize() {
    this.setState((state, props) => {
      return { sizeFont: state.sizeFont + 1 }
    });

    this.saveFont(this.state.sizeFont);
  }

  decreaseFontSize() {
    this.setState((state, props) => {
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
    chrome.storage.sync.set({sizeFont})
  }

  render() {
    if(this.state.readerView) {
      let activeTheme = 'theme-white';
      // if the theme is not white
      if(this.state.theme > 0) {
        activeTheme = this.state.theme === 1 ? 'theme-yellow' : 'theme-dark';
      }

      return (
        <div
          className={`rr-app ${activeTheme}`}
          style={{fontSize: `${this.state.sizeFont}px`}}
        >
          <section
            className="rr-app-wrapper"
            style={{width: `${this.state.wrapperWidth}px`}}
          >
            <header className={`rr-app-header ${activeTheme}`}>
              <div className="rr-app-header__content">
                <span className="rr-button--close" onClick={() => this.closeReader()}>Close</span>
                <div className="rr-theme--toggle">
                  <span className="rr-font--update rr-dec" onClick={() => this.decreaseFontSize()}>A</span>
                  <span className="rr-font--update rr-inc" onClick={() => this.increaseFontSize()}>A</span>

                  <span className="rr-theme--change theme-white" onClick={() => this.toggleTheme(0)}></span>
                  <span className="rr-theme--change theme-yellow" onClick={() => this.toggleTheme(1)}></span>
                  <span className="rr-theme--change theme-dark" onClick={() => this.toggleTheme(2)}></span>
                </div>
              </div>
            </header>
            <article className="rr-content__wrapper">
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
