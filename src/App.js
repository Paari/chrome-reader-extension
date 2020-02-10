/*global chrome*/
/*global document*/

import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import Readability from "./libs/Readability";
import "./App.css";
import Popup from "./component/Popup";
import { fadeStopWords } from "./helpers/fadeStopWords";

class App extends Component {
  state = {
    title: "",
    content: "",
    contentWithoutStop: null,
    wrapperWidth: 800,
    readerView: true,
    theme: 0,
    sizeFont: 18,
    lineHeight: 1.6,
    fontWeight: 400,
    popupMenu: false,
    speedReading: false
  };

  componentWillMount() {
    var documentClone = document.cloneNode(true);
    var article = new Readability(documentClone).parse();

    this.setState({
      title: article.title,
      content: article.content
    });

    // load saved values from chrome storage
    chrome.storage.sync.get(
      ["theme", "sizeFont", "lineHeight", "fontWeight"],
      data => {
        this.setState(state => {
          return {
            theme: isNaN(data.theme) ? state.theme : data.theme,
            sizeFont: isNaN(data.sizeFont) ? state.sizeFont : data.sizeFont,
            lineHeight: isNaN(data.lineHeight)
              ? state.lineHeight
              : data.lineHeight,
            fontWeight: isNaN(data.fontWeight)
              ? state.fontWeight
              : data.fontWeight
          };
        });
      }
    );
  }

  closeReader() {
    this.setState({
      readerView: false
    });

    // remove scroll stop style from body
    const bodyElement = document.getElementsByTagName("body");
    bodyElement[0].removeAttribute("style");
  }

  increaseFontSize() {
    this.setState(state => {
      return { sizeFont: state.sizeFont + 1 };
    });

    this.saveFont(this.state.sizeFont);
  }

  decreaseFontSize() {
    this.setState(state => {
      return { sizeFont: state.sizeFont - 1 };
    });

    this.saveFont(this.state.sizeFont);
  }

  /**
   * Change the state of theme to update the view
   * @param {number} themeIndex
   */
  toggleTheme(themeIndex) {
    this.setState({
      theme: themeIndex
    });
    this.saveTheme(themeIndex);
  }

  // open and close popup options
  togglePopup() {
    this.setState(state => {
      return { popupMenu: !state.popupMenu };
    });
  }

  /**
   * Increase or decrease line height
   * True: increase line height by 0.1
   * False: decrease line height by 0.1
   * @param {boolean} action
   */
  editLineHeight(action) {
    if (action) {
      this.setState(state => {
        return { lineHeight: state.lineHeight + 0.1 };
      });
    } else {
      this.setState(state => {
        return { lineHeight: state.lineHeight - 0.1 };
      });
    }

    this.saveLineHeight(this.state.lineHeight);
  }

  toggleSpeedReading() {
    this.setState(state => {
      return {
        speedReading: !state.speedReading
      };
    });
  }

  /**
   * Fade the stop words from the main content
   */
  toggleStopWordFade() {
    this.setState(prevState => {
      return {
        contentWithoutStop: prevState.contentWithoutStop === null ? fadeStopWords(prevState.content) : null
      }
    })
  }

  /**
   * Should it be bold or not
   * it just toggles values
   */
  toggleFontWeight() {
    this.setState(prevState => {
      const status = prevState.fontWeight === 600;
      const fontWeightValue = status ? 400 : 600;
      this.saveFontWeight(fontWeightValue); // save to chrom storage
      return {
        fontWeight: fontWeightValue
      };
    });
  }

  /**
   * Save the theme number to Chrome storage
   * @param {number} theme
   */
  saveTheme(theme) {
    chrome.storage.sync.set({ theme });
  }

  /**
   * Save base font size to Chrome storage
   * @param {number} sizeFont
   */
  saveFont(sizeFont) {
    chrome.storage.sync.set({ sizeFont });
  }

  /**
   * Save line height to Chrome storage
   * @param {number} lineHeight
   */
  saveLineHeight(lineHeight) {
    chrome.storage.sync.set({ lineHeight });
  }

