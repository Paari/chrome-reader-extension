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
  };

  componentWillMount() {
    let page = document.getElementById('test');
    let button = document.createElement('button');
    var documentClone = document.cloneNode(true); 
    var article = new Readability(documentClone).parse();
    console.log(article.content);
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

  render() {
    return (
      <div
        className="rr-app"
        style={{
          display: this.state.readerView ? 'block' : 'none'
        }}
      >
        <section
          className="rr-app-wrapper"
          style={{width: `${this.state.wrapperWidth}px`}}
        >
          <header className="rr-app-header">
            <div className="rr-app-header__content">
              <span onClick={() => this.closeReader()}>Close</span>
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
}

export default App;
