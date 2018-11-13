import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Base64 } from 'js-base64';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {text: "xx"}
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
    // 读取文件:
    var reader = new FileReader();

    var file = this.fileInput.files[0];
    // ** 异步回调
    const that = this;
    reader.onload = function(e) {
        var data = e.target.result;
        that.setState({text: data});           
        
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div dangerouslySetInnerHTML={{
              __html: this.state.text
            }}/>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input
              type="file"
              ref={input => {
                this.fileInput = input;
              }}

            />

          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