  /**
   * Save font weight to Chrome storage
   * @param {number} fontWeight
   */
  saveFontWeight(fontWeight) {
    chrome.storage.sync.set({ fontWeight });
  }

  render() {
    if (this.state.readerView) {
      let activeTheme = "theme-white";
      // if the theme is not white
      if (this.state.theme > 0) {
        activeTheme = this.state.theme === 1 ? "theme-yellow" : "theme-dark";
      }

      const speedIcon =
        this.state.theme === 2
          ? chrome.runtime.getURL("images/icon-speed-light.png")
          : chrome.runtime.getURL("images/icon-speed.png");

      const moreSpeedIcon =
        this.state.theme === 2
          ? chrome.runtime.getURL("images/icon-more-speed-light.png")
          : chrome.runtime.getURL("images/icon-more-speed.png");

      return (
        <div
          className={`rr-app ${activeTheme} ${
            this.state.speedReading ? "rr-speed" : ""
          }`}
        >
          <section
            className="rr-app-wrapper"
            style={{ maxWidth: `${this.state.wrapperWidth}px` }}
          >
            <header className={`rr-app-header ${activeTheme}`}>
              <div className="rr-app-header__content">
                <span
                  className="rr-button--close"
                  onClick={() => this.closeReader()}
                >
                  Close
                </span>
                <div className="rr-theme--toggle">
                  <span
                    onClick={() => this.toggleSpeedReading()}
                    className={
                      this.state.speedReading
                        ? "dr-button--action dr-active dr-speed--toggle"
                        : "dr-button--action dr-speed--toggle"
                    }
                  >
                    <img
                      src={speedIcon}
                      className="dr-icons"
                      title="Speed Reading"
                      alt=""
                    />
                  </span>

                  <span
                    onClick={() => this.toggleStopWordFade()}
                    className={
                      this.state.contentWithoutStop !== null
                        ? "dr-button--action dr-active dr-speed--toggle"
                        : "dr-button--action dr-speed--toggle"
                    }
                  >
                    <img
                      src={moreSpeedIcon}
                      className="dr-icons"
                      title="Speed Reading"
                      alt=""
                    />
                  </span>

                  <span
                    className="rr-font--update rr-dec"
                    onClick={() => this.decreaseFontSize()}
                  >
                    A
                  </span>
                  <span
                    className="rr-font--update rr-inc"
                    onClick={() => this.increaseFontSize()}
                  >
                    A
                  </span>

                  <span
                    className="rr-theme--change theme-white"
                    onClick={() => this.toggleTheme(0)}
                  ></span>
                  <span
                    className="rr-theme--change theme-yellow"
                    onClick={() => this.toggleTheme(1)}
                  ></span>
                  <span
                    className="rr-theme--change theme-dark"
                    onClick={() => this.toggleTheme(2)}
                  ></span>
                  <div className="rr-popup-toggle__wrapper">
                    <div
                      className="rr-popup-toggle--button"
                      onClick={() => this.togglePopup()}
                    >
                      <figure></figure>
                      <figure></figure>
                      <figure></figure>
                    </div>
                    {this.state.popupMenu && (
                      <Popup
                        theme={this.state.theme}
                        editLineHeight={action => this.editLineHeight(action)}
                        toggleFontWeight={() => this.toggleFontWeight()}
                        fontWeight={this.state.fontWeight === 600}
                      />
                    )}
                  </div>
                </div>
              </div>
            </header>
            <article
              className="rr-content__wrapper"
              style={{
                fontSize: `${this.state.sizeFont}px`,
                lineHeight: `${this.state.lineHeight}em`,
                fontWeight: this.state.fontWeight
              }}
            >
              <h1>{this.state.title}</h1>
              {ReactHtmlParser(this.state.contentWithoutStop !== null ? this.state.contentWithoutStop : this.state.content)}
            </article>
          </section>
        </div>
      );
    }

    return null;
  }
}

export default App;
