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
  };

  componentWillMount() {
    var documentClone = document.cloneNode(true); 
    var article = new Readability(documentClone).parse();
    this.setState({
      title: article.title,
      content: article.content,
    })
  }

  closeReader() {
    this.setState({
      readerView: false
    })
  }

  toggleTheme(themeIndex) {
    this.setState({
      theme: themeIndex,
    })
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
        >
          <section
            className="rr-app-wrapper"
            style={{width: `${this.state.wrapperWidth}px`}}
          >
            <header className={`rr-app-header ${activeTheme}`}>
              <div className="rr-app-header__content">
                <span className="rr-button--close" onClick={() => this.closeReader()}>Close</span>
                <div className="rr-theme--toggle">
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
