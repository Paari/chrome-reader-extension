import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Readability from './libs/Readability';
import './App.css';

class App extends Component {
  state = {
    title: '',
    content: '',
    wrapperWidth: 800,
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

  render() {
    return (
      <div className="rr-app">
        <section
          className="rr-app-wrapper"
          style={{width: `${this.state.wrapperWidth}px`}}
        >
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
