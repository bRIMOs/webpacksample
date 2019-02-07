import React, { Component } from 'react';
//import logo from './logo.svg';
import './main.scss';
import Notification from './component/Notificiation'

class App extends Component {
  handleCLick  =  (e) => {
    Notification.log(e);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Hello moto ! allah yer7am ...!ssss
            <br />test
        </header>
        <button onClick={(e) => this.handleCLick(e)}>Click</button>
      </div>
    );
  }
}

export default App;