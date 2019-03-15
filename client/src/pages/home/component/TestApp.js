import React from 'react'
import '../../../App.css';
import logo from '../../../logo.svg';

const TestApp = (props) => {
    return(
        <div className="App-header">
            <h1>Hello</h1>
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
        </div>
    )
}

export default TestApp